import styles from "./Dashboard.module.css";

const Dashboard = ({ students }) => {

  const total = students.length;

  const avgAge =
    students.reduce((acc, s) => acc + s.age, 0) /
    (students.length || 1);

  const newest = students[students.length - 1]?.name;

  return (

    <div className={styles.dashboard}>

      <div className={styles.card}>
        <h3>Total Students</h3>
        <p>{total}</p>
      </div>

      <div className={styles.card}>
        <h3>Avg Age</h3>
        <p>{avgAge.toFixed(0)}</p>
      </div>

      <div className={styles.card}>
        <h3>Newest</h3>
        <p>{newest}</p>
      </div>

    </div>
  );
};

export default Dashboard;