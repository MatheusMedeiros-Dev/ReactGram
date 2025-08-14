import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { getPhotoById, like, photoComment } from "../slices/photoSlice";
import LikeButton from "../components/LikeButton";
import { useResetMessage } from "../hooks/useResetMessage";
import PhotoComponent from "../components/PhotoComponent";
import CommentComponent from "../components/CommentComponent";

const PhotoViewer = () => {
  const { photoId } = useParams();
  const dispatch = useAppDispatch();
  const { photo } = useAppSelector((state) => state.photo);
  const { resetMessage } = useResetMessage("photo");
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    if (photoId) {
      dispatch(like(photoId));
      resetMessage();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!photo) return;
    const commentData = {
      comment: commentText,
      _id: photo._id,
    };

    dispatch(photoComment(commentData));
    resetMessage();
    setCommentText("");
  };

  useEffect(() => {
    if (photoId) {
      dispatch(getPhotoById(photoId));
    }
  }, [dispatch, photoId]);
  return (
    <div className="bg-black text-white rounded-b-xl h-fit">
      <div className="mx-10 my-4">
        <PhotoComponent photo={photo} alt={photo?.title} />
        <div className="flex justify-center font-bold text-2xl">
          <h2>{photo?.title}</h2>
        </div>
        <div className="my-2">
          Publicada por:{" "}
          <Link className="font-bold" to={`/users/${photo?.userId}`}>
            {photo?.userName}
          </Link>
        </div>

        <hr className="text-gray-400" />

        <LikeButton photo={photo} handleLike={() => handleLike()} />

        <hr className="text-gray-400" />

        <CommentComponent
          photo={photo}
          handleSubmit={handleSubmit}
          onChange={(e) => setCommentText(e.target.value)}
          inputValue={commentText}
        />
      </div>
    </div>
  );
};

export default PhotoViewer;
