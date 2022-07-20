import React from 'react';
// import Navigation from './components/v1/Navigation';
import Principal from './components/v1/Principal';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './components/v2/components/Main';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/v1' component={Principal} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
