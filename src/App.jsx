import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import AddStudentPage from "./pages/AddStudentPage";
import ManageStudentsPage from "./pages/ManageStudentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/add" element={<AddStudentPage />} />
        <Route path="/manage" element={<ManageStudentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;