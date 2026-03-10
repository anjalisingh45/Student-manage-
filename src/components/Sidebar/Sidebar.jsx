import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (

    <div className={styles.sidebar}>

      <h2 className={styles.logo}>Student Manager</h2>

      <nav className={styles.nav}>

        <Link to="/" className={styles.link}>
          Dashboard
        </Link>

        <Link to="/add" className={styles.link}>
          Add Student
        </Link>

        <Link to="/manage" className={styles.link}>
          Manage Students
        </Link>

      </nav>

    </div>
  );
};

export default Sidebar;