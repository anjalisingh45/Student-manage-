import { useState, useEffect } from "react";
import styles from "./EditStudentModal.module.css";
import { X, UserPen } from "lucide-react";

const EditStudentModal = ({ student, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        age: student.age || "",
      });
    }
  }, [student]);

  if (!student) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.age) {
      alert("All fields are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }
    await onUpdate({ ...student, ...formData });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.iconBox}>
            <UserPen size={20} color="white" />
          </div>
          <div>
            <h2 className={styles.modalTitle}>Edit Student</h2>
            <p className={styles.modalSubtitle}>Update the student details below</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className={styles.input}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.updateBtn} onClick={handleSubmit}>
            <UserPen size={16} />
            Update Student
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditStudentModal;