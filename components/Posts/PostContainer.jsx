import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { disapearRequest, loadingActions } from "../../store/loading-slice";
import Post from "./Post";

function PostContainer() {
  const [posts, setPosts] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.loadingStatus({ status: "pending" }));
    fetch("api/user/getPosts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      });
    dispatch(disapearRequest({ status: "success", message: "pobrano dane" }));
  }, []);
  return (
    <>
      {posts?.map((item) => {
        const { _id, title, text } = item;
        return <Post key={_id} title={title} text={text} />;
      })}
    </>
  );
}

export default PostContainer;
