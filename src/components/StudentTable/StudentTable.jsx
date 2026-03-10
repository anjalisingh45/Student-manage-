import styles from "./StudentTable.module.css";
import { Pencil, Trash2 } from "lucide-react";

const StudentTable = ({ students = [], deleteStudent, setEditStudent }) => {
  if (!students.length) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.noData}>No students found</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id || student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td className={styles.actions}>
                <button
                  onClick={() => setEditStudent(student)}
                  className={styles.editBtn}
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(student._id)}
                  className={styles.deleteBtn}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;