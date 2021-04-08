import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { useSelector, useDispatch, connect } from "react-redux";
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { setTftSet } from '../actions/SetActions';
import { initializeTftSet } from "../actions/SetActions";

class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleOptionChange = this.handleChange.bind(this);

        this.state = {
            collapsed: true,
            sets: [],
            loading: true
        };
    }

    componentDidMount() {
        if (localStorage.chosenSet) {
            this.props.ChooseSet(localStorage.chosenSet);
        } else {
            this.props.InitializeSet();
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleChange(event) {
        console.log(event.target.value);
        this.props.ChooseSet(event.target.value);
    }

    renderOptions(sets) {
        return (
            <div class="input-group mb-3">
                <Form onChange={(e) => { this.handleChange(e); }}>
                    <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                            {sets.map(set => (
                                <option value={set.name}>{set.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    render() {
        let options = this.props.AllSets == undefined
            ? <p><em>Loading...</em></p>
            : this.renderOptions(this.props.AllSets);

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">TFTReactWebsite</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        {options}
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to={{ pathname: '/champions' }}>Champions</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/items">Items</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/traits">Traits</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to={`/perfects`}>Perfects</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to={`/optimiser`}>Optimiser</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        InitializeSet: () => dispatch(initializeTftSet()),
        ChooseSet: (set) => { dispatch(setTftSet(set)) }
    }
};

const mapStateToProps = (state) => {
    return {
        AllSets: state.Set.Sets
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)