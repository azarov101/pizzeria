import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Menu from './menu/Menu';
import NavBar from './NavBar';

function App() {
    return(
        <div className="ui container">
        <BrowserRouter>
        <NavBar/>
        <br />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/menu" exact component={Menu} />
            </Switch>
        </BrowserRouter>
        </div>
    );
}

export default App;
