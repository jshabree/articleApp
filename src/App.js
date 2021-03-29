import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Registration from "./components/registration";
import Login from "./components/login";
import Facebook from "./components/facebook";
import User from "./components/user/index";
import CreateArticle from "./components/create-article";
import ArticleView from "./components/article/article-view";
import PrivateRoute from "./components/privateRoutes";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import EditArticle from "./components/article/EditArticle";
import EditProfile from "./components/EditProfile";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/register"
              render={(props) => <Registration {...props} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />

            <Route exact path="/facebook" component={Facebook} />

            <Route exact path="/" component={(props) => <Home {...props} />} />
            <Route
              exact
              path="/article/:id"
              component={(props) => <ArticleView {...props} />}
            />
            <PrivateRoute
              exact
              path="/create-article"
              component={(props) => <CreateArticle {...props} />}
            />
            <PrivateRoute
              exact
              path="/edit-article"
              component={(props) => <EditArticle {...props} />}
            />

            <Route
              exact
              path="/user/:id"
              component={(props) => <User {...props} />}
            />
            <PrivateRoute
              exact
              path="/EditProfile"
              component={(props) => <EditProfile {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
