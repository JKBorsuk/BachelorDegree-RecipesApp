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
            loading: true,
            dishType: 0,
            searchStart: false,
            message: ""
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.recipeSearch = this.recipeSearch.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    componentDidMount() {
        try {
            if(typeof(this.state.login) == 'string' && this.state.login.length == 0) {
                window.location.href = '/login';
            } else { this.setState({loading: false})}

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
        if(this.state.dishType == 0) {
            this.setState({message: "Najpierw wybierz porę i rodzaj posiłku"});
            return
        }
        axios.get("Community/User/Cooking/" + this.state.login + "/" + this.state.dishType)
        .then((resp) => {
            this.setState({recipeList: resp.data.recipes, message: ""});
        })
        .catch(err => {
            console.log(err);
            this.setState({message: "Brak dopasowań do \"" + this.whatMealType((Number)(this.state.dishType)) + "\""})
        })
    }

    whatMealType(props) {
        switch(props) {
            case 1:
                return "Mięsne śniadanie"
            case 2:
                return "Mięsny obiad/kolacja"
            case 3:
                return "Śniadanie vege"
            case 4:
                return "Obiad/kolacja vege"
        }
    }

    addIngredient() {
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

    render() {
        return(
            <>
                {this.state.loading == false ?
                <div id="user-panel-wrapper">
                    <h3>Witaj w swojej spiżarni!</h3>
                    <p>Tutaj możesz dodawać / modyfikować jej zawartość co pozwoli na dopasowanie pod ciebie przepisów.</p>
                    <div className='user-panel-container'>
                        <div className='user-panel-main-block'>
                            <div id='user-panel-user-ingredients-container'>
                                <div id='user-panel-uingredients-scroll'>
                                    {(typeof(this.state.userIngredients) == 'object') ?
                                        this.state.userIngredients.map(k => 
                                            <div className='user-panel-uingredients-scroll-element' key={k}>
                                                {k}
                                            </div>
                                        )
                                    :
                                    null
                                    }
                                </div>
                                <div id='user-panel-uingredients-inputs'>
                                    <input list="allIngr" placeholder='ingredient ...' value={this.state.ingredient} onChange={e => this.setState({ingredient: e.target.value})}/>
                                    <datalist id="allIngr">
                                        {(typeof(this.state.allIngredients) == 'object') && this.state.ingredient ?
                                            this.state.allIngredients.map((p,ind) => 
                                                <option value={p}></option>
                                            )
                                            :
                                            null
                                        }
                                    </datalist>
                                    <input type="button" value="Dodaj" onClick={this.addIngredient}/>
                                </div>
                            </div>
                        </div>
                        <div className='user-panel-main-block'>
                            <div id="user-panel-button" onClick={this.recipeSearch}>Szukaj</div>
                            <div onChange={this.onChangeValue} id="user-panel-main-labels">
                                <input type="radio" name="drone" value="1" id="ms" hidden/><label htmlFor="ms">Mięsne śniadanie</label>
                                <input type="radio" name="drone" value="2" id="mok" hidden/><label htmlFor="mok">Mięsny obiad/kolacja</label>
                                <input type="radio" name="drone" value="3" id="sv" hidden/><label htmlFor="sv">Śniadanie Vege</label>
                                <input type="radio" name="drone" value="4" id="okv" hidden/><label htmlFor="okv">Obiad/kolacja Vege</label>
                            </div>
                            <div id="user-panel-view-result">
                                {typeof(this.state.recipeList) == 'object' ?
                                    this.state.recipeList.map(k => 
                                        <a href={'/recipes/' + k.linkName} key={k.name}>
                                            <div className='user-panel-recipe-list-element'>
                                                <div className="user-list-element-container">
                                                    <div className="list-element-img">
                                                        <img src={'/Images/'+ k.photoFileName} />
                                                    </div>
                                                    <div className="list-element-text">
                                                        <h5>{k.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )
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
                :
                null}
            </>
        )
    }
}