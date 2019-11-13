import React, { Component } from 'react';

import Header from '../header';
import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummySwapiService'
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet/random-planet";
import { SwapiServiceProvider } from '../swapi-service-context';
import { PeoplePage,
         PlanetsPage,
         StarshipPage,
         LoginPage,
         SecretPage } from '../pages';
import { BrowserRouter as Router,
         Route,
         Switch,
         Redirect } from 'react-router-dom';
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof SwapiService ?
                            DummySwapiService : SwapiService;

            console.log('switched to', Service.name);

            return {
                swapiService: new Service()
            };
        });
    };

    render() {

        if(this.state.hasError) {
            return <ErrorIndicator />
        }

        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className='stardb-app'>
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet />
                            <Switch>
                                <Route path='/' render={() => <h2> Welcome to StartDB </h2>}
                                       exact />
                                <Route path='/people' render={() => <h2>People</h2>}
                                       exact />
                                <Route path='/people/:id?' component={PeoplePage} />
                                <Route path='/planets' component={PlanetsPage} />
                                <Route path='/starships' exact component={StarshipPage} />
                                <Route path='/starships/:id'
                                       render={({ match }) => {
                                           const { id } = match.params;
                                           return <StarshipDetails itemId={id}/>
                                       }} />
                                <Route
                                    path='/login'
                                    render={() => (
                                        <LoginPage isLoggedIn={isLoggedIn}
                                                   onLogin={this.onLogin}/>
                                    )}/>

                                <Route
                                    path='/secret'
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn}/>
                                    )}/>
                                <Route render={() => <h2> Page not found in Space </h2>} />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};