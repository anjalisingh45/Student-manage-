import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import StudentForm from "../components/StudentForm/StudentForm";

function AddStudentPage() {

  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now()
    };

    setStudents([...students, newStudent]);

    alert("Student Added Successfully ✅");
  };

  const updateStudent = (updatedStudent) => {

    const updated = students.map((s) =>
      s.id === updatedStudent.id ? updatedStudent : s
    );

    setStudents(updated);
    setEditStudent(null);
  };

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "30px", width: "100%" }}>

        {/* <h1>Add Student</h1> */}

        <StudentForm
          addStudent={addStudent}
          editStudent={editStudent}
          updateStudent={updateStudent}
        />

      </div>

    </div>

  );
}

export default AddStudentPage;