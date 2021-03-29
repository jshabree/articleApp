import * as Types from "./types";

export const createArticleDetailsSubmit = (articleDetails) => {
  return {
    type: Types.CREATE_ARTICLE,
    articleDetails,
  };
};

export const postNewComment = (_id, comment) => {
  return {
    type: Types.POST_COMMENT_ARTICLE,
    _id,
    comment,
  };
};
export const editComment = (comment_id, comment) => {
  return {
    type: Types.EDIT_COMMENT_ARTICLE,
    comment_id,
    comment,
  };
};
export const deleteComment = (comment_id) => {
  return {
    type: Types.DELETE_COMMENT_ARTICLE,
    comment_id,
  };
};

export const listArticleDetails = (_id) => {
  return {
    type: Types.GET_ARTICLE_DETAILS,
    _id,
  };
};

export const listArticleComments = (_id) => {
  return {
    type: Types.GET_ARTICLE_COMMENTS,
    _id,
  };
};

export const listArticleLikes = (_id) => {
  return {
    type: Types.GET_ARTICLE_LIKES,
    _id,
  };
};

export const deleteArticle = (_id) => {
  console.log("Delete Id " + _id);
  return {
    type: Types.DELETE_ARTICLE,
    _id,
  };
};

export const deleteArticleSuccess = (_id) => {
  return {
    type: Types.DELETE_ARTICLE_SUCCESS,
    _id,
  };
};



export const postLikeArticle = (article_id, user_id) => {
  return {
    type: Types.LIKE_ARTICLE,
    article_id,
    user_id,
  };
};
export const deleteLikeArticle = (like_id) => {
  return {
    type: Types.DELETE_LIKE_ARTICLE,
    like_id,
  };
};
export const editArticle = (_id, articleDetails) => {
  return {
    type: Types.UPDATE_ARTICLE_DETAILS,
    _id,
    articleDetails,
  };
};
