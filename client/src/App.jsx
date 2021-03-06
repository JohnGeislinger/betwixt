import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Home from "./pages/Home/index";
import Maps from "./pages/Maps";
import NavBar from "./components/NavBar";
import Callback from "./Callback";
import SecuredRoute from "./components/SecuredRoute/SecuredRoute";
import NewQuestion from "./components/NewQuestion/NewQuestion";
import auth0Client from "./Auth";
import Message from "./components/Message";
import Weather from "./components/Weather";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: false
    };
  }

  async componentDidMount() {
    try {
      auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
  }

  render() {
    return (
      <Router>
        <div className="root">
          <NavBar />
          <div className="main">
            <Route path="/" exact component={Home} />
            <Route path="/callback" component={Callback} />
            <Route path="/map" component={Maps} />
            <Route exact path="/weather" component={Weather} />
            <SecuredRoute
              path="/message"
              component={Message}
              checkingSession={this.state.checkingSession}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
