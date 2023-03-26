import React, {Component} from 'react';
import axios from 'axios';
import './AddRecipe.css';
import { Row } from 'reactstrap';

export class AddRecipe extends Component {
    static displayName = AddRecipe.name;

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            linkname: "",
            type: '',
            source: "",
            loading: false,
            description: "*Opis\n\n* - wymagane\n\n Dodanie nowej linii - \\n",
            ingredients: [],
            spices: [],
            response: [],
            message: "",
            filename: "Noimg.png",
            condition: true,
            login: this.props.appdata,
        }
        this.submit = this.submit.bind(this);
    }

    ingredient = (name, amount) => { return { name: name, amount: amount } }

    spice = (name) => { return { name: name } }

    componentDidMount() {
        axios.get("Dishes/Recipe/ViewIngredients")
        .then((resp) => {
            this.setState({response: resp.data.ingredients});
        })
        .catch(() => {})
    }


    addIngredient(){
        if(this.state.ingredients.length < 20) {
            const newelement = this.ingredient("","")
            this.setState(prevState => ({
                ingredients: [...prevState.ingredients, newelement]
            }))
        }
    }
    addSpice(){
        if(this.state.spices.length < 20) {
            const newelement = this.spice("")
            this.setState(prevState => ({
                spices: [...prevState.spices, newelement]
            }))
        }
    }
    
    submit(e) {
        e.preventDefault();
        this.setState({
            type: parseInt(this.state.type),
            loading: true
        })
        try {
            let is_image_set = document.getElementById('myimage').files[0] != undefined ? true : false;
            axios.post("Dishes/Recipe/Add/" + this.state.login, {
                Type: this.state.type,
                Name: this.state.name,
                Ingredients: this.state.ingredients,
                Spices: this.state.spices,
                Description: this.state.description,
                Source: this.state.source,
                PhotoFileName: is_image_set ? this.state.linkname + '-' + document.getElementById('myimage').files[0].name : this.state.filename,
                LinkName: this.state.linkname
                })
                .catch(() => {this.setState({message: "Najprawdopodobniej zajęty link", loading: false}); return})
                .then(() => {
                    try {
                        this.bodyFormData = new FormData();
                        this.bodyFormData.append('file', this.refs.file.files[0]);
                        axios.post("Dishes/Recipe/SaveImage/" + this.state.linkname, this.bodyFormData)
                        .then(() => {
                            alert("Utworzono!");
                            this.setState({loading: false});
                        })
                    }
                    catch(err) {
                        this.setState({message: "Utworzono bez zdjęcia", loading: false})
                    }
                })
        }
        catch(err) {
            this.setState({message: "Podano błędne wartości lub link jest zajęty", loading: false})
        }
    }

    handleIngredientNameChange = (e,index) => {
        const newdata = {...this.state.ingredients}
        newdata[index].name = e.target.value;
        this.setState({
            newdata,
        });
    };

    handleIngredientAmountChange = (e,index) => {
        const newdata = {...this.state.ingredients}
        newdata[index].amount = e.target.value;
        this.setState({
            newdata,
        });
    };
    
    handleSpiceNameChange = (e,index) => {
        const newdata = {...this.state.spices}
        newdata[index].name = e.target.value;
        this.setState({
            newdata,
        });
    };

    render() {
        return (
            <div>
                <div className='recipe-container-add container'>
                    <form onSubmit={this.submit}>
                        <div className='row'>
                                <div className='col-sm-4 arec-row-text my-auto'>*Nazwa:</div>
                                <div className='col-sm-8 arec-row-input-text'>
                                    <input
                                        type="text"
                                        id="name"
                                        value={this.state.name}
                                        placeholder="Nazwa"
                                        autoComplete="off"
                                        onChange={(e) => this.setState({name: e.target.value})}
                                    />
                                </div>
                        </div>
                        <div className='row'><div className='col-sm-8 offset-sm-4'><hr/></div></div>
                        <div className='row'>
                            <div className='col-sm-4 arec-row-text my-auto'>*Typ:</div>
                            <div className='col-sm-8 arec-row-input-text'>
                                <input list="typelist" id="type" value={this.state.type} onChange={(e) => this.setState({type: e.target.value})} autoComplete="off" placeholder="Typ"/>
                                <datalist id="typelist">
                                    <option value="1">Breakfast</option>
                                    <option value="2">Lunch/Dinner</option>
                                    <option value="3">Vege Breakfast</option>
                                    <option value="4">Vege Lunch/Dinner</option>
                                </datalist>
                            </div>
                        </div>
                        <div className='row'><div className='col-sm-8 offset-sm-4'><hr/></div></div>
                        <div className='row arec-row-ingredients-spices'>
                            <div className='col-sm-4'>
                                <div className='row'>
                                    <div className="col-sm-6 arec-row-ingspec my-auto">*Składniki</div>
                                    <div className='col-sm-6 arec-row-input'><input type="button" value="Dodaj" onClick={this.addIngredient.bind(this)}/></div>
                                </div>
                            </div>
                            <div className='col-sm-8'>
                                {(typeof(this.state.ingredients) == 'object') ?
                                this.state.ingredients.map((el,index) =>
                                    <div className='recipe-child-list'>
                                        <div className='row'>
                                            <div className='col-8'>
                                                <input list="typelist-i" id={"ingredient"+index} value={el.name} onChange={(e) => this.handleIngredientNameChange(e,index)} autoComplete="off" placeholder={"Składnik nr " + (index+1)}/>
                                                <datalist id="typelist-i">
                                                    {(typeof(this.state.response) == 'object') && this.state.ingredients[index].name ?
                                                        this.state.response.map(p => 
                                                            <option value={p}></option>
                                                        )
                                                        :
                                                        null
                                                    }
                                                </datalist>
                                            </div>
                                            <div className='col-4'>
                                                <input type="text" id={"amount"+index} value={el.amount} placeholder="Ilość" onChange={(e) => this.handleIngredientAmountChange(e,index)} autoComplete="off"/>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className='row arec-row-ingredients-spices'>
                            <div className='col-sm-4'>
                                <div className='row'>
                                    <div className="col-sm-6 arec-row-ingspec my-auto">Dodatki</div>
                                    <div className="col-sm-6 arec-row-input"><input type="button" value="Dodaj" onClick={this.addSpice.bind(this)}/></div>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                {(typeof(this.state.spices) == 'object') ?
                                this.state.spices.map((el,index) =>
                                <div className='recipe-child-list-spice'>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <input type="text" id={"spice"+index} autoComplete="off" placeholder={"Przyprawa / Dodatek nr " + (index+1)} value={el.name} onChange={(e) => this.handleSpiceNameChange(e,index)}/>
                                        </div>
                                    </div>
                                </div>
                                )
                                :
                                null
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-4 arec-row-text my-auto'>*Nazwa linku:</div>
                            <div className='col-sm-8 arec-row-input-text'>
                                <input
                                    type="text"
                                    id="linkname"
                                    value={this.state.linkname}
                                    placeholder="Link do przepisu (spacja jako '-', bez znaków polskich) np 'kanapka-z-papryka-itd'"
                                    autoComplete="off"
                                    onChange={(e) => this.setState({linkname: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className='row'><div className='col-sm-8 offset-sm-4'><hr/></div></div>
                        <div className='row'>
                            <div className='col-sm-4 arec-row-text my-auto'>Źródło:</div>
                                <div className='col-sm-8 arec-row-input-text'>
                                <input
                                    type="text"
                                    id="source"
                                    value={this.state.source}
                                    placeholder="https://www.source"
                                    autoComplete="off"
                                    onChange={(e) => this.setState({source: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className='row'><div className='col-sm-8 offset-sm-4'><hr/></div></div>
                        <div className="recipe-child-add-file text-center mb-4">
                            <input type="file" id="myimage" name="myimage" ref="file"/>
                        </div>
                        <div className='recipe-child-add-textarea'>
                            <textarea rows='20' name="description" id="description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} style={{width: '100%'}}></textarea>
                        </div>
                        <button>Submit</button>
                    </form>
                {this.state.message ?
                    <div id='ErrorMessage-container' onClick={() => this.setState({message: ""})}>
                        <div id="ErrorMessage">{this.state.message}</div>
                    </div>
                    :
                    null
                }
                </div>
                :
                {this.state.loading?
                    <div id="reg-loading--l">
                        <div className="user-panel-loading-signature"><div className='RMasterloader'/></div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}
