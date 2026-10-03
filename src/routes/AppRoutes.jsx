import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import SelectTemplate from "../pages/SelectTemplate";
import ResumeBuilder from "../pages/ResumeBuilder";
import Preview from "../pages/Preview";
import Login from "../pages/Login";
import Download from "../pages/Download";
import ResumeOptions from "../pages/ResumeOptions";
import Layout from "../components/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/templates"
          element={<SelectTemplate />}
        />

        <Route
          path="/builder"
          element={<ResumeBuilder />}
        />

         <Route
          path="/ResumeOptions"
          element={<ResumeOptions />}
        />

        <Route
          path="/preview"
          element={<Preview />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/download" element={<Download />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;