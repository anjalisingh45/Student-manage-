import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import StudentTable from "../components/StudentTable/StudentTable";
import EditStudentModal from "../components/EditStudentModal/EditStudentModal";
import styles from "./ManageStudentsPage.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PanelLeft } from "lucide-react";

import {
  getStudentsAPI,
  deleteStudentAPI,
  updateStudentAPI,
  addStudentAPI,
} from "../services/studentService";
import { toast } from "react-toastify";

function ManageStudentsPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

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

const handleExcelUpload = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const validTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv"
  ];

  if (!validTypes.includes(file.type)) {
    toast.error("Please upload a valid Excel file (.xlsx, .xls, .csv)");
    e.target.value = null;
    return;
  }

  console.log("Excel file selected:", file);

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

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "students.xlsx");
  };

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.mainContent}>
        {/* Header Bar */}
        <div className={styles.header}>
          <PanelLeft size={18} color="#6b7280" />
          <span className={styles.headerTitle}>Student Management System</span>
        </div>

        {/* Page Content */}
        <div className={styles.pageContent}>
          <div className={styles.pageHeading}>
            <h1 className={styles.title}>Manage Students</h1>
            <p className={styles.subtitle}>View, edit and manage all registered students</p>
          </div>

          {/* Top Bar */}
          <div className={styles.topBar}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
            />
            <button onClick={exportExcel} className={styles.exportBtn}>
              Export Excel
            </button>
 <div className={styles.importWrapper}>
  <label className={styles.importBtn}>
    Import Excel
    <input
      type="file"
      accept=".xlsx,.xls,.csv"
      onChange={handleExcelUpload}
    />
  </label>
</div>
          </div>

          {/* Edit Modal */}
          <EditStudentModal
            student={editStudent}
            onClose={() => setEditStudent(null)}
            onUpdate={updateStudent}
          />

          {/* Table */}
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