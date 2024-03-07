import React, { useEffect } from "react";
import { actions } from "../actions/actions";
import CreatePost from "../components/common/CreatePost";
import PostList from "../components/posts/PostList";
import { useAxios } from "../hooks/useAxios";
import { usePost } from "../hooks/usePost";

const HomePage = () => {
  const { state, dispatch } = usePost()

  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get("/posts");
        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };

    fetchPost();
  }, [api, dispatch]);

  if (state?.loading) {
    return <p>loading...</p>;
  }

  if (state?.error) {
    return <p>Error occurred: {state.error.message}</p>;
  }

  return (
    <>
      <CreatePost />
      <PostList posts={state?.posts || []} />

    </>
  );
};

export default HomePage;
