interface FormLayoutProps {
  title?: string;
  subTitle?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}
const FormLayout = ({
  title,
  subTitle,
  onSubmit,
  children,
}: FormLayoutProps) => {
  return (
    <div className="bg-black rounded-b-xl text-white mb-auto">
      {title && (
        <h1 className="text-center text-[26px] my-6 font-bold">{title}</h1>
      )}

      <div className="w-auto my-0 h-fit">
        {subTitle && (
          <h2 className="font-semibold text-center mb-4">{subTitle}</h2>
        )}

        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
};

export default FormLayout;
