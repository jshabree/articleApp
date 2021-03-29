import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { getArticlesList } from "../redux/actions/get-list";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userName: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getArticlesList());
  }

  componentDidUpdate(prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      //   state.userName = nextProps.authReducer.user.name;
      this.setState({ isLoggedIn: this.props.loggedIn });
    }
    return null;
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(logoutUser());
    window.location = "/";
  };
  render() {
    let createArticle;
    let register;
    let login;
    let logout;
    let user;

    createArticle = (
      <Link to="/create-article" className="nav-link">
        Create Article{" "}
      </Link>
    );

    register = (
      <Link to="/register" className="nav-link">
        Register{" "}
      </Link>
    );

    login = (
      <Link to="/login" className="nav-link">
        Login{" "}
      </Link>
    );

    logout = (
      <a className="nav-link" href="#" onClick={this.handleLogout}>
        Logout{" "}
      </a>
    );

    user = (
      <Link to={"/user/" + this.props.user.id} className="nav-link">
        {" "}
        {this.props.user.name}{" "}
      </Link>
    );

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Home{" "}
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {" "}
              {this.state.isLoggedIn ? (
                <li className="navbar-item"> {createArticle} </li>
              ) : (
                ""
              )}
              {!this.state.isLoggedIn ? (
                <li className="navbar-item"> {register} </li>
              ) : (
                ""
              )}{" "}
              {!this.state.isLoggedIn ? (
                <li className="navbar-item"> {login} </li>
              ) : (
                ""
              )}{" "}
              {this.state.isLoggedIn ? (
                <li className="navbar-item"> {user} </li>
              ) : (
                ""
              )}{" "}
              {this.state.isLoggedIn ? (
                <li className="navbar-item"> {logout} </li>
              ) : (
                ""
              )}{" "}
            </ul>{" "}
          </div>{" "}
        </nav>{" "}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(Navbar);