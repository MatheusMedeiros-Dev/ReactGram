import { IoEyeSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import type { Photo } from "../types/photo";
import { uploads } from "../utils/config";
import type { AuthUser } from "../types/auth";

interface PostedPhotosProps {
  photos?: Photo[];
  userIdParams?: string;
  authUser?: AuthUser | null;
  handleDelete: (photoId: string) => void;
}
const PostedPhotos = ({
  photos,
  userIdParams,
  authUser,
  handleDelete,
}: PostedPhotosProps) => {
  const authUserString = authUser?._id.toString();
  return (
    <>
      <div className="ml-4 mb-3">
        <h2 className="block font-bold text-2xl">Fotos publicadas:</h2>
        {photos?.length === 0 && userIdParams === authUserString && (
          <p className="text-gray-400 font-semibold">
            Você ainda não compartilhou nenhum momento, compartilhe um acima.
          </p>
        )}

        {photos?.length === 0 && userIdParams !== authUserString && (
          <p className="text-gray-400 font-semibold">
            Essa pessoa ainda não compartilhou nenhum momento.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {photos &&
          photos.map((photo) => (
            <div className="w-[250px] m-1" key={photo._id}>
              {photo.image && (
                <img
                  className="w-[240px] h-[200px]"
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
                />
              )}
              {userIdParams === authUser?._id ? (
                <div className="flex m-2 justify-evenly">
                  <Link to={`/photos/${photo._id}`}>
                    <IoEyeSharp className="cursor-pointer" />
                  </Link>
                  <Link to={`/photo/edit/${photo._id}`}>
                    <FaPen className="cursor-pointer" />
                  </Link>

                  <BsXLg
                    className="cursor-pointer"
                    onClick={() => handleDelete(photo._id)}
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <Link to={`/photos/${photo._id}`}>
                    <p className="flex items-center justify-center my-3 w-30 h-12 cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">
                      Ver
                    </p>
                  </Link>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default PostedPhotos;
