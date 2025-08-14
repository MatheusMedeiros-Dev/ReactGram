import { useQuery } from "../hooks/useQuery";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { useEffect } from "react";
import { getAllPhotos, like, searchPhotos } from "../slices/photoSlice";
import PhotoList from "../components/PhotoList";
import type { Photo } from "../types/photo";
import { useResetMessage } from "../hooks/useResetMessage";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.auth);
  const { photos } = useAppSelector((state) => state.photo);
  const { resetMessage } = useResetMessage("photo");

  const handleLike = (photo: Photo) => {
    dispatch(like(photo._id));
    resetMessage();
  };

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);
  useEffect(() => {
    if (search) dispatch(searchPhotos(search));
  }, [dispatch, search]);
  return (
    <>
      {photos && authUser && (
        <PhotoList
          photos={photos}
          authUser={authUser}
          handleLike={handleLike}
        />
      )}
    </>
  );
};

export default Search;
