import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home/Home';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import NavigationBar from './components/UI/NavigationBar/NavigationBar';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <NavigationBar />
                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
