import React from "react";
import Article from "./article";

const ArticlesList = (props) => {
  if (props.articles !== undefined) {
    return props.articles.map((currentArticle) => {
      return (
        <div key={currentArticle._id}>
          <Article article={currentArticle} />
          <br />
        </div>
      );
    });
  } else return null;

  // return null;
};

export default ArticlesList;
