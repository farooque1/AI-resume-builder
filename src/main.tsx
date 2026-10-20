import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ResumeProvider } from "./context/ResumeContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary name="Application">
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </ErrorBoundary>
  </StrictMode>
)
