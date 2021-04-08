import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";

class Champions extends Component {
    static displayName = Champions.name;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    static championTable(champions) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Traits</th>
                        <th>Ability</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(champions).map(key => (
                        <tr>
                            <img src={champions[key].image} alt={champions[key].name}></img>
                            <td>{champions[key].name}</td>
                            <td>
                                {Object.values(champions[key].traits).map(value => (
                                    <p>{value}</p>
                                ))}
                            </td>
                            <td>{champions[key].ability.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = (this.props.Champions == undefined)
            ? <p><em>Loading...</em></p>
            : Champions.championTable(this.props.Champions);

        return (
            <div>
                <h1 id="tabelLabel" >Champions</h1>
                {contents}
      //</div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
    }
};


const mapStateToProps = (state) => {
    return {
        Champions: state.Champion.Champions
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Champions)