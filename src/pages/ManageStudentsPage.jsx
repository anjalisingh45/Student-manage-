import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import StudentTable from "../components/StudentTable/StudentTable";
import EditStudentModal from "../components/EditStudentModal/EditStudentModal";
import styles from "./ManageStudentsPage.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PanelLeft, Menu } from "lucide-react";

import {
  getStudentsAPI,
  deleteStudentAPI,
  updateStudentAPI,
  addStudentAPI,
} from "../services/studentService";

function ManageStudentsPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await getStudentsAPI();
      // Safe guard: always set an array
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    const confirm = window.confirm("Delete this student?");
    if (!confirm) return;
    try {
      await deleteStudentAPI(id);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      try {
        for (const student of jsonData) {
          await addStudentAPI(student);
        }
        fetchStudents();
      } catch (error) {
        console.log(error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const updateStudent = async (student) => {
    try {
      await updateStudentAPI(student._id, student);
      setEditStudent(null);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // Safe filter: guard against undefined name/email
  const filteredStudents = students.filter((student) => {
    const name = student?.name?.toLowerCase() ?? "";
    const email = student?.email?.toLowerCase() ?? "";
    const q = search.toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "students.xlsx");
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
            <h1 className={styles.title}>Manage Students</h1>
            <p className={styles.subtitle}>View, edit and manage all registered students</p>
          </div>

          <div className={styles.topBar}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
            />
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImportExcel}
              className={styles.importInput}
            />
            <button onClick={exportExcel} className={styles.exportBtn}>
              Export Excel
            </button>
          </div>

          <EditStudentModal
            student={editStudent}
            onClose={() => setEditStudent(null)}
            onUpdate={updateStudent}
          />

          <StudentTable
            students={filteredStudents}
            deleteStudent={deleteStudent}
            setEditStudent={setEditStudent}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageStudentsPage;