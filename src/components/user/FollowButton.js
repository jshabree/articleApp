import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { followUser, unFollowUser } from "../../redux/actions/get-user";

const FollowButton = () => {
  const dispatch = useDispatch();
  // const followers = useSelector(
  //   (state) => state.userReducer.followers,
  //   shallowEqual
  // );
  // Logged In user id
  const { id } = useSelector((state) => state.authReducer.user);
  // Follow User Id
  const { _id, followers } = useSelector(
    (state) => state.userReducer.user,
    shallowEqual
  );
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const [isFollowed, setFollowed] = useState(false);

  useEffect(() => {
    console.log(_id, followers);
    let result = false;
    if (_id || followers) {
      result = followers.find((user) => user === id);
    }
    if (result) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [followers, _id]);

  const handleFollow = (e) => {
    if (!isFollowed) {
      dispatch(followUser(id, _id));
    } else {
      dispatch(unFollowUser(id, _id));
      setFollowed(false);
    }
  };

  return (
    <>
      <button
        type="button"
        style={
          isFollowed
            ? {
                backgroundColor: "#007bff",
              }
            : {
                backgroundColor: "#fff",
                color: "#007bff",
              }
        }
        className="btn btn-primary"
        onClick={handleFollow}
        disabled={!loggedIn}
      >
        Follow{" "}
      </button>{" "}
    </>
  );
};
export default FollowButton;
