import Alert from "../components/Alert";
import { useAppSelector } from "../hooks/useTypedRedux";
import Footer from "./Footer";
import Navbar from "./Navbar";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { error: PhotoError, message: photoMessage } = useAppSelector(
    (state) => state.photo
  );
  const { error: userError, message: userMessage } = useAppSelector(
    (state) => state.user
  );
  const { error: authError } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col h-screen w-screen max-w-full">
      <Navbar />
      {(PhotoError || photoMessage) && (
        <Alert
          error={PhotoError ? PhotoError : photoMessage}
          typeMessage={PhotoError ? "error" : "message"}
        />
      )}
      {(userError || userMessage) && (
        <Alert
          error={userError ? userError : userMessage}
          typeMessage={userError ? "error" : "message"}
        />
      )}
      {authError && <Alert error={authError} typeMessage="error" />}
      <div className="flex flex-1 pt-13 justify-center bg-neutral-900">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
