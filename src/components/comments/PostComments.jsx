import { useState } from "react";
import { useAuth, useAxios, useProfile } from "../../hooks";
import PostCommentList from "./PostCommentList";

const PostComments = ({ post }) => {
  const { auth } = useAuth()
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios()
  const { state } = useProfile()

  const user = state?.user || auth?.user;

  const addComent = async (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      try {
        const response = await api.patch(`/posts/${post.id}/comment`, {
          comment,
        });
        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <div className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full overflow-hidden">
          <img
            className="w-full h-full rounded-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar
              }`}
            alt="avatar"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComent(e)}
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => setShowComment(!showComment)}
        >
          All Comment ▾
        </button>
      </div>

      <PostCommentList comments={comments} showComment={showComment} />
    </div>
  );
};

export default PostComments;
