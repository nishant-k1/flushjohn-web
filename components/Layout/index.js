import styles from "./styles.module.css";
import { SidebarContext } from "../../contexts/SidebarContext";
import { useContext } from "react";
import ModalOverlay from "../ModalOverlay";

const Layout = ({ children }) => {
  const { active, setActive } = useContext(SidebarContext);
  const handleClick = () => (active ? setActive(false) : null);
  return (
    <div
      onClick={handleClick}
      className={`${styles.main} ${active ? styles.active : styles.inactive}`}
    >
      {active && <ModalOverlay />}
      {children}
    </div>
  );
};

export default Layout;
