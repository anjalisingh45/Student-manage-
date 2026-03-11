import styles from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UserPlus, Users } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Dark overlay on mobile */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Student Manager</span>
            <span className={styles.brandSub}>Management Portal</span>
          </div>
        </div>

        <div className={styles.navSection}>
          <span className={styles.navLabel}>NAVIGATION</span>
          <nav className={styles.nav}>
            <Link
              to="/"
              onClick={onClose}
              className={`${styles.link} ${location.pathname === "/" ? styles.active : ""}`}
            >
              <LayoutDashboard size={18} className={styles.icon} />
              Dashboard
            </Link>
            <Link
              to="/add"
              onClick={onClose}
              className={`${styles.link} ${location.pathname === "/add" ? styles.active : ""}`}
            >
              <UserPlus size={18} className={styles.icon} />
              Add Student
            </Link>
            <Link
              to="/manage"
              onClick={onClose}
              className={`${styles.link} ${location.pathname === "/manage" ? styles.active : ""}`}
            >
              <Users size={18} className={styles.icon} />
              Manage Students
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;