import React, { Component } from 'react';
//import './Recipelist.css'

export class ViewAll extends Component {
    static displayName = ViewAll.name;

    constructor(props) {
        super(props);
        this.state = { recipes: [], loading: true };
    }

    componentDidMount() {
        this.WriteData();
    }

    static dishType(props) {
        switch (props) {
            case 1:
                return 'Meat Breakfast'
            case 2:    
                return 'Meat Lunch/Dinner'
            case 3:    
                return 'Vege Breakfast'
            case 4:    
                return 'Vege Lunch/Dinner'
        }
    }

    static renderRecipeTable(recipes) {
        return (
            <div>
                <div>{recipes.map(el => 
                    <div key={el.name}>
                        <div>{"Nazwa przepisu: " + el.name}</div>
                        <div>{"Jego opis: " + el.description}</div>
                        <div>{"Jego rodzaj: " + this.dishType(el.type)}</div>
                        <div>
                            {(typeof (el.ingredients) == 'object') ?
                                <div>{el.ingredients.map((sub,k) =>
                                    <div>
                                        <div>{"Składnik " + (k+1) + ": " + sub.name + ' - ' + sub.amount}</div>
                                    </div>
                                )}</div>
                                :
                                null}
                        </div>
                    </div>)}
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ViewAll.renderRecipeTable(this.state.recipes);

        return (
            <div>
                <h1 id="tabelLabel" >All the recipes</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async WriteData() {
        const response = await fetch('Dishes/Recipe/ViewAll');
        const data = await response.json();
        this.setState({ recipes: data.recipes, loading: false });
    }
}
