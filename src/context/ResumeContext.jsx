import { createContext, useContext, useEffect, useState } from "react";

import { initialResumeData } from "../data/initialResumeData";
import { DEFAULT_RESUME_APPEARANCE } from "../utils/resumeAppearance";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(
    initialResumeData
  );
  const [appearance, setAppearance] = useState(() => {
    const storedAppearance = localStorage.getItem("resumeAppearance");
    return storedAppearance
      ? { ...DEFAULT_RESUME_APPEARANCE, ...JSON.parse(storedAppearance) }
      : DEFAULT_RESUME_APPEARANCE;
  });

  useEffect(() => {
    localStorage.setItem("resumeAppearance", JSON.stringify(appearance));
  }, [appearance]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        appearance,
        setAppearance,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}