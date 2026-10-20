import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
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

function withRouteBoundary(element, name) {
  return <ErrorBoundary name={name}>{element}</ErrorBoundary>;
}

function NotFound() {
  return (
    <section className="mx-auto max-w-xl py-16 text-center" role="status">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Page not found
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        This page does not exist
      </h1>
      <p className="mt-3 text-gray-600">
        The address may be incorrect, or the page may have moved.
      </p>
      <Link
        className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white hover:bg-gray-700"
        to="/"
      >
        Go to home
      </Link>
    </section>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary name="Application">
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={withRouteBoundary(<Home />, "Home page")}
              />
              <Route
                path="/templates"
                element={withRouteBoundary(<SelectTemplate />, "Template page")}
              />
              <Route
                path="/builder"
                element={withRouteBoundary(<ResumeBuilder />, "Resume builder")}
              />
              <Route
                path="/ResumeOptions"
                element={withRouteBoundary(<ResumeOptions />, "Resume options")}
              />
              <Route
                path="/preview"
                element={withRouteBoundary(<Preview />, "Preview page")}
              />
              <Route
                path="/login"
                element={withRouteBoundary(<Login />, "Login page")}
              />
              <Route
                path="/download"
                element={withRouteBoundary(<Download />, "Download page")}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRoutes;