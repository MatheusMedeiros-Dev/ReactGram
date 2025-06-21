const ErrorMessage = ({ msg }: { msg: string }) => {
  return (
    <div className="bg-amber-500 rounded-sm indent-1 text-red-600 font-semibold">
      <p>{msg}</p>
    </div>
  );
};

export default ErrorMessage;
