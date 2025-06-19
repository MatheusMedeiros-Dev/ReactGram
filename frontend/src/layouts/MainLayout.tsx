import Footer from "./Footer";
import Navbar from "./Navbar";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-screen max-w-full">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-neutral-900">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
