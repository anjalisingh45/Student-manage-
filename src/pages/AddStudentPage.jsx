import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import StudentForm from "../components/StudentForm/StudentForm";
import styles from "./AddStudentPage.module.css";
import { addStudentAPI } from "../services/studentService";
import { toast } from "react-toastify";
import { PanelLeft, Menu } from "lucide-react";

function AddStudentPage() {
  const [editStudent, setEditStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addStudent = async (student) => {
    try {
      const res = await addStudentAPI(student);
      if (res.status === 200 || res.status === 201) {
        toast.success("Student added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateStudent = () => {
    toast.info("Update feature coming soon");
  };

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
            <h1 className={styles.title}>Add Student</h1>
            <p className={styles.subtitle}>Register a new student to the system</p>
          </div>
          <StudentForm
            addStudent={addStudent}
            editStudent={editStudent}
            updateStudent={updateStudent}
          />
        </div>
      </div>
    </div>
  );
}

export default AddStudentPage;