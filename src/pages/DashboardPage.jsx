import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import styles from "./DashboardPage.module.css";
import { getStudentsAPI } from "../services/studentService";
import { PanelLeft, Menu } from "lucide-react";

function DashboardPage() {
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await getStudentsAPI();
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <PanelLeft size={18} color="#6b7280" />
          <span className={styles.headerTitle}>Student Management System</span>
        </div>

        <div className={styles.pageContent}>
          <div className={styles.pageHeading}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Overview of your student management system</p>
          </div>
          <Dashboard students={students} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;