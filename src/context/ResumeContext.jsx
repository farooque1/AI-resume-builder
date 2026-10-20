import { createContext, useContext, useEffect, useState } from "react";

import { initialResumeData } from "../data/initialResumeData";
import { DEFAULT_RESUME_APPEARANCE } from "../utils/resumeAppearance";

const ResumeContext = createContext(null);

function createInitialResumeData() {
  return {
    ...initialResumeData,
    personalInfo: { ...initialResumeData.personalInfo },
  };
}

function loadResumeData() {
  try {
    const savedData = localStorage.getItem("resumeData");
    if (!savedData) return createInitialResumeData();

    const parsedData = JSON.parse(savedData);
    if (!parsedData || typeof parsedData !== "object" || Array.isArray(parsedData)) {
      throw new Error("Saved resume data must be a JSON object.");
    }

    return {
      ...createInitialResumeData(),
      ...parsedData,
      personalInfo: {
        ...initialResumeData.personalInfo,
        ...(parsedData.personalInfo || {}),
      },
    };
  } catch (error) {
    console.error("Could not load saved resume data:", error);
    return createInitialResumeData();
  }
}

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(loadResumeData);
  const [appearance, setAppearance] = useState(() => {
    const storedAppearance = localStorage.getItem("resumeAppearance");
    return storedAppearance
      ? { ...DEFAULT_RESUME_APPEARANCE, ...JSON.parse(storedAppearance) }
      : DEFAULT_RESUME_APPEARANCE;
  });

  useEffect(() => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    } catch (error) {
      console.error("Could not save resume data in this browser:", error);
    }
  }, [resumeData]);

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