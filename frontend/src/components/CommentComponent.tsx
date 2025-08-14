import { type ChangeEvent, type FormEvent } from "react";
import { uploads } from "../utils/config";
import { Link } from "react-router-dom";
import type { Photo } from "../types/photo";
import FormLayout from "../layouts/FormLayout";
import InputField from "./InputField";
import AppButton from "./AppButton";

interface CommentComponentProps {
  photo: Photo | null;
  handleSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent) => void;
  inputValue: string | undefined;
}

const CommentComponent = ({
  photo,
  handleSubmit,
  onChange,
  inputValue,
}: CommentComponentProps) => {
  const onSubmit = (e: FormEvent) => {
    handleSubmit(e);
  };

  return (
    <div>
      <h3>Comentários: ({photo?.comments.length})</h3>
      <FormLayout onSubmit={onSubmit}>
        <InputField
          type="text"
          placeholder="Inseria o seu comentário..."
          onChange={onChange}
          value={inputValue}
        />
        <AppButton label="Enviar" />
      </FormLayout>

      <hr className="mb-3 text-gray-400" />

      {photo?.comments.length === 0 ? (
        <>
          <p className="mt-2 font-semibold">Não há comentários.</p>
        </>
      ) : (
        photo?.comments.map((commentx) => (
          <div key={commentx.comment}>
            <div className="flex">
              {commentx.userImage && (
                <img
                  className="rounded-[50%] w-20"
                  src={`${uploads}/users/${commentx.userImage}`}
                  alt={commentx.userName}
                />
              )}
              <div className="ml-3 font-bold text-2xl">
                <Link to={`/users/${commentx.userId}`}>
                  <p>{commentx.userName}</p>
                </Link>
              </div>
            </div>
            <p className="ml-1 mb-1 font-semibold">{commentx.comment}</p>
            <hr className="mb-3 text-gray-400" />
          </div>
        ))
      )}
    </div>
  );
};

export default CommentComponent;
