import {
  ARTICLE_LIST,
  ARTICLE_LIST_SUCCESS_RESPONSE,
  ARTICLE_LIST_ERROR_RESPONSE,
} from "../actions/types";

const initialUserObj = {
  articles: [],
};

const getArticleListError = (state) => {
  let newState = { ...state };
  return { ...newState };
};

const getArticleList = (state, action) => {
  //console.log("REdux" + JSON.stringify(action));
  let newState = { ...state };
  if (action.result !== undefined) {
    newState = Object.assign({}, state, {
      articles: JSON.parse(JSON.stringify(action.result)),
    });
  }
  return { ...newState };
};

export default (state = initialUserObj, action = {}) => {
  switch (action.type) {
    case ARTICLE_LIST:
      return { ...state };
    case ARTICLE_LIST_SUCCESS_RESPONSE:
      return getArticleList(state, action);
    case ARTICLE_LIST_ERROR_RESPONSE:
      return getArticleListError(state);

    default:
      return state;
  }
};
