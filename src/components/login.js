import React, { Component } from "react";
import { loginUser } from "../redux/actions/authActions";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.isLoggedIn) {
      props.history.push("/");
    }
    return null;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.dispatch(loginUser(user.email, user.password));

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.loggedIn,
  };
};

export default connect(mapStateToProps)(Login);

//export default WrappedNormalLoginForm;
