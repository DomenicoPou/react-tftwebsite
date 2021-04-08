import React, { Component } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";
import { ChampionIcon } from '../components/ChampionIcon';
import TraitIcon from '../components/TraitIcon';
import MaterialTable from 'material-table';
import ReactDOM from 'react-dom';
import { tableIcons } from "../const/TableConst";

class Perfects extends Component {
    static displayName = Perfects.name;

    constructor(props) {
        super(props);
        this.state = {
            perfects: [],
            champions: [],
            tableData: [],
            isLoading: true
        };
    }

    componentDidMount() {
        if (this.props.data.Champions !== undefined && this.props.data.PerfectSets !== undefined) {
            if (this.state.perfects !== this.props.data.PerfectSets && this.state.Champions !== this.props.data.Champions) {
                if (this.props.data.PerfectSets.length > 0 && this.props.data.Champions !== null) {
                    this.GenerateTableData(this.props.data.Champions, this.props.data.PerfectSets);
                    this.setState({
                        perfects: this.props.data.PerfectSets,
                        champions: this.props.data.Champions,
                        isLoading: false
                    });
                }
            }
        }
    }

    componentDidUpdate() {
        if (this.props.data.Champions !== undefined && this.props.data.PerfectSets !== undefined) {
            if (this.state.perfects !== this.props.data.PerfectSets && this.state.Champions !== this.props.data.Champions) {
                if (this.props.data.PerfectSets.length > 0 && this.props.data.Champions !== null) {
                    this.GenerateTableData(this.props.data.Champions, this.props.data.PerfectSets);
                    this.setState({
                        perfects: this.props.data.PerfectSets,
                        champions: this.props.data.Champions,
                        isLoading: false
                    });
                }
            }
        }
    }

    GenerateTableData(champions, perfects)
    {
        let data = [];
        Object.values(perfects).map(championList => {
            var total = 0;
            var highCount = 0;
            var tier3 = 0;
            var tier4 = 0;
            var tier5 = 0;
            var overallTraits = {};
            Object.values(championList).map(champion => {
                if (champions[champion] !== undefined) {
                    total += champions[champion].value;

                    if (champions[champion].tier == 3) 
                        tier3++;

                    if (champions[champion].tier == 4)
                        tier4++;

                    if (champions[champion].tier == 5)
                        tier5++;

                    Object.values(champions[champion].traits).map(trait => {
                        if (overallTraits[trait] === undefined) {
                            overallTraits = { ...overallTraits, [trait]: 0 };
                        }
                        overallTraits[trait]++;
                    });
                }
            });
            highCount = tier3 + tier4 + tier5;
            data = [...data, { championList: championList, championCount: championList.length, valueTotal: total, highTierTotal: highCount, traits: overallTraits }];
        });

        this.setState({
            tableData: data
        });
    }

    static perfectsTable(champions, perfects, tableData) {

        return (
            <>
                <MaterialTable
                    icons={tableIcons}
                    options={{
                        pageSize: 10,
                        pageSizeOptions: [10, 25, 50, 200],
                        filtering: true
                    }}
                    columns={[
                        {
                            title: 'Champions',
                            field: 'championList',
                            render: rowData =>
                                <div style={{ display: 'flex' }}>
                                    {Object.values(rowData.championList).map(champion => (
                                        <span>
                                            {(champions[champion] !== undefined) ?
                                                <ChampionIcon champion={champions[champion]} />
                                                :
                                                <span> {champion[0]} </span>
                                            }
                                        </span>
                                    ))}
                                </div>
                        },
                        {
                            title: 'Count',
                            field: 'championCount'
                        },
                        {
                            title: 'Champion Tier Total',
                            field: 'valueTotal'
                        },
                        {
                            title: 'High Tier Total',
                            field: 'highTierTotal'
                        },
                        {
                            title: 'Traits',
                            field: 'traits',
                            render: rowData =>
                                <div style={{ display: 'flex' }}>
                                    {Object.keys(rowData.traits).map(key => (
                                        <span>
                                            <TraitIcon name={key} count={rowData.traits[key]} />
                                            
                                        </span>
                                    ))}
                                </div>
                        },
                    ]}
                    data={tableData}
                    title="Perfect Champion Combinations"
                />
            </>
        );
    }

    render() {
        let contents = (this.state.isLoading)
            ? <p><em>Loading...</em></p>
            : Perfects.perfectsTable(this.props.data.Champions, this.props.data.PerfectSets, this.state.tableData);

        return (
            <div>
                <h1 id="tabelLabel" >Perfects</h1>
                <div>
                    {contents}
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
    }
};


const mapStateToProps = (state) => {
    return {
        data: {
            PerfectSets: state.Champion.PerfectSets,
            Champions: state.Champion.Champions
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Perfects);