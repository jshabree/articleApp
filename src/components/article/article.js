import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Article = (props) => {
  var date = new Date(props.article.createdAt);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/article/" + props.article._id}>
            {props.article.title}
          </Link>
        </h5>
        <p className="card-text">{props.article.body}</p>
        <br />
        <b>Author - </b>{" "}
        <Link to={"/user/" + props.article.user._id}>
          {props.article.user.name}
        </Link>
        <br />
        <b>{formatDistanceToNow(date)} ago</b>
        <br />
      </div>
    </div>
  );
};

export default Article;
