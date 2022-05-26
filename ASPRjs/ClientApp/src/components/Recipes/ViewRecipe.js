import axios from "axios";
import { Component } from "react";
import './ViewRecipe.css'

export class ViewRecipe extends Component {
    static displayName = ViewRecipe.name

    constructor(props) {
        super(props);
        this.state = {
            linkname: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            ingredient: [],
            max_width: 400,
            description: "",
            condition_v: false,
            login: this.props.appdata,
            loading: true
        }
    }
    componentDidMount() {
        try {
            axios.get("Dishes/Recipe/" + this.state.linkname)
            .then((resp) => {
                this.setState({
                    condition_v: true,
                    ingredient: resp.data,
                    loading: false,
                    description: resp.data.description
                })
            }).catch(() => { window.location.href = "/" })
            .finally(() => {
                document.getElementById('recipe-description-id').innerHTML = this.state.description.replaceAll('\\n','<br/><br/>');
            })
        }
        catch(err) {
            console.log(err.status)
        }
    }

    dishType(props) {
        switch (props) {
            case 1:
                return 'Śniadanie'
            case 2:    
                return 'Obiad/kolacja'
            case 3:    
                return 'Śniadanie vege'
            case 4:    
                return 'Vege obiad/kolacja'
        }
    }

    shorten(props) {
        var i = 0;
        var id = 0;
        if(typeof(props) == 'string') {
            for(var index = 0; index < props.length; index++) {
                if(props.charAt(index) === '.' && i < 2) { i++; id = index }
                if(id === 2) return id;
            }
        }
        return id;
    }

    show_LessSigns(props) {
        const pom = this.shorten(props);
        if(typeof(props) == 'string') {
            switch(props[pom + 1])
            {
                case 'c':
                    return props.substring(0, pom+4);
                default:
                    return props.substring(0, pom+3);
            }
        }
        else return props;
    }

    render() {
        return(
            <div>
                {this.state.loading === false ?
                <div>
                    {this.state.condition_v === true ?
                    <div className="recipe-container container">
                        <div className="recipe">
                            <div className="recipe-title">{this.state.ingredient.name}</div>
                            <div className="recipe-type"><p>{this.dishType(this.state.ingredient.type)}</p></div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="recipe-child recipe-description" id="recipe-description-id"></div>
                                    <div className="recipe-child recipe-ingredients">
                                        {(typeof(this.state.ingredient.ingredients) == "object") ?
                                            <div>
                                                {this.state.ingredient.ingredients.map(p => 
                                                    <a href={"https://www.google.com/search?q=" + p.name}>
                                                        <div key={p.name} className="recipe-ingredient" style={{display: "inline-block"}}>
                                                            {p.name + " - " + p.amount}
                                                        </div>
                                                    </a>
                                                )}
                                            </div>
                                        :
                                        <div>Bez składników</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    {typeof(this.state.ingredient.photoFileName) == 'string' && this.state.ingredient.photoFileName != "Noimg.png" ?
                                        <div className="recipe-child recipe-image"><img id='rec-image' alt="" style={{maxWidth: this.state.max_width, width: '100%', height: 'auto', aspectRatio: '1.4', objectFit: 'cover'}} src={"Images/" + this.state.ingredient.photoFileName}/></div>
                                        :
                                        <div className="recipe-child recipe-image"><img id='rec-image' alt="" style={{maxWidth: this.state.max_width, width: '100%', height: 'auto', aspectRatio: '1.4', objectFit: 'cover'}} src="Images/Noimg.png"/></div>
                                    }
                                </div>
                            </div>
                            <div className="recipe-child recipe-spices">
                                {(typeof(this.state.ingredient.spices) == "object") && this.state.ingredient.spices.length > 0?
                                <div>
                                    <p>Dodatki</p>
                                    <div>
                                        {this.state.ingredient.spices.map(p => 
                                            <div key={p.name} className="recipe-spice" style={{display: "inline-block"}}>
                                                {p.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                :
                                <div>
                                    <p>Dodatki - brak</p>
                                </div>
                                }
                            </div>
                            <div className="recipe-child recipe-source"><hr/><p style={{fontStyle: "italic"}}>Źródło</p> 
                            {this.state.ingredient.source ?
                                <a href={this.state.ingredient.source}>{this.show_LessSigns(this.state.ingredient.source)}</a>
                                :
                                <span style={{fontStyle: 'italic'}}>Własne</span>}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="recipe-container">
                        <div style={{textAlign: 'center'}}>This recipe does not exist</div>
                    </div>}
                </div>
                :
                <div className="user-panel-loading-signature"><div className='RMasterloader'/></div>}
            </div>
        )
    }
}