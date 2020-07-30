import React from "react";
import Navigation from "./components/Navigation";
import Principal from "./components/Principal";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Principal} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
