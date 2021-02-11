import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

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
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {champions.map(championList =>
            <tr>
              {championList.map(championList =>
                <td>{championList}</td>
               )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.champions);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      //</div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('champion/perfects');
    const data = await response.json();
      this.setState({ champions: data, loading: false });
  }
}
