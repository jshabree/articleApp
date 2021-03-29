import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/styles.css";

import { connect } from "react-redux";
import {
  getUser,
  getBookmarks,
  getFollowers,
  getFollowing,
  getUserWrittenArticles,
  getArticlesLiked,
} from "../../redux/actions/get-user";
import ArticlesList from "../article/articles-list";
import FollowButton from "./FollowButton";

class ErrorBoundary extends Component {
  state = {
    errorMessage: null,
  };

  static getDerivedStateFromError(error) {
    return {
      errorMessage: error.message,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.errorMessage) {
      return <h1> Oops!{this.state.errorMessage} </h1>;
    }

    return this.props.children;
  }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        role: "",
        bookmarks: [],
        following: [],
        followers: [],
        _id: "",
        name: "",
        email: "",
        hobbies: [],
        ratings: null,
        skills: [],
      },
      showFollowers: false,
      showFollowing: false,
      showArticles: false,
      showArticlesLiked: false,
      showBookmarks: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getUser(this.props.match.params.id));
    console.log("Role is :", this.state.user.role);
  }
  componentDidUpdate(prevProps) {
    if (this.props.userDetails !== prevProps.userDetails) {
      this.setState({
        user: {
          role: this.props.userDetails.role,
          bookmarks: this.props.userDetails.bookmarks,
          following: this.props.userDetails.following,
          followers: this.props.userDetails.followers,
          _id: this.props.userDetails._id,
          name: this.props.userDetails.name,
          email: this.props.userDetails.email,
          hobbies: this.props.userDetails.hobbies,
          ratings: this.props.userDetails.ratings,
          skills: this.props.userDetails.skills,
        },
      });
    }
  }

  showFollowers = (e) => {
    e.preventDefault();
    if (this.state.user.followers.length === 0) {
      return false;
    }
    this.props.dispatch(getFollowers(this.props.match.params.id));
    this.setState({
      showFollowers: true,
      showFollowing: false,
      showArticles: false,
      showArticlesLiked: false,
      showBookmarks: false,
    });
  };

  showFollowing = (e) => {
    e.preventDefault();
    if (this.state.user.following.length === 0) {
      return false;
    }
    this.props.dispatch(getFollowing(this.props.match.params.id));
    this.setState({
      showFollowing: true,
      showFollowers: false,
      showArticles: false,
      showArticlesLiked: false,
      showBookmarks: false,
    });
  };

  getArticlesLiked = (e) => {
    e.preventDefault();
    this.props.dispatch(getArticlesLiked(this.state.user._id));
    this.setState({
      showArticlesLiked: true,
      showFollowing: false,
      showFollowers: false,
      showArticles: false,
      showBookmarks: false,
    });
  };

  getArticlesWritten = (e) => {
    e.preventDefault();
    this.props.dispatch(getUserWrittenArticles(this.state.user._id));
    this.setState({
      showArticles: true,
      showFollowing: false,
      showFollowers: false,
      showArticlesLiked: false,
      showBookmarks: false,
    });
  };
  getBookmarks = (e) => {
    e.preventDefault();
    this.props.dispatch(getBookmarks(this.state.user._id));
    this.setState({
      showArticles: false,
      showFollowing: false,
      showFollowers: false,
      showArticlesLiked: false,
      showBookmarks: true,
    });
  };

  showFollow = () => {
    if (this.props.loggedIn && this.props.user.id !== this.state.user._id) {
      return <FollowButton />;
    }
  };

  editProfile = (e) => {
    this.props.history.push({
      pathname: "/EditProfile",
      userId: this.state.user._id,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
            <div className="well profile">
              <div className="col-sm-12">
                <div className="col-xs-12 col-sm-8">
                  <h2> {this.state.user.name} </h2>{" "}
                  <p>
                    <strong> About: </strong> {this.state.user.role}{" "}
                  </p>{" "}
                  <p>
                    <strong> Hobbies: </strong>{" "}
                    {this.state.user.hobbies.map((h) => {
                      return <span className="tags"> {h} </span>;
                    })}{" "}
                  </p>{" "}
                  <p>
                    <strong> Skills: </strong>{" "}
                    {this.state.user.skills.map((s) => {
                      return <span className="tags"> {s} </span>;
                    })}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="col-xs-12 col-sm-4 text-center">
                  <figure>
                    <img
                      src="http://www.localcrimenews.com/wp-content/uploads/2013/07/default-user-icon-profile.png"
                      alt=""
                      className="img-circle img-responsive"
                    />
                    <figcaption className="ratings">
                      <p>
                        Ratings{" "}
                        <a href="#">
                          <span className="fa fa-star"> </span>{" "}
                        </a>{" "}
                        <a href="#">
                          <span className="fa fa-star"> </span>{" "}
                        </a>{" "}
                        <a href="#">
                          <span className="fa fa-star"> </span>{" "}
                        </a>{" "}
                        <a href="#">
                          <span className="fa fa-star"> </span>{" "}
                        </a>{" "}
                        <a href="#">
                          <span className="fa fa-star-o"> </span>{" "}
                        </a>{" "}
                      </p>{" "}
                    </figcaption>{" "}
                  </figure>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-xs-12 divider text-center">
                <div className="col-xs-12 col-sm-4 emphasis">
                  <h2>
                    <strong> {this.state.user.followers.length} </strong>{" "}
                  </h2>{" "}
                  <p>
                    <small>
                      <a href="#" onClick={this.showFollowers}>
                        Followers{" "}
                      </a>{" "}
                    </small>{" "}
                  </p>{" "}
                  <button
                    type="button"
                    className="btn btn-success btn-block"
                    onClick={this.getArticlesLiked}
                  >
                    <span className="fa fa-plus-circle"> </span> Articles Liked{" "}
                  </button>{" "}
                </div>{" "}
                <div className="col-xs-12 col-sm-4 emphasis">
                  <h2>
                    <strong> {this.state.user.following.length} </strong>{" "}
                  </h2>{" "}
                  <p>
                    <small>
                      <a href="#" onClick={this.showFollowing}>
                        Following{" "}
                      </a>{" "}
                    </small>{" "}
                  </p>{" "}
                  <button
                    className="btn btn-info btn-block"
                    onClick={this.getArticlesWritten}
                  >
                    <span className="fa fa-user"> </span> View Articles{" "}
                  </button>{" "}
                </div>{" "}
                <div className="col-xs-12 col-sm-4 emphasis">
                  <h2>
                    <strong> {this.state.user.bookmarks.length} </strong>{" "}
                  </h2>{" "}
                  <p>
                    <small>
                      <a href="#" onClick={this.getBookmarks}>
                        Bookmarks{" "}
                      </a>{" "}
                    </small>{" "}
                  </p>{" "}
                  <div className="btn-group dropup btn-block">
                    {this.props.loggedIn &&
                    this.props.user.id === this.state.user._id ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.editProfile}
                      >
                        {" "}
                        <span className="fa fa-gear"> </span> Edit Profile{" "}
                      </button>
                    ) : (
                      this.showFollow()
                    )}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="container">
          {" "}
          {this.state.showArticles && this.props.articles.length !== 0 ? (
            <div>
              <h5> Articles Written </h5>{" "}
              <ArticlesList articles={this.props.articles} />{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
        <div className="container">
          {" "}
          {this.state.showFollowers && this.props.followers.length !== 0 ? (
            <div>
              <h5> Followers </h5>{" "}
              <ul>
                {" "}
                {this.props.followers.map((user) => {
                  return (
                    <li key={user._id}>
                      <Link to={"/user/" + user._id}> {user.name} </Link>{" "}
                    </li>
                  );
                })}{" "}
              </ul>{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
        <div className="container">
          {" "}
          {this.state.showFollowing && this.props.following.length !== 0 ? (
            <div>
              <h5> Following </h5>{" "}
              <ul>
                {" "}
                {this.props.following.map((user) => {
                  return (
                    <li key={user._id}>
                      <Link to={"/user/" + user._id}> {user.name} </Link>{" "}
                    </li>
                  );
                })}{" "}
              </ul>{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
        <div className="container">
          {" "}
          {this.state.showArticlesLiked && this.props.articlesLiked ? (
            <div>
              <h5> Articles Liked </h5>{" "}
              <ul>
                {" "}
                {this.props.articlesLiked.map(({ article }) => {
                  return (
                    <li key={article._id}>
                      <Link to={"/article/" + article._id}>
                        {" "}
                        {article.title}{" "}
                      </Link>{" "}
                    </li>
                  );
                })}{" "}
              </ul>{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
        <div className="container">
          {" "}
          {this.state.showBookmarks && this.props.bookmarks ? (
            <div>
              <h5> Bookmarks </h5>{" "}
              <ul>
                {" "}
                {this.props.bookmarks.map((article) => {
                  return (
                    <li key={article._id}>
                      <Link to={"/article/" + article._id}>
                        {" "}
                        {article.title}{" "}
                      </Link>{" "}
                    </li>
                  );
                })}{" "}
              </ul>{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("User" + JSON.stringify(state.userReducer.user));
  // console.log("Followers" + JSON.stringify(state.userReducer.followers));
  // console.log("Following" + JSON.stringify(state.userReducer.following));
  // console.log("Articles" + JSON.stringify(state.userReducer.articles));
  // console.log(
  //   "Articles Liked" + JSON.stringify(state.userReducer.articlesLiked)
  // );
  // console.log("Bookmarks" + JSON.stringify(state.userReducer.bookmarks));

  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
    userDetails: state.userReducer.user,
    followers: state.userReducer.followers,
    following: state.userReducer.following,
    articles: state.userReducer.articles,
    articlesLiked: state.userReducer.articlesLiked,
    bookmarks: state.userReducer.bookmarks,
  };
}

export default connect(mapStateToProps)(User);
