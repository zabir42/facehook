import TimeIcon from "../../assets/icons/time.svg";

import { useAvatar } from "../../hooks/useAvatar";
import { getDateDifferenceFromNow } from "../../utils";
import ThreeDotComponent from "./ThreeDotComponent";

const PostHeader = ({ post }) => {
  const { avatarURL } = useAvatar(post);


  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full overflow-hidden">
          <img
            className="w-full h-full rounded-full"
            src={avatarURL}
            alt="avatar"
          />
        </div>
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">{`${getDateDifferenceFromNow(
              post?.createAt
            )} ago`}</span>
            <span className="text-sm text-gray-400 lg:text-base"></span>
          </div>
        </div>
      </div>

      <ThreeDotComponent post={post} />
    </header>
  );
};

export default PostHeader;
