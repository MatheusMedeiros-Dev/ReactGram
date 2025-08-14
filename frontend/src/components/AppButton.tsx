interface AppButtonProps {
  label: string | React.ReactElement;
  buttonTypeStyle?: "loading" | "default" | "cancel" | "cancelLoading" | "more";
  type?: "submit" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AppButton = ({
  label,
  buttonTypeStyle = "default",
  type = "submit",
  onClick,
}: AppButtonProps) => {
  const buttonTypeClass: Record<string, string> = {
    default:
      "w-52 h-12 mb-6 cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6",
    loading:
      "w-52 h-12 mb-6 cursor-wait bg-indigo-800 rounded-full shadow-xs text-white text-base font-semibold leading-6",
    cancel:
      "w-52 h-12 mb-6 cursor-pointer bg-red-600 hover:bg-red-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6",
    cancelLoading:
      "w-52 h-12 mb-6 cursor-wait bg-red-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6",
    more: "w-52 h-12 my-3 cursor-pointer bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6",
  };

  const finalClass = buttonTypeClass[buttonTypeStyle];
  const isLoading =
    buttonTypeStyle === "loading" || buttonTypeStyle === "cancelLoading";
  return (
    <div className="flex justify-center mb-0">
      <button
        className={finalClass}
        type={type}
        disabled={isLoading}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default AppButton;
