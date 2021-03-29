import {
  takeEvery,
  call,
  put,
  select,
  take,
  fork,
  all,
  takeLatest,
} from "redux-saga/effects";
import * as Types from "../actions/types";
import {
  GetDataFromServerToPatch,
  GetDataFromServer,
  deleteService,
} from "../service";
import { message } from "antd";

const baseUrl = "https://mern-article.herokuapp.com";
//const baseUrl = "http://localhost:5000";

function* fetchLoginUser(action) {
  try {
    let formBody = {};
    formBody.email = action.email;
    formBody.password = action.password;

    const loginUrl = baseUrl + "/auth";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: "LOGIN_USER_SERVER_RESPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.LOGIN_USER_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* listArticles(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/articles";
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.ARTICLE_LIST_ERROR_RESPONSE,
        result,
      });
    } else {
      yield put({
        type: Types.ARTICLE_LIST_SUCCESS_RESPONSE,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getUser(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/user/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_USER_ERROR_RESPONSE,
        result,
      });
    } else {
      yield put({
        type: Types.GET_USER_SUCCESS_RESPONSE,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getBookmarks(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/user/bookmarks/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_BOOKMARKS_ERROR_RESPONSE,
        result,
      });
    } else {
      yield put({
        type: Types.GET_BOOKMARKS_SUCCESS_RESPONSE,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getArticleDetails(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/articles/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR,
        result,
      });
    } else {
      yield put({
        type: Types.GET_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getArticleComments(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/comments/get/article/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_ARTICLE_COMMENTS_SERVER_RESPONSE_ERROR,
        result,
      });
    } else {
      yield put({
        type: Types.GET_ARTICLE_COMMENTS_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getArticleLikes(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/like/article/all_users/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_ARTICLE_LIKES_SERVER_RESPONSE_ERROR,
        result,
      });
    } else {
      yield put({
        type: Types.GET_ARTICLE_LIKES_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* saveArticleDetails(action) {
  try {
    let formBody = {};
    formBody = action.articleDetails;
    const reqMethod = "POST";
    const loginUrl = baseUrl + "/articles/add";
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.CREATE_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* updateArticleDetails(action) {
  try {
    let formBody = {};
    formBody = action.articleDetails;
    const reqMethod = "POST";
    const loginUrl = baseUrl + "/articles/update/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "POST", formBody);
    const result = yield response.json();

    if (result.error) {
      yield put({
        type: Types.UPDATE_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UPDATE_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* deleteArticleDetails(action) {
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action._id;
    //const deleteApi = "http://localhost:5066/delete-project";
    const deleteApi = baseUrl + "/articles/" + action._id;
    const newData = yield call(deleteService, formBody, deleteApi); // Refer sample to api calls in remote.js file
    yield put({
      type: Types.DELETE_ARTICLE_SUCCESS,
      newData,
    }); // pass in the id you updated and the newData returned from the API
    /// Other things can go here depending on what you want
  } catch (e) {
    console.log("SAGA ERROR");
  }
}

function* postComment(action) {
  try {
    let formBody = {};
    formBody = action.comment;

    const postUrl = baseUrl + "/comments/post/" + action._id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.POST_COMMENT_ARTICLE_DETAILS_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.POST_COMMENT_ARTICLE_DETAILS_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* editComment(action) {
  try {
    let formBody = {};
    formBody = action.comment;
    const postUrl = baseUrl + "/comments/edit/" + action.comment_id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();

    if (result.error) {
      yield put({
        type: Types.EDIT_COMMENT_ARTICLE_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.EDIT_COMMENT_ARTICLE_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* editProfile(action) {
  try {
    let formBody = {};
    formBody = action.userProfile;
    const postUrl = baseUrl + "/user/" + action.user_id;
    const response = yield call(
      GetDataFromServerToPatch,
      postUrl,
      "PATCH",
      formBody
    );
    const result = yield response.json();

    if (result.error) {
      yield put({
        type: Types.USER_PROFILE_EDIT_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.USER_PROFILE_EDIT_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    message: error;
  }
}

function* deleteComment(action) {
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    // formBody._id = action._id;
    const deleteApi = baseUrl + "/comments/delete/" + action.comment_id;
    const response = yield call(deleteService, formBody, deleteApi); // Refer sample to api calls in remote.js file
    /// Other things can go here depending on what you want
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.DELETE_COMMENT_ARTICLE_SERVER_RESPONSE_ERROR,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.DELETE_COMMENT_ARTICLE_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (e) {
    console.log("SAGA ERROR");
  }
}

function* postBookmark(action) {
  try {
    let formBody = {};
    formBody.articleId = action.article_id;
    const _id = action.article_id;
    const postUrl = baseUrl + "/user/bookmark/" + action.user_id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.BOOKMARK_ARTICLE_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.BOOKMARK_ARTICLE_SUCCESS_RESPONSE,
        result,
        _id,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* deleteBookmark(action) {
  try {
    let formBody = {};
    formBody.articleId = action.article_id;
    const _id = action.article_id;

    const postUrl = baseUrl + "/user/bookmark/" + action.user_id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.UN_BOOKMARK_ARTICLE_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UN_BOOKMARK_ARTICLE_SUCCESS_RESPONSE,
        result,
        _id,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* postLike(action) {
  try {
    let formBody = {};
    formBody.user = action.user_id;

    const postUrl = baseUrl + "/like/post/article/" + action.article_id;
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.LIKE_ARTICLE_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.LIKE_ARTICLE_SUCCESS_RESPONSE,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log("SAGA ERROR", error);
  }
}

function* deleteArticleLike(action) {
  try {
    // Ensure that your API returns the data of the updated todo
    let formBody = {};
    formBody._id = action.like_id;
    const _id = action.like_id;
    const deleteApi = baseUrl + "/like/" + action.like_id;
    const response = yield call(deleteService, formBody, deleteApi); // Refer sample to api calls in remote.js file
    /// Other things can go here depending on what you want
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.DELETE_LIKE_ARTICLE_ERROR_RESPONSE,
        result,
      }); // pass in the id you updated and the newData returned from the API
    } else {
      yield put({
        type: Types.DELETE_LIKE_ARTICLE_SUCCESS_RESPONSE,
        result,
        _id,
      }); // pass in the id you updated and the newData returned from the API
    }
  } catch (e) {
    console.log("SAGA ERROR", e);
  }
}

function* getFollowers(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/user/followers/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_FOLLOWERS_ERROR_RESPONSE,
        result,
      });
    } else {
      yield put({
        type: Types.GET_FOLLOWERS_SUCCESS_RESPONSE,
        result,
      });
    }
  } catch (error) {
    console.log("SAGA ERROR", error);
  }
}

function* getFollowing(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/user/following/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_FOLLOWING_ERROR_RESPONSE,
        result,
      });
    } else {
      yield put({
        type: Types.GET_FOLLOWING_SUCCESS_RESPONSE,
        result,
      });
    }
  } catch (error) {
    console.log("SAGA ERROR", error);
  }
}

function* getUserArticles(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/user/articlesWritten/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_USER_WRITTEN_ARTICLES_SERVER_RESPONSE_ERROR,
        result,
      });
    } else {
      yield put({
        type: Types.GET_USER_WRITTEN_ARTICLES_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    console.log("SAGA ERROR", error);
  }
}

function* followUser(action) {
  try {
    let formBody = {};
    formBody.user = action.follow_id;
    const _id = action.user_id;
    const postUrl = baseUrl + "/user/" + action.user_id + "/follow";
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.FOLLOW_USER_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.FOLLOW_USER_SUCCESS_RESPONSE,
        result,
        _id,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log("SAGA ERROR", error);
  }
}

function* unFollowUser(action) {
  try {
    let formBody = {};
    formBody.user = action.unfollow_id;
    const _id = action.user_id;
    const postUrl = baseUrl + "/user/" + action.user_id + "/follow";
    const response = yield call(GetDataFromServer, postUrl, "POST", formBody);
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.UN_FOLLOW_USER_ERROR_RESPONSE,
        error: result.error,
      });
    } else {
      yield put({
        type: Types.UN_FOLLOW_USER_SUCCESS_RESPONSE,
        result,
        _id,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* signUpUser(action) {
  try {
    let formBody = {};
    formBody.user = action.user;
    const signUpUrl = baseUrl + "/signup";
    const response = yield call(
      GetDataFromServer,
      signUpUrl,
      "POST",
      formBody.user
    );
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: "SIGNUP_USER_SERVER_RESPONSE_ERROR",
        error: result.error,
      });
    } else {
      yield put({
        type: Types.SIGNUP_USER_SERVER_RESPONSE_SUCCESS,
        result,
      });
    }
  } catch (error) {
    // yield put({ type: Types.SERVER_CALL_FAILED, error: error.message });
    console.log(error);
  }
}

function* getArticlesLiked(action) {
  try {
    const reqMethod = "GET";
    const loginUrl = baseUrl + "/like/user/all_articles/" + action._id;
    const response = yield call(GetDataFromServer, loginUrl, "", "");
    const result = yield response.json();
    if (result.error) {
      yield put({
        type: Types.GET_ARTICLES_LIKED_ERROR_RESPONSE,
        result,
      });
    } else {
      yield put({
        type: Types.GET_ARTICLES_LIKED_SUCCESS_RESPONSE,
        result,
      });
    }
  } catch (error) {
    console.log("SAGA ERROR", error);
  }
}

export default function* rootSaga(params) {
  yield takeLatest(Types.LOGIN_USER, fetchLoginUser);
  yield takeEvery(Types.ARTICLE_LIST, listArticles);
  yield takeEvery(Types.CREATE_ARTICLE, saveArticleDetails);
  yield takeEvery(Types.UPDATE_ARTICLE_DETAILS, updateArticleDetails);
  yield takeEvery(Types.DELETE_ARTICLE, deleteArticleDetails);
  yield takeEvery(Types.SIGNUP_USER, signUpUser);
  yield takeEvery(Types.GET_USER, getUser);
  yield takeEvery(Types.GET_ARTICLE_DETAILS, getArticleDetails);
  yield takeEvery(Types.POST_COMMENT_ARTICLE, postComment);
  yield takeEvery(Types.EDIT_COMMENT_ARTICLE, editComment);
  yield takeEvery(Types.DELETE_COMMENT_ARTICLE, deleteComment);
  yield takeEvery(Types.BOOKMARK_ARTICLE, postBookmark);
  yield takeEvery(Types.UN_BOOKMARK_ARTICLE, deleteBookmark);
  yield takeEvery(Types.LIKE_ARTICLE, postLike);
  yield takeEvery(Types.FOLLOW_USER, followUser);
  yield takeEvery(Types.UN_FOLLOW_USER, unFollowUser);
  yield takeEvery(Types.GET_BOOKMARKS, getBookmarks);
  yield takeEvery(Types.GET_FOLLOWERS, getFollowers);
  yield takeEvery(Types.GET_FOLLOWERS, getFollowers);
  yield takeEvery(Types.GET_FOLLOWING, getFollowing);
  yield takeEvery(Types.GET_USER_WRITTEN_ARTICLES, getUserArticles);
  yield takeEvery(Types.GET_ARTICLE_COMMENTS, getArticleComments);
  yield takeEvery(Types.GET_ARTICLE_LIKES, getArticleLikes);
  yield takeEvery(Types.DELETE_LIKE_ARTICLE, deleteArticleLike);
  yield takeEvery(Types.GET_ARTICLES_LIKED, getArticlesLiked);
  yield takeEvery(Types.USER_PROFILE_EDIT, editProfile);
  console.log("ROOT SAGA");
}
