import { useState, useEffect } from "react";
import styles from "./StudentForm.module.css";
import { UserPlus } from "lucide-react";

const StudentForm = ({ addStudent, editStudent, updateStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (editStudent) {
      setFormData(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    try {
      if (editStudent) {
        await updateStudent(formData);
      } else {
        await addStudent(formData);
      }
      setFormData({ name: "", email: "", age: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.card}>
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.iconBox}>
          <UserPlus size={22} color="white" />
        </div>
        <div>
          <h2 className={styles.cardTitle}>
            {editStudent ? "Edit Student" : "Add New Student"}
          </h2>
          <p className={styles.cardSubtitle}>
            {editStudent
              ? "Update the student details below"
              : "Fill in the details to add a new student"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="student@example.com"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          <UserPlus size={18} />
          {editStudent ? "Update Student" : "Add Student"}
        </button>
      </div>
    </div>
  );
};

export default StudentForm;