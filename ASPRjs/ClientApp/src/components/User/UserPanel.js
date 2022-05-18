import {Component} from 'react';
import axios from "axios";
import './UserPanel.css';

export class UserPanel extends Component {
    static displayName = UserPanel.name;

    constructor(props) {
        super(props)
        this.state = {
            userIngredients: [],
            recipeList: [],
            allIngredients: [],
            ingredient: "",
            login: this.props.appdata,
            dishType: 0,
            searchStart: false,
            message: "",
            loading_dishes: false
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.recipeSearch = this.recipeSearch.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    componentDidMount() {
        try {
            axios.get("Community/User/Ingredients/" + this.state.login)
            .then((resp) => {
                this.setState({userIngredients: resp.data.ingredients});
            })
            .catch(() => {});

            axios.get("Dishes/Recipe/ViewIngredients")
            .then((resp) => {
                this.setState({allIngredients: resp.data.ingredients});
            })
        }
        catch(err) {
            console.log("Błąd");
        }
    }

    onChangeValue(event) {
        this.setState({dishType: event.target.value, message: ""})
    }

    recipeSearch() {
        this.setState({loading_dishes: true})
        if(this.state.dishType == 0) {
            this.setState({message: "Najpierw wybierz porę i rodzaj posiłku"});
            return
        }
        axios.get("Community/User/Cooking/" + this.state.login + "/" + this.state.dishType)
        .then((resp) => {
            this.setState({recipeList: resp.data.recipes, message: "", loading_dishes: false});
        })
        .catch(err => {
            console.log(err);
            this.setState({message: "Brak dopasowań do \"" + this.whatMealType((Number)(this.state.dishType)) + "\"", loading_dishes: false})
        })
    }

    whatMealType(props) {
        switch(props) {
            case 1:
                return "Śniadanie"
            case 2:
                return "Obiad/kolacja"
            case 3:
                return "Śniadanie vege"
            case 4:
                return "Obiad/kolacja vege"
        }
    }

    addIngredient() {
        if(!this.state.ingredient) { this.setState({message: "Podaj nazwę składnika przed dodaniem"}); return }
        if(!this.state.allIngredients.some(el => el === this.state.ingredient) || this.state.userIngredients.some(el => el === this.state.ingredient)) { this.setState({message: "Składnika nie ma w bazie danych bądź jest już w twojej spiżarni"}); return }
        axios.post("Community/User/AddIngredient/" + this.state.login, {
            Name: this.state.ingredient
        })
        .then(() => {
            this.setState({
                userIngredients: [...this.state.userIngredients, this.state.ingredient], 
                ingredient: ""
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    hideMessage() {
        this.setState({message: ""});
    }

    deleteIngredient(props) {
        if(window.confirm("Czy chcesz usunąć składnik \"" + props + "\" ?")) {
            axios.delete("Community/User/DeleteIngredient/" + this.state.login + "/" + props);
            var array = [...this.state.userIngredients];
            var index = array.indexOf(props);
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({userIngredients: array});
            }
        }
    }

    render() {
        return(
            <div id="user-panel-wrapper">
                <div id="user-panel-info">
                    <h3>Witaj w swojej spiżarni!</h3>
                    <p>Tutaj możesz dodawać / modyfikować jej zawartość co pozwoli na dopasowanie pod ciebie przepisów.</p>
                </div>
                <div className='user-panel-container'>
                    <div className='user-panel-main-block'>
                        <div id='user-panel-user-ingredients-container'>
                            <div id='user-panel-uingredients-scroll'>
                                {(typeof(this.state.userIngredients) == 'object') ?
                                    this.state.userIngredients.map(k => 
                                        <div className='user-panel-uingredients-scroll-element' key={k} onClick={() => this.deleteIngredient(k)}>
                                            {k}
                                        </div>
                                    )
                                :
                                null
                                }
                            </div>
                            <div id='user-panel-uingredients-inputs'>
                                <input list="allIngr" id="user-panel-allIngr" autoComplete='off' placeholder='Pomidor ...' value={this.state.ingredient} onChange={e => this.setState({ingredient: e.target.value})}/>
                                <datalist id="allIngr">
                                    {(typeof(this.state.allIngredients) == 'object') && this.state.ingredient ?
                                        this.state.allIngredients.map((p,ind) => 
                                            <option value={p}></option>
                                        )
                                        :
                                        null
                                    }
                                </datalist>
                                <div id="user-panel-allIngr-Add" onClick={this.addIngredient}>Dodaj</div>
                            </div>
                        </div>
                    </div>
                    <div className='user-panel-main-block'>
                        <div id="user-panel-button" onClick={this.recipeSearch}>Szukaj</div>
                        <div onChange={this.onChangeValue} id="user-panel-main-labels">
                            <input type="radio" name="drone" value="1" id="ms" hidden/><label htmlFor="ms">Śniadanie</label>
                            <input type="radio" name="drone" value="2" id="mok" hidden/><label htmlFor="mok">Obiad/kolacja</label>
                            <input type="radio" name="drone" value="3" id="sv" hidden/><label htmlFor="sv">Śniadanie Vege</label>
                            <input type="radio" name="drone" value="4" id="okv" hidden/><label htmlFor="okv">Obiad/kolacja Vege</label>
                        </div>
                        <div id="user-panel-view-result">
                            {typeof(this.state.recipeList) == 'object'?
                                this.state.loading_dishes == false ?
                                    this.state.recipeList.map(k =>
                                        <a href={'/recipes/' + k.linkName} key={k.name}>
                                            <div className='user-panel-recipe-list-element'>
                                                <div className="user-list-element-container">
                                                    <div className="list-element-img">
                                                        <img src={'/Images/'+ k.photoFileName} alt=""/>
                                                    </div>
                                                    <div className="list-element-text">
                                                        <h5>{k.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                    :
                                    <div id="user-panel-loading-signature">Loading ...</div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                {this.state.message ?
                    <div id='ErrorMessage-container' onClick={this.hideMessage}>
                        <div id="ErrorMessage">{this.state.message}</div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}