import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AiWork from './components/v2/components/AiWork';
import Main from './components/v2/components/Main';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/ai' component={AiWork} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
