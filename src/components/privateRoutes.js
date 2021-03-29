import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";
import {
  Route,
  Redirect
} from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const {
      component: Component,
      loggedIn,
      ...props
    } = this.props;
    console.log("Logged in")

    return ( <
      Route {
        ...props
      }
      render = {
        (props) =>
        loggedIn ? < Component {
          ...props
        }
        /> : <Redirect to="/login
        " />
      }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authReducer.loggedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);