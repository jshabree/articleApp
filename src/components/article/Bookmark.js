import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  bookmarkArticle,
  removeBookmarkArticle,
} from "../../redux/actions/get-user";

const Bookmark = () => {
  const bookmarks = useSelector(
    (state) => state.userReducer.bookmarks,
    shallowEqual
  );
  const { _id, user } = useSelector(
    (state) => state.articlesReducer.article,
    shallowEqual
  );
  const { id } = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const [isBookmarked, setBookmark] = useState(false);

  useEffect(() => {
    const result = bookmarks.find((article) => article._id === _id);
    if (result) {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
  }, [bookmarks, _id]);

  const handleBookmark = () => {
    //_id  article id
    // id current user id
    if (!isBookmarked) {
      dispatch(bookmarkArticle(_id, id));
    } else {
      dispatch(removeBookmarkArticle(_id, id));
      setBookmark(false);
    }
  };

  return (
    <>
      <button
        style={
          isBookmarked
            ? { backgroundColor: "#007bff" }
            : { backgroundColor: "#fff", color: "#007bff" }
        }
        className="btn btn-primary"
        onClick={handleBookmark}
      >
        Bookmark
      </button>
    </>
  );
};

export default Bookmark;
