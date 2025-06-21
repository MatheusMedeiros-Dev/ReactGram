type AppButtonProps = {
  label: string;
  buttonType?: "loading" | "default";
  type?: "submit" | "button";
};

const AppButton = ({
  label,
  buttonType = "default",
  type = "submit",
}: AppButtonProps) => {
  const buttonTypeClass: Record<string, string> = {
    default:
      "bg-blue-500 mt-2 text-[20px] rounded-sm font-bold p-1 cursor-pointer",
    loading: "bg-blue-400 mt-2 text-[20px] rounded-sm font-bold p-1",
  };

  const finalClass = buttonTypeClass[buttonType];
  return (
    <>
      <button
        className={finalClass}
        type={type}
        disabled={buttonType === "loading"}
      >
        {label}
      </button>
    </>
  );
};

export default AppButton;
