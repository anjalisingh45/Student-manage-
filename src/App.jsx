import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import AddStudentPage from "./pages/AddStudentPage";
import ManageStudentsPage from "./pages/ManageStudentsPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<DashboardPage />} />

        <Route path="/add" element={<AddStudentPage />} />

        <Route path="/manage" element={<ManageStudentsPage />} />

      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

    </BrowserRouter>

  );
}

export default App;