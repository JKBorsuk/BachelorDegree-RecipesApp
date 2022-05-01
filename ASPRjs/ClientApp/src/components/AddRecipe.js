import React, {Component} from 'react';
import axios from 'axios';
import './AddRecipe.css';

export class AddRecipe extends Component {
    static displayName = AddRecipe.name;

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            linkname: "",
            type: '',
            source: "",
            description: "Opis*\n\n* - wymagane",
            ingredients: [],
            spices: [],
            response: [],
            message: "",
            filename: "Noimg.png",
            condition: true
        }
        this.submit = this.submit.bind(this);
    }

    ingredient = (name, amount) => { return { name: name, amount: amount } }

    spice = (name) => { return { name: name } }


    componentDidMount() {
        this.addIngredient();
        this.addSpice();
        axios.get("Dishes/Recipe/ViewIngredients").then(resp => {
            this.setState({response: resp.data.ingredients})
          });
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
        this.setState({
            type: parseInt(this.state.type),
        })
        e.preventDefault();
        axios.post("Dishes/Recipe/AddRecipe", {
            type: this.state.type,
            name: this.state.name,
            ingredients: this.state.ingredients,
            spices: this.state.spices,
            description: this.state.description,
            source: this.state.source,
            photoFileName: this.state.filename,
            linkName: this.state.linkname
            })
            .catch(() => {
                this.setState({message: "LinkName is propably occupied", condition: false})
                document.getElementById('message').style.color = "red";  
            })
        
        if(this.state.condition) {
            try {
                this.setState({filename: document.getElementById('myimage').files[0].name})
                this.bodyFormData = new FormData();
                this.bodyFormData.append('file', this.refs.file.files[0]);
                axios.post("Dishes/Recipe/SaveImage/" + this.state.linkname, this.bodyFormData)
                .then(() => {
                    this.setState({message: "Recipe created"})
                    document.getElementById('message').style.color = "green";
                })
            }
            catch(err) {
                this.setState({message: "Recipe created, without image"});
                document.getElementById('message').style.color = '#B3FF00';
            }
        }
        else this.setState({condition: true})
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
            <div className='recipe-container-add'>
                <form onSubmit={this.submit}>
                    <div className='recipe-child-add'>
                        <div className='recipe-data'>Nazwa*:</div>
                        <input
                            type="text"
                            id="name"
                            value={this.state.name}
                            placeholder="name"
                            autoComplete="off"
                            onChange={(e) => this.setState({name: e.target.value})}
                        />
                    </div>
                    <div className='recipe-child-add' style={{clear: 'both'}}>
                        <div className='recipe-data'>Typ*:</div>
                        <div className='recipe-child-list'>
                            <input list="typelist" id="type" value={this.state.type} onChange={(e) => this.setState({type: e.target.value})} autoComplete="off" placeholder="type"/>
                            <datalist id="typelist">
                                <option value="1">Meat Breakfast</option>
                                <option value="2">Meat Lunch/Dinner</option>
                                <option value="3">Vege Breakfast</option>
                                <option value="4">Vege Lunch/Dinner</option>
                            </datalist>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}className='recipe-child-add'>
                        <div className='recipe-data'><div style={{clear: 'both', float: 'right'}}></div>Składniki*<input type="button" value="Dodaj" onClick={this.addIngredient.bind(this)}/></div>
                        {(typeof(this.state.ingredients) == 'object') ?
                        this.state.ingredients.map((el,index) =>
                        <div className='recipe-child-list'>
                            <input list="typelist-i" id={"ingredient"+index} value={el.name} onChange={(e) => this.handleIngredientNameChange(e,index)} autoComplete="off" placeholder={"ingredient " + (index+1)}/>
                            <datalist id="typelist-i">
                                {(typeof(this.state.response) == 'object') && el.name ?
                                    this.state.response.map((p,ind) => 
                                        <option value={p}></option>
                                    )
                                    :
                                    null
                                }
                            </datalist>
                            <input type="text" id={"amount"+index} value={el.amount} placeholder="amount" onChange={(e) => this.handleIngredientAmountChange(e,index)} autoComplete="off"/>
                        </div>
                        )
                        :
                        null
                        }
                    </div>
                    <div className='recipe-child-add' style={{clear: 'both'}}>
                        <div className='recipe-data'>Dodatki<input type="button" value="Dodaj" onClick={this.addSpice.bind(this)}/><div style={{clear: 'both', float: 'right'}}></div></div>
                        {(typeof(this.state.spices) == 'object') ?
                        this.state.spices.map((el,index) =>
                        <div className='recipe-child-list-spice'>
                            <input type="text" id={"spice"+index} autoComplete="off" placeholder={"spice " + (index+1)} value={el.name} onChange={(e) => this.handleSpiceNameChange(e,index)}/>
                        </div>
                        )
                        :
                        null
                        }
                    </div>
                    <div className='recipe-child-add' style={{clear: 'both'}}>
                        <div className='recipe-data'>Nazwa linku*:</div>
                        <input
                            type="text"
                            id="linkname"
                            value={this.state.linkname}
                            placeholder="kanapka-z-papryką-itd"
                            autoComplete="off"
                            onChange={(e) => this.setState({linkname: e.target.value})}
                        />
                    </div>
                    <div className='recipe-child-add' style={{clear: 'both'}}>
                        <div className='recipe-data'>Źródło:</div>
                        <input
                            type="text"
                            id="source"
                            value={this.state.source}
                            placeholder="https://www.source"
                            autoComplete="off"
                            onChange={(e) => this.setState({source: e.target.value})}
                        />
                    </div>
                    <div className="recipe-child-add-file">
                        <input type="file" id="myimage" name="myimage" ref="file"/>
                    </div>
                    <div className='recipe-child-add-textarea'>
                        <textarea rows='10' name="description" id="description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} style={{width: '100%'}}></textarea>
                    </div>
                    <button>Submit</button>
                </form>
            <div id="message">{!this.state.message === "" ? <div>{this.state.message + ", Sprawdź jak wygląda tutaj: "} <a style={{textDecoration: 'none', color: 'rgb(211, 155, 52)'}} href={"./recipes/" + this.state.linkname}>link</a></div> : <div>{this.state.message}</div>}</div>
            </div>
        );
    }
}
