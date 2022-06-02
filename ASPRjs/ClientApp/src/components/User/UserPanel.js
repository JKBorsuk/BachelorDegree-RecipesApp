import {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './UserPanel.css';
import $ from 'jquery';

export class UserPanel extends Component {
    static displayName = UserPanel.name;

    constructor(props) {
        super(props)
        this.state = {
            userIngredients: this.props.userIng,
            recipeList: [],
            recipeReserveList: [],
            allIngredients: this.props.allIng,
            ingredient: "",
            login: (String)(this.props.appdata),
            userName: (String)(this.props.appdata2),
            dishType: 0,
            message: "",
            IngredientNName: "",
            IngredientOName: "",
            pantryEditElements: [],
            IngredientEdit: false,
            loading_dishes: false,
            pantryEdit: false
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.recipeSearch = this.recipeSearch.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    onChangeValue(event) {
        this.setState({dishType: event.target.value, message: ""})
    }

    componentDidMount() {
        console.log((Object)(this.state.userIngredients).length)
        console.log(this.state.allIngredients)
    }

    recipeSearch() {
        this.setState({loading_dishes: true})
        if(this.state.dishType == 0) {
            this.setState({message: "Najpierw wybierz porę i rodzaj posiłku", loading_dishes: false});
            return
        }
        axios.get("Community/User/Cooking/" + this.state.login + "/" + this.state.dishType)
        .then((resp) => {
            this.setState({recipeList: resp.data.allRecipes[0], recipeReserveList: resp.data.allRecipes[1], message: "", loading_dishes: false});
        })
        .catch(err => {
            console.log(err);
            this.setState({message: "Brak dopasowań do \"" + this.whatMealType((Number)(this.state.dishType)) + "\"", loading_dishes: false, recipeList: []})
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
        if((this.state.userIngredients.length + 1) >= 50) { this.setState({message: "Maksymalna liczba składników w spiżarni wynosi 50"}); }
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

    editIngredient_ShowEditor(props) {
        this.setState({IngredientOName: props, IngredientEdit: true});
        document.getElementById("uingredient_"+props).style.height = "110px";
        document.getElementById("uingredient-edit-form-"+props).style.visibility = "visible";
        document.getElementById("uingredient-delete-"+props).style.visibility = "hidden";
        $('.user-panel-uingredients-scroll-element').removeClass('scroll-element-hoverableEdit');
    }
    editIngredient_HideEditor(props) {
        this.setState({IngredientOName: "", IngredientNName: "", IngredientEdit: false})
        document.getElementById("uingredient_"+props).style.height = "";
        document.getElementById("uingredient-edit-form-"+props).style.visibility = "";
        document.getElementById("uingredient-delete-"+props).style.visibility = "";
        $('.user-panel-uingredients-scroll-element').addClass('scroll-element-hoverableEdit');
    }

    editIngredient_SaveChanges(e) {
        e.preventDefault();
        if(!this.state.IngredientNName) { this.setState({message: "Podaj nazwę składnika przed dodaniem"}); return }
        if(!this.state.allIngredients.some(el => el === this.state.IngredientNName) || this.state.userIngredients.some(el => el === this.state.IngredientNName)) { this.setState({message: "Składnika nie ma w bazie danych bądź jest już w twojej spiżarni"}); return }
        axios.put("Community/User/UpdateIngredient/" + this.state.login + '/' + this.state.IngredientOName + ',' + this.state.IngredientNName)
        .then(() => {
            let array = this.state.userIngredients;
            array[array.indexOf(this.state.IngredientOName)] = this.state.IngredientNName;
            document.getElementById("uingredient_"+this.state.IngredientOName).style.height = "";
            document.getElementById("uingredient-edit-form-"+this.state.IngredientOName).style.visibility = "";
            document.getElementById("uingredient-delete-"+this.state.IngredientOName).style.visibility = "";
            this.setState({IngredientOName: "", IngredientNName: "", IngredientEdit: false, userIngredients: array});
            $('.user-panel-uingredients-scroll-element').addClass('scroll-element-hoverableEdit');
        })
    }

    editPantry_ShowEditor(props) {
        this.setState({pantryEdit: true, pantryEditElements: props})
    }

    editPantry_HideEditor() {
        this.setState({pantryEdit: false, pantryEditElements: []})
    }

    editPantry_Save() {
        let count = this.state.pantryEditElements.length
        if(this.state.userIngredients.length + count <= 50) {
            axios.post("Community/User/AddIngredients/"+this.state.login,{
                UIngredients: this.state.pantryEditElements
            })
            .then((resp) => {
                console.log(resp);

                let firstChild;
                let secondChild;
                let thirdChild;

                switch(count) {
                    case 2:
                        firstChild = this.state.pantryEditElements[0].name;
                        secondChild = this.state.pantryEditElements[1].name;
                        this.setState({pantryEdit: false, pantryEditElements: [], userIngredients: [...this.state.userIngredients, firstChild, secondChild]})
                        this.recipeSearch();
                        break
                    case 3:
                        firstChild = this.state.pantryEditElements[0].name;
                        secondChild = this.state.pantryEditElements[1].name;
                        thirdChild = this.state.pantryEditElements[2].name;
                        this.setState({pantryEdit: false, pantryEditElements: [], userIngredients: [...this.state.userIngredients, firstChild, secondChild, thirdChild]})
                        this.recipeSearch();
                        break
                    default:
                        firstChild = this.state.pantryEditElements[0].name;
                        this.setState({pantryEdit: false, pantryEditElements: [], userIngredients: [...this.state.userIngredients, firstChild]})
                        this.recipeSearch();
                        break
                }
                this.setState({pantryEdit: false, pantryEditElements: []})
            })
            .catch((err) => {console.log("Błąd")})
        }
    }

    render() {
        return(
            <>
            <div id="user-panel-wrapper">
                <div id="user-panel-info">
                    <h3>Witaj {this.state.userName} w swojej spiżarni!</h3>
                    <p>Tutaj możesz dodawać / modyfikować jej zawartość co pozwoli na dopasowanie pod ciebie przepisów.</p>
                </div>
                <div className='user-panel-container container'>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div id='user-panel-user-ingredients-container'>
                                <div id='user-panel-uingredients-scroll'>
                                    {(typeof(this.state.userIngredients) == 'object') && this.state.userIngredients.length > 0 ?
                                        this.state.userIngredients.map(k =>
                                            <div className='user-panel-uingredients-scroll-element scroll-element-hoverableEdit' key={k} id={'uingredient_'+k}>
                                                <div className='user-uingredient'>{k}</div>
                                                {!this.state.IngredientEdit? <div className='user-uingredient-edit' onClick={() => this.editIngredient_ShowEditor(k)}>Edytuj</div> : null}
                                                <div className='user-uingredient-delete' id={'uingredient-delete-'+k}><div onClick={() => this.deleteIngredient(k)}>{'\u2715'}</div></div>
                                                <div className='user-uingredient-edit-form' id={'uingredient-edit-form-'+k}>
                                                    <form>
                                                        <div className='uingredient-bad' onClick={() => this.editIngredient_HideEditor(k)}>{'\u2715'}</div>
                                                        <input  list="allIngr"
                                                                value={this.state.IngredientNName}
                                                                onChange={(e) => this.setState({IngredientNName: e.target.value})}
                                                                placeholder={k}
                                                                autoComplete="off"
                                                                autoFocus
                                                        />
                                                        <div className='uingredient-ok' onClick={(e) => this.editIngredient_SaveChanges(e)}>{'\u2713'}</div>
                                                        <button hidden></button>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    :
                                    null
                                    }
                                </div>
                                <div id='user-panel-uingredients-inputs'>
                                    <input list="allIngr" id="user-panel-allIngr" autoComplete='off' placeholder='Pomidor ...' value={this.state.ingredient} onChange={e => this.setState({ingredient: e.target.value})}/>
                                    <datalist id="allIngr">
                                        {(typeof(this.state.allIngredients) == 'object') && this.state.ingredient || this.state.IngredientNName ?
                                            this.state.allIngredients.map((p) => 
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
                        <div className='col-lg-8 mt-4 mt-lg-0'>
                            <div className='row ms-lg-1'><div id="user-panel-button" className='col-12' onClick={this.recipeSearch}>Szukaj</div></div>
                            <div onChange={this.onChangeValue} id="user-panel-main-labels" className='row ms-lg-1'>
                                <input type="radio" name="drone" value="1" id="ms" hidden/><label htmlFor="ms" className='col-sm-3'><div className='centered'>Śniadanie</div></label>
                                <input type="radio" name="drone" value="2" id="mok" hidden/><label htmlFor="mok" className='col-sm-3'><div className='centered'>Obiad / kolacja</div></label>
                                <input type="radio" name="drone" value="3" id="sv" hidden/><label htmlFor="sv" className='col-sm-3'><div className='centered'>Śniadanie Vege</div></label>
                                <input type="radio" name="drone" value="4" id="okv" hidden/><label htmlFor="okv" className='col-sm-3'><div className='centered'>Obiad / kolacja Vege</div></label>
                            </div>
                            <div id="user-panel-view-result" className='row ms-lg-1'>
                                {typeof(this.state.recipeReserveList) == 'object' && this.state.recipeReserveList.length > 0 ?
                                    <>
                                        <div style={{border: '1px dashed white', paddingTop: '1em'}} className="mb-3">
                                            <h5 className='text-center' style={{paddingBottom: '0.5em'}}>Posiłki godne polecenia:</h5>
                                            {this.state.recipeReserveList.map(el =>
                                                <div className='reserve-recipe mb-3'>
                                                    <div className='user-panel-recipe-list-element' key={el.name}>
                                                        <div className="user-list-element-container">
                                                            <div className="list-element-img">
                                                                <img src={'/Images/'+ el.photoFileName} alt=""/>
                                                            </div>
                                                            <div className="list-element-text">
                                                                <div className='reserve-recipe-add' onClick={() => this.editPantry_ShowEditor(el.ingredients)}>Dodaj</div>
                                                                <div className='reserve-recipe-name'>
                                                                    <h5>{el.name}</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                    :
                                    null
                                }
                                {typeof(this.state.recipeList) == 'object'?
                                    this.state.loading_dishes == false ?
                                        this.state.recipeList.map(k =>
                                            <Link to={'/recipes/' + k.linkName} key={k.name}>
                                                <div className='user-panel-recipe-list-element'>
                                                    <div className="user-list-element-container">
                                                        <div className="list-element-img">
                                                            <img src={'/Images/'+ k.photoFileName} alt=""/>
                                                        </div>
                                                        <div className="list-element-text">
                                                            <div className='reserve-recipe-name'><h5>{k.name}</h5></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                        :
                                        <div className="user-panel-loading-signature"><div className='RMasterloader'/></div>
                                    :
                                    null
                                }
                            </div>
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
            {this.state.pantryEdit === true?
                <div id='pantryEdit-absolute-wrapper'>
                    <div id='pantryEdit-absolute'>
                        <div className='centered'>
                            <div><h2>Dodać te składniki?</h2></div>
                            {typeof(this.state.pantryEditElements) == 'object'?
                                this.state.pantryEditElements.map(el =>
                                    <div className='pantryEdit-ingredient'>{el.name}</div>
                                )
                                :
                                null
                            }
                            <div className='pantryEdit-buttons'>
                                <div className='pantryEdit-button btn-bckgrd-red' onClick={() => this.editPantry_HideEditor()}>Anuluj</div>
                                <div className='pantryEdit-button btn-bckgrd-green' onClick={() => this.editPantry_Save()}>OK</div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null 
            }
            </>
        )
    }
}