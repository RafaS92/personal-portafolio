import React from "react";
import Principal from "./components/v1/Principal";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Principal} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
