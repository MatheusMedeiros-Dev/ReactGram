type InputFieldProps = {
  label?: string;
  type: "text" | "email" | "password" | "file";
  placeholder?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  imageName?: string;
};

const InputField = ({
  label,
  type = "text",
  placeholder,
  onChange,
  value,
  autoComplete,
  disabled,
  imageName,
}: InputFieldProps) => {
  const finalClass = disabled
    ? "block w-full h-8 px-5  cursor-not-allowed py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
    : "block w-full h-8 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none";
  return (
    <>
      {type === "file" ? (
        <>
          <label>
            <p className="flex items-center mb-2 text-gray-600 text-sm font-medium">
              {label}
            </p>
            <div className="mb-5 w-full h-8 rounded-3xl bg-amber-50 items-center inline-flex">
              <div
                className="flex w-28 h-8 px-2 flex-col bg-indigo-600 rounded-l-3xl shadow text-white text-xs font-semibold leading-4 
                                       items-center justify-center cursor-pointer focus:outline-none"
              >
                Choose File{" "}
              </div>
              <h2 className="text-gray-900 text-sm font-normal indent-2 leading-snug pr-4">
                {imageName || "No file chosen"}
              </h2>
              <input type={type} hidden onChange={onChange} />
            </div>
          </label>
        </>
      ) : (
        <div className="mb-4">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            {label}
          </label>
          <input
            type={type}
            className={finalClass}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onChange}
            value={value}
            disabled={disabled === true}
          />
        </div>
      )}
    </>
  );
};

export default InputField;
