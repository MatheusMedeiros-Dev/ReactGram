import { useEffect } from "react";
import { useResetMessage } from "../hooks/useResetMessage";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { getAllPhotos, like } from "../slices/photoSlice";
import type { Photo } from "../types/photo";
import PhotoList from "../components/PhotoList";

const Home = () => {
  const dispatch = useAppDispatch();

  const { resetMessage } = useResetMessage("photo");

  const { user: authUser } = useAppSelector((state) => state.auth);
  const { photos } = useAppSelector((state) => state.photo);

  const handleLike = (photo: Photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  return (
    <>
      {photos && authUser && (
        <PhotoList
          photos={photos}
          authUser={authUser}
          handleLike={handleLike}
          homePage={true}
        />
      )}
    </>
  );
};

export default Home;
