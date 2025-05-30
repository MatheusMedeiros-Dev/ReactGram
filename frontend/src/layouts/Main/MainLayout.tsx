import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import styles from "./MainLayout.module.css";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <aside className={styles.leftSidebar}></aside>
      <div className={styles.content}>{children}</div>
      <aside className={styles.rightSidebar}></aside>
      <Footer />
    </div>
  );
};

export default MainLayout;
