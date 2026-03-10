import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import StudentTable from "../components/StudentTable/StudentTable";
import styles from "./ManageStudentsPage.module.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ManageStudentsPage() {

  const [search, setSearch] = useState("");

  const [students, setStudents] = useState([
    { _id: 1, name: "Aarav Sharma", email: "aarav@email.com", age: 20 },
    { _id: 2, name: "Priya Patel", email: "priya@email.com", age: 22 },
    { _id: 3, name: "Rohit Kumar", email: "rohit@email.com", age: 19 }
  ]);

  const deleteStudent = (id) => {

    const confirm = window.confirm("Delete this student?");

    if (confirm) {
      setStudents(students.filter((s) => s._id !== id));
    }
  };

  const setEditStudent = (student) => {
    alert("Edit feature coming soon");
  };

  // 🔍 Search Filter
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📥 Excel Export
  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(file, "students.xlsx");
  };

  return (

    <div className={styles.layout}>

      <Sidebar />

      <div className={styles.content}>

        <h1 className={styles.title}>Manage Students</h1>

        <div className={styles.topBar}>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />

          <button
            onClick={exportExcel}
            className={styles.exportBtn}
          >
            Export Excel
          </button>

        </div>

        <StudentTable
          students={filteredStudents}
          deleteStudent={deleteStudent}
          setEditStudent={setEditStudent}
        />

      </div>

    </div>
  );
}

export default ManageStudentsPage;