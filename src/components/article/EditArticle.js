import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editArticle } from "../../redux/actions/articlesActions";

const EditArticle = ({ history }) => {
  const { _id, title, body } = useSelector(
    (state) => state.articlesReducer.article
  );
  const [newTitle, setTitle] = useState(title);
  const [newBody, setBody] = useState(body);
  const dispatch = useDispatch();
  console.log(_id, title, body);

  const onSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      title: newTitle,
      body: newBody,
    };
    dispatch(editArticle(_id, newArticle));
    history.push("/article/" + _id);
  };

  return (
    <div className="container">
      <h3>Edit Article</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            required
            className="form-control"
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Body: </label>
          <input
            type="text"
            required
            className="form-control"
            value={newBody}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Article"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
export default EditArticle;
