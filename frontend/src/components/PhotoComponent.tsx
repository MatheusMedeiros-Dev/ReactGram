import type { Photo } from "../types/photo";
import { uploads } from "../utils/config";

interface PhotoComponentProps {
  photo: Photo | null;
  alt: string | undefined;
}

const PhotoComponent = ({ photo, alt }: PhotoComponentProps) => {
  return (
    <div className="flex justify-center m-1">
      <img
        className="h-[400px] w-[700px]"
        src={`${uploads}/photos/${photo?.image}`}
        alt={alt}
      ></img>
    </div>
  );
};

export default PhotoComponent;
