import React, { Component } from 'react';

export class Traits extends Component {
    static displayName = Traits.name;

    constructor(props) {
        super(props);
        this.state = { champions: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(champions) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(champions).map(key => (
                        <tr>
                            <img src={champions[key].image} alt={champions[key].name}></img>
                            <td>{champions[key].name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Traits.renderForecastsTable(this.state.champions);

        return (
            <div>
                <h1 id="tabelLabel" >Traits</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
      //</div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('champion/all/Fates Festival of Beasts');
        const data = await response.json();
        this.setState({ champions: data, loading: false });
    }
}
