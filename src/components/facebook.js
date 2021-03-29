import React, { Component } from "react";


export default class facebook extends Component {
  handlefacebook = (e) => {
    fetch("http://localhost:5000/authenticate/facebook", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.handlefacebook}
        >
          Facebook Login
        </button>
      </div>
    );
  }
}

// function facebook() {
//   return <a href={"http://localhost:5000/authenticate/facebook/"}>Login</a>;
// }
// export default facebook;
