// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import PlanningFormPage from "../components/features/Planning/pages/PlanningFormPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home page route - renders the menu/sidebar at root URL */}
      <Route path="/" element={<HomePage />} />
      
      {/* Planning page route */}
      <Route path="/planning" element={<PlanningFormPage />} />
      
      {/* Add other routes here as needed, e.g., for /structure, /elevation, etc. */}
      {/* <Route path="/structure" element={<StructurePage />} /> */}
      {/* ... */}
    </Routes>
  );
}