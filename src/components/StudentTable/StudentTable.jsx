import styles from "./StudentTable.module.css";

const StudentTable = ({ students, deleteStudent, setEditStudent }) => {

  return (

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

          <tr key={student._id}>

            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>

              <button
                onClick={() => setEditStudent(student)}
                className={styles.edit}
              >
                Edit
              </button>

              <button
                onClick={() => deleteStudent(student._id)}
                className={styles.delete}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
};

export default StudentTable;