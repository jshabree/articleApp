import * as Type from "../actions/types";

const initialUserObj = {
  loading: false,
  article: {},
  comments: [],
  likes: [],
  message: "",
};

const handleArticle = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      loading: false,
      article: JSON.parse(JSON.stringify(action.result)),
    });
  }
  return {
    ...newState
  };
};
const handleCreateArticle = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, action.result);
  }
  return {
    ...newState
  };
};
const handleUpdateArticle = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      loading: false,
      message: JSON.parse(JSON.stringify(action.result)),
    });
  }
  return {
    ...newState
  };
};

const handleArticleDelete = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      loading: false,
      article: {},
      comments: [],
      likes: [],
      message: JSON.parse(JSON.stringify(action.result)),
    });
  }

  return {
    ...newState
  };
};

const handleArticleLikes = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      likes: JSON.parse(JSON.stringify(action.result)),
    });
  }
  return {
    ...newState
  };
};
const handleLike = (state, action) => {
  let newState = {
    ...state
  };

  if (action.result !== undefined) {
    let like = JSON.parse(JSON.stringify(action.result));
    like = Object.assign({}, like, {
      user: {
        _id: like.user
      },
    });
    delete like.article;

    newState = Object.assign({}, state, {
      message: "Like Added",
      likes: state.likes.concat(like),
    });
  }

  return {
    ...newState
  };
};
const handleLikeArticleDelete = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      message: JSON.parse(JSON.stringify(action.result)),
      likes: newState.likes.filter((like) => like._id !== action._id),
    });
  }
  return {
    ...newState
  };
};

const handleNewComment = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      message: JSON.parse(JSON.stringify(action.result)),
    });
  }
  return {
    ...newState
  };
};

const handleArticleComments = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      comments: JSON.parse(JSON.stringify(action.result)),
    });
  }
  return {
    ...newState
  };
};

const handleEditComment = (state, action) => {
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      comments: newState.comments.map((comment) => {
        if (comment._id !== action.result._id) {
          return comment;
        }
        return Object.assign({}, comment, {
          body: action.result.body,
        });
      }),
    });
  }
  return {
    ...newState
  };
};

const handleDeleteComment = (state, action) => {
  const result = JSON.parse(JSON.stringify(action.result));
  let newState = {
    ...state
  };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, { 
      comments: newState.comments.filter(
        (comment) => comment._id !== result._id
      ),
    });
  }
  return {
    ...newState
  };
};

export default (state = initialUserObj, action = {}) => {
  switch (action.type) {
    // create new articles
    case Type.CREATE_ARTICLE:
      return {
        ...state, articleDetails: action.articleDetails
      };

    case Type.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS:
      return handleCreateArticle(state, action);

    case Type.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };

      // fetch a particular article
    case Type.GET_ARTICLE_DETAILS:
      return {
        ...state, loading: true
      };

    case Type.GET_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS:
      return handleArticle(state, action);

    case Type.GET_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };
      // update article
    case Type.UPDATE_ARTICLE_DETAILS:
      return {
        ...state
      };

    case Type.UPDATE_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS:
      return handleUpdateArticle(state, action);

    case Type.UPDATE_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };

      // get article comments
    case Type.GET_ARTICLE_COMMENTS:
      return {
        ...state, loading: true
      };

    case Type.GET_ARTICLE_COMMENTS_SERVER_RESPONSE_SUCCESS:
      return handleArticleComments(state, action);

    case Type.GET_ARTICLE_COMMENTS_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };

      // get article likes
    case Type.GET_ARTICLE_LIKES:
      return {
        ...state, loading: true
      };

    case Type.GET_ARTICLE_LIKES_SERVER_RESPONSE_SUCCESS:
      return handleArticleLikes(state, action);

    case Type.GET_ARTICLE_LIKES_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };
      // Comment on an Article
    case Type.POST_COMMENT_ARTICLE:
      return {
        ...state, loading: true
      };

    case Type.POST_COMMENT_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS:
      return handleNewComment(state, action);

    case Type.POST_COMMENT_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };
      // EDIT a comment
    case Type.EDIT_COMMENT_ARTICLE:
      return {
        ...state, loading: true
      };

    case Type.EDIT_COMMENT_ARTICLE_SERVER_RESPONSE_SUCCESS:
      return handleEditComment(state, action);

    case Type.EDIT_COMMENT_ARTICLE_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };
      // Delete a comment
    case Type.DELETE_COMMENT_ARTICLE:
      return {
        ...state, loading: true
      };

    case Type.DELETE_COMMENT_ARTICLE_SERVER_RESPONSE_SUCCESS:
      return handleDeleteComment(state, action);

    case Type.DELETE_COMMENT_ARTICLE_SERVER_RESPONSE_ERROR:
      return {
        ...state
      };

      //  like on an Article
    case Type.LIKE_ARTICLE:
      return {
        ...state, loading: true
      };

    case Type.LIKE_ARTICLE_SUCCESS_RESPONSE:
      return handleLike(state, action);

    case Type.LIKE_ARTICLE_ERROR_RESPONSE:
      return {
        ...state
      };
      //  delete like on an Article

    case Type.DELETE_LIKE_ARTICLE_SUCCESS_RESPONSE:
      return handleLikeArticleDelete(state, action);

    case Type.DELETE_LIKE_ARTICLE_ERROR_RESPONSE:
      return {
        ...state
      };

      // case Type.UPDATE_ARTICLE_SUCCESS:
      //     return handleArticleList(state, action);

    case Type.DELETE_ARTICLE_SUCCESS:
      return handleArticleDelete(state, action);

    default:
      return {
        ...state
      };
  }
};