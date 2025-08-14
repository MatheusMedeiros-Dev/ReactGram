import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import LikeButton from "./LikeButton";
import type { Photo } from "../types/photo";
import type { AuthUser } from "../types/auth";

interface PhotoListProps {
  photos: Photo[];
  authUser: AuthUser;
  handleLike: (photo: Photo) => void;
  homePage?: boolean;
}

const PhotoList = ({
  photos,
  authUser,
  handleLike,
  homePage,
}: PhotoListProps) => {
  return (
    <div className="text-white">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <div>
              <PhotoComponent photo={photo} alt={photo.title} />
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl">{photo.title}</h2>
                <p>
                  Publicada por:{" "}
                  <Link className="font-semibold" to={`/users/${photo.userId}`}>
                    {photo.userName}
                  </Link>
                </p>
              </div>
            </div>
            <hr className="text-gray-400" />
            <LikeButton photo={photo} handleLike={() => handleLike(photo)} />
            <hr className="text-gray-400" />
            <div className="flex justify-center">
              <Link to={`photos/${photo._id}`}>
                <p className="flex items-center justify-center my-3 w-52 h-12 cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">
                  Ver Comentários
                </p>
              </Link>
            </div>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className="font-semibold">
          {homePage ? (
            <p>
              Ainda não há fotos publicadas,{" "}
              <Link
                className="text-indigo-600  hover:text-indigo-800 font-bold"
                to={`/users/${authUser?._id}`}
              >
                clique aqui para postar.
              </Link>
            </p>
          ) : (
            <p>Nenhum resultado encontrado para sua busca.</p>
          )}
        </h2>
      )}
    </div>
  );
};

export default PhotoList;
