interface AlertProps {
  error: string | null;
  typeMessage: "error" | "message" | null;
}
const Alert = ({ error, typeMessage }: AlertProps) => {
  const messageClass: Record<string, string> = {
    message:
      "bg-blue-600 mb-2 p-2 w-full rounded-sm indent-1 text-white text-center font-semibold",
    error:
      "bg-amber-400 mb-2 p-2 w-full rounded-sm text-red-600 text-center font-bold",
  };
  const finalClass = messageClass[typeMessage!];
  return (
    <div className="flex fixed w-auto top-16 right-4 z-50 gap-4" role="alert">
      <div className={finalClass}>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Alert;
