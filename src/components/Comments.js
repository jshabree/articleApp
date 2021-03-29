import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import "../styles/comments.sass";

const Comments = (props) => {
  if (props.comments.length > 0 && props !== undefined) {
    return (
      <div>
        <h6>
          {" "}
          <b>Comments</b>
        </h6>
        <ul className="list-group">
          {props.comments.map((comment, index) => {
            var date = new Date(comment.createdAt);
            return (
              <div>
                <div class="card">
                  <div class="card-body">
                    {props.editMode && comment.user._id === props.user.id ? (
                      <div>
                        <input
                          type="text"
                          defaultValue={comment.body}
                          ref={props.setRef}
                        />
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => {
                            props.save(comment._id);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p>
                        <h3>{comment.body}</h3>
                      </p>
                    )}
                    {comment.user._id === props.user.id ? (
                      <EditOptions
                        edit={props.edit}
                        comment={comment}
                        delete={props.delete}
                      />
                    ) : (
                      ""
                    )}
                    <b>By -</b>
                    <Link to={"/user/" + comment.user._id}>
                      {comment.user.name}
                    </Link>
                    <br />
                    <b>{formatDistanceToNow(date)} ago </b>
                  </div>
                </div>
                <br />
              </div>
            );
          })}
        </ul>
      </div>
    );
  } else return null;
};

const EditOptions = (props) => {
  return (
    <div id="CommentEditOptions">
      <button
        class="btn btn-primary a-btn-slide-text"
        data-toggle="tooltip"
        data-placement="top"
        title="Edit"
        onClick={props.edit}
      >
        <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
        <span>
          <strong>Edit</strong>
        </span>
      </button>{" "}
      <button
        className="btn btn-primary a-btn-slide-text"
        data-toggle="tooltip"
        data-placement="top"
        title="Delete Comment"
        onClick={() => {
          props.delete(props.comment._id);
        }}
      >
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        <span>
          <strong>Delete</strong>
        </span>
      </button>
    </div>
  );
};

export default Comments;
