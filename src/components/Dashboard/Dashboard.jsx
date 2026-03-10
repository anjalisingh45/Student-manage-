import styles from "./Dashboard.module.css";
import { Users, TrendingUp, UserPlus, GraduationCap } from "lucide-react";

const Dashboard = ({ students = [] }) => {
  const avgAge =
    students.length > 0
      ? Math.round(
          students.reduce((sum, s) => sum + Number(s.age), 0) / students.length
        )
      : 0;

  const newestStudent =
    students.length > 0 ? students[students.length - 1].name : "N/A";

  const stats = [
    {
      label: "TOTAL STUDENTS",
      value: students.length,
      icon: <Users size={22} color="white" />,
      iconBg: styles.iconPurple,
    },
    {
      label: "AVG AGE",
      value: avgAge,
      icon: <TrendingUp size={22} color="white" />,
      iconBg: styles.iconTeal,
    },
    {
      label: "NEWEST",
      value: newestStudent,
      icon: <UserPlus size={22} color="white" />,
      iconBg: styles.iconPurple,
    },
    {
      label: "ACTIVE",
      value: students.length,
      icon: <GraduationCap size={22} color="white" />,
      iconBg: styles.iconGreen,
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.cards}>
        {stats.map((stat, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardLeft}>
              <span className={styles.cardLabel}>{stat.label}</span>
              <span className={styles.cardValue}>{stat.value}</span>
            </div>
            <div className={`${styles.iconBox} ${stat.iconBg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;