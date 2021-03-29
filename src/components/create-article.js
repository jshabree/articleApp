import React, { Component } from "react";
import { connect } from "react-redux";
import { createArticleDetailsSubmit } from "../redux/actions/articlesActions";

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      user: "",
    };
  }

  componentDidMount() {
    console.log(this.props.user);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));

    const article = {
      title: this.state.title,
      body: this.state.body,
      user: this.props.user.id,
    };

    this.props.dispatch(createArticleDetailsSubmit(article));
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <h3>Create New Article</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              required
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Body: </label>
            <input
              type="text"
              required
              name="body"
              className="form-control"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Article"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  // console.log("Article" + JSON.stringify(state.articleDetails));
  return {
    user: state.authReducer.user,
  };
}

export default connect(mapStateToProps)(CreateArticle);
