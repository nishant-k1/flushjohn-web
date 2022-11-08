import styles from "../styles/Layout.module.css";
import { SidebarContext } from "../contexts/SidebarContext";
import { useContext } from "react";
import ModalBackground from "./ModalBackground";

const Layout = ({ children }) => {
  const { active, setActive } = useContext(SidebarContext);
  const handleClick = () => (active ? setActive(false) : null);
  return (
    <div
      onClick={handleClick}
      className={`${styles.main} ${active ? styles.active : styles.inactive}`}
    >
      {active && <ModalBackground />}
      {children}
    </div>
  );
};

export default Layout;
