import { BsHeart, BsHeartFill } from "react-icons/bs";
import type { Photo } from "../types/photo";

interface LikeButtonProps {
  photo: Photo | null;
  handleLike: () => void;
}

const LikeButton = ({ photo, handleLike }: LikeButtonProps) => {
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson!);
  const userId = user._id;
  const hasAlreadyLiked = photo?.likes.some((like) => like.userId === userId);
  return (
    <div className="flex items-center gap-2 font-semibold my-2">
      <div className="flex-col">
        <div className="inline-flex items-center gap-1">
          {hasAlreadyLiked ? (
            <BsHeartFill onClick={handleLike} />
          ) : (
            <BsHeart className="cursor-pointer" onClick={handleLike} />
          )}

          <p className="ml-2 mb-1 text-white text-[18px]">
            {`${photo?.likes.length} like(s)`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LikeButton;
