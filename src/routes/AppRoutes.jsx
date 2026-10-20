import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import Layout from "../components/Layout";
import PageLoadingFallback from "../components/PageLoadingFallback";

const Home = lazy(() => import("../pages/Home"));
const SelectTemplate = lazy(() => import("../pages/SelectTemplate"));
const ResumeBuilder = lazy(() => import("../pages/ResumeBuilder"));
const Preview = lazy(() => import("../pages/Preview"));
const Login = lazy(() => import("../pages/Login"));
const Download = lazy(() => import("../pages/Download"));
const ResumeOptions = lazy(() => import("../pages/ResumeOptions"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary name="Application">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/templates" element={<SelectTemplate />} />
              <Route path="/builder" element={<ResumeBuilder />} />
              <Route path="/ResumeOptions" element={<ResumeOptions />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/login" element={<Login />} />
              <Route path="/download" element={<Download />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRoutes;