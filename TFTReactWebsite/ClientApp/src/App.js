import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Champions from './pages/Champions';
import { Items } from './pages/Items';
import { Traits } from './pages/Traits';
import Optimiser from './pages/Optimiser';
import Perfects from './pages/Perfects';
import { Counter } from './components/Counter';
import { Provider } from "react-redux";
import store from "./store/Store";

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Provider store={store}>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/champions' component={Champions} />
                    <Route path='/items' component={Items} />
                    <Route path='/traits' component={Traits} />
                    <Route path='/perfects' component={Perfects} />
                    <Route path='/optimiser' component={Optimiser} />
                </Layout>
            </Provider>
        );
    }
}
