import React, { Component, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Like from "./Like";
import Bookmark from "./Bookmark";
import {
  postNewComment,
  listArticleDetails,
  listArticleComments,
  deleteArticle,
  listArticleLikes,
  deleteComment,
  editComment,
} from "../../redux/actions/articlesActions";
import { getBookmarks } from "../../redux/actions/get-user";

import Comments from "../Comments"

// const Comments = (props) => {
//   if (props.comments.length > 0 && props !== undefined) {
//     return (
//       <div>
//         <h6>
//           {" "}
//           <b>Comments</b>
//         </h6>
//         <ul className="list-group">
//           {props.comments.map((comment, index) => {
//             return (
//               // <li className="list-group-item" key={index}>
//               //   <p>{comment.body}</p>-
//               //   <Link to={"/user/" + comment.user._id}>
//               //     {comment.user.name}
//               //   </Link>
//               //   <br />
//               //   <b>Date - </b> {comment.createdAt.substring(0, 10)}
//               // </li>
//               <div>
//                 <div class="card">
//                   <div class="card-body">
//                     {props.editMode && comment.user._id === props.user.id ? (
//                       <div>
//                         <input
//                           type="text"
//                           defaultValue={comment.body}
//                           ref={props.setRef}
//                         />
//                         <button
//                           type="button"
//                           class="btn btn-success"
//                           onClick={() => {
//                             props.save(comment._id);
//                           }}
//                         >
//                           Save
//                         </button>
//                       </div>
//                     ) : (
//                       <p>
//                         <h3>{comment.body}</h3>
//                       </p>
//                     )}
//                     {comment.user._id === props.user.id ? (
//                       // <div style={{ float: "right" }}>
//                       //   <button
//                       //     class="btn btn-primary a-btn-slide-text"
//                       //     data-toggle="tooltip"
//                       //     data-placement="top"
//                       //     title="Edit"
//                       //     onClick={props.edit}
//                       //   >
//                       //     <span
//                       //       class="glyphicon glyphicon-edit"
//                       //       aria-hidden="true"
//                       //     ></span>
//                       //     <span>
//                       //       <strong>Edit</strong>
//                       //     </span>
//                       //   </button>{" "}
//                       //   <button
//                       //     className="btn btn-primary a-btn-slide-text"
//                       //     data-toggle="tooltip"
//                       //     data-placement="top"
//                       //     title="Delete Comment"
//                       //     onClick={() => {
//                       //       props.delete(comment._id);
//                       //     }}
//                       //   >
//                       //     <span
//                       //       className="glyphicon glyphicon-remove"
//                       //       aria-hidden="true"
//                       //     ></span>
//                       //     <span>
//                       //       <strong>Delete</strong>
//                       //     </span>
//                       //   </button>
//                       // </div>
//                       <EditOptions edit={props.edit} comment={comment} delete={props.delete} />
//                     ) : (
//                       ""
//                     )}
//                     <b>By -</b>
//                     <Link to={"/user/" + comment.user._id}>
//                       {comment.user.name}
//                     </Link>
//                     <br />
//                     <b>Date - </b> {comment.createdAt.substring(0, 10)}
//                   </div>
//                 </div>
//                 <br />
//               </div>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   } else return null;
// };

// const EditOptions = (props) => {
//   return (
//     <div style={{ float: "right" }}>
//       <button
//         class="btn btn-primary a-btn-slide-text"
//         data-toggle="tooltip"
//         data-placement="top"
//         title="Edit"
//         onClick={props.edit}
//       >
//         <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
//         <span>
//           <strong>Edit</strong>
//         </span>
//       </button>{" "}
//       <button
//         className="btn btn-primary a-btn-slide-text"
//         data-toggle="tooltip"
//         data-placement="top"
//         title="Delete Comment"
//         onClick={() => {
//           props.delete(props.comment._id);
//         }}
//       >
//         <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
//         <span>
//           <strong>Delete</strong>
//         </span>
//       </button>
//     </div>
//   );
// };

class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleDetails: {
        title: "",
        body: "",
        user_id: "",
        user_name: "",
      },
      newComment: "",
      showComments: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(listArticleDetails(this.props.match.params.id));
    this.props.dispatch(listArticleLikes(this.props.match.params.id));
    if (this.props.loggedIn) {
      this.props.dispatch(getBookmarks(this.props.user.id));
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.article !== prevProps.article) {
      this.setState({
        articleDetails: {
          title: this.props.article.title,
          body: this.props.article.body,
          user_id: this.props.article.user._id,
          user_name: this.props.article.user.name,
        },
      });
    }
  }

  setRef = (ref) => {
    this.setState({
      inputRef: ref,
    });
  };

  onSave = (comment_id) => {
    console.log("You clicked Save button", this.state.isEditMode);
    console.log(this.state.newComment);
    this.setState({
      isEditMode: false,
      // newComment: this.state.inputRef.value,
    });
    console.log(this.state.inputRef.value);
    const comment_body = this.state.inputRef.value;
    const comment = {
      body: comment_body,
    };
    this.props.dispatch(editComment(comment_id, comment));
  };

  onChange = (e) => {
    this.setState({
      newComment: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      body: this.state.newComment,
      user: this.props.user.id,
    };
    const _id = this.props.match.params.id;
    if (this.props.loggedIn) {
      this.props.dispatch(postNewComment(_id, newComment));

      this.setState({
        newComment: "",
      });
    } else {
      alert("Log In or Register to comment.");
    }

    // window.location = "/";
  };
  handleEditComment = (comment_body, comment_id) => {
    this.setState({ isEditMode: !this.state.isEditMode });
    // const comment = {
    //   body: comment_body,
    // };
    // this.props.dispatch(editComment(comment_id, comment));
  };
  handleDeleteComment = (comment_id) => {
    this.props.dispatch(deleteComment(comment_id));
  };

  handleFetchComments = (e) => {
    e.preventDefault();
    if (this.state.showComments === false) {
      this.props.dispatch(listArticleComments(this.props.match.params.id));

      this.setState({ showComments: true });
    } else {
      this.setState({ showComments: false });
    }
  };

  //Edit Article & Delete
  editAndDeleArticle = () => {
    if (this.props.user.id === this.state.articleDetails.user_id) {
      return (
        <div>
          <Link to="/edit-article" className="btn btn-primary">
            Edit Article
          </Link>
          <button className="btn btn-primary" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      );
    }
    return null;
  };

  handleDelete = (e) => {
    this.props.dispatch(deleteArticle(this.props.match.params.id));
    window.location = "/";
  };
  showBookmark = () => {
    if (
      this.props.loggedIn &&
      this.props.user.id !== this.state.articleDetails.user_id
    ) {
      return <Bookmark />;
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <h3>{this.state.articleDetails.title}</h3>
        <p>{this.state.articleDetails.body}</p>
        <h6>
          {" "}
          <b> Author - </b>
          <Link to={"/user/" + this.state.articleDetails.user_id}>
            {this.state.articleDetails.user_name}
          </Link>
        </h6>

        <Like />
        {this.showBookmark()}
        {this.editAndDeleArticle()}

        <hr />
        <h6>
          <a href="#" onClick={this.handleFetchComments}>
            Show Comments
          </a>
        </h6>
        {this.state.showComments ? (
          <Comments
            comments={this.props.comments}
            user={this.props.user}
            delete={this.handleDeleteComment}
            editMode={this.state.isEditMode}
            edit={this.handleEditComment}
            save={(id) => {
              this.onSave(id);
            }}
            setRef={this.setRef}
          />
        ) : (
          ""
        )}

        <br />

        {this.props.loggedIn ? (
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Add Comments </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.newComment}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          " "
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn,
    user: state.authReducer.user,
    article: state.articlesReducer.article,
    comments: state.articlesReducer.comments,
  };
}

export default connect(mapStateToProps)(ArticleView);
