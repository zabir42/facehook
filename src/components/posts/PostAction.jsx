import React, { useState } from "react";
import CommentIcon from "../../assets/icons/comment.svg";
import LikeFieldIcon from "../../assets/icons/like-filled.svg";
import LikeIcon from "../../assets/icons/like.svg";
import ShareIcon from "../../assets/icons/share.svg";
import { useAuth, useAxios } from "../../hooks";

const PostAction = ({ commentCount, post }) => {
  const { auth } = useAuth()
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));

  const { api } = useAxios()

  const handleLike = async () => {
    try {
      const response = await api.patch(`/posts/${post.id}/like`);
      if (response.status === 200) {
        setLiked(!liked);
      }
    } catch (error) {
      console.error(error);
      setLiked(false);
    }
  };
  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      {/* <!-- Like Button --> */}
      <button
        onClick={handleLike}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img
          className="w-6"
          src={liked ? LikeFieldIcon : LikeIcon}
          alt="Like"
        />
        <span>Like</span>
      </button>

      {/* <!-- Comment Button --> */}
      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={CommentIcon} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>
      {/* <!-- Share Button --> */}

      {/* <!-- Like Button --> */}
      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={ShareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostAction;
