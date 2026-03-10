import { useState, useEffect } from "react";
import styles from "./StudentForm.module.css";

const StudentForm = ({ addStudent, editStudent, updateStudent }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editStudent) {
      setFormData(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
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

    if (editStudent) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }

    setFormData({
      name: "",
      email: "",
      age: ""
    });
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.heading}>
        {editStudent ? "Edit Student" : "Add Student"}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className={styles.input}
        />

        <button className={styles.button}>
          {editStudent ? "Update Student" : "Add Student"}
        </button>

      </form>
    </div>
  );
};

export default StudentForm;