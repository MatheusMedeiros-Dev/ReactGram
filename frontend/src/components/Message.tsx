type MessageProps = {
  msg: string | null;
  typeMessage: "error" | "message";
};

const Message = ({ msg, typeMessage }: MessageProps) => {
  return typeMessage === "error" ? (
    <div className="bg-amber-500 rounded-sm indent-1 text-red-600 font-semibold">
      <p>{msg}</p>
    </div>
  ) : (
    <div className="bg-blue-600 rounded-sm indent-1 text-white font-semibold">
      <p>{msg}</p>
    </div>
  );
};

export default Message;
