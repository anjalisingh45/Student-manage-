import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import styles from "./DashboardPage.module.css";

function DashboardPage() {

  const students = [
    { name: "Aarav Sharma", age: 20 },
    { name: "Priya Patel", age: 22 },
    { name: "Rohit Kumar", age: 19 }
  ];

  return (

    <div className={styles.layout}>

      <Sidebar/>

      <div className={styles.mainContent}>

        <h1 className={styles.title}>Dashboard</h1>

        <Dashboard students={students}/>

      </div>

    </div>

  );
}

export default DashboardPage;