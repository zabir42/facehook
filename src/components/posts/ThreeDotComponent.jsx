import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { actions } from "../../actions/actions";
import ThreeDot from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth, useAxios } from "../../hooks";
import { usePost } from "../../hooks/usePost";
import PostEntryModal from "../posts/PostEntry.jsx";

const ThreeDotComponent = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postEntry, setPostEnty] = useState(false)

  const { auth } = useAuth();
  const { api } = useAxios();
  const isMe = post?.author?.id === auth?.user?.id;
  const { dispatch } = usePost();
  const navigate = useNavigate();

  const handleDeletePost = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete this post?");

    if (!confirmed) {
      setShowModal(false);
      return;
    }

    setLoading(true);

    try {
      const response = await api.delete(`/posts/${post.id}`);
      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: post.id,
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };



  return (
    <div className="relative">
      {isMe && (
        <>
          <button onClick={() => setShowModal(!showModal)}>
            <img src={ThreeDot} alt="3dots of Action" />
          </button>
          {postEntry && (
            <PostEntryModal
              post={post}
            />
          )}
        </>
      )}

      {showModal && (
        <div className="action-modal-container">
          <button className="action-menu-item hover:text-lwsGreen" onClick={() => setPostEnty(true)}>
            <img src={EditIcon} alt="Edit" />
            Edit
          </button>
          <button className="action-menu-item hover:text-red-500" onClick={handleDeletePost}>
            <img src={DeleteIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ThreeDotComponent;
