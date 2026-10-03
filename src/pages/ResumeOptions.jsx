import React, { useRef } from "react";
import {
  FiUpload,
  FiEdit3,
  FiCode,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UploadResume from "./UploadResume";
import { useResume } from "../context/ResumeContext";
import { initialResumeData } from "../data/initialResumeData";
import  simpleCV  from "../data/sample-resume.json";

const ResumeOptions = ({
  onResumeUpload,
  onJsonUpload,
  onManualCreate,
}) => {
  const resumeInputRef = useRef(null);
  const jsonInputRef = useRef(null);
  const { setResumeData } = useResume();

  const navigate = useNavigate();

  const handleJsonUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const text = await file.text();

      const jsonData = JSON.parse(text);

      console.log("IMPORTED JSON:", jsonData);

      const finalResumeData = {
        ...initialResumeData,
        ...jsonData,

        personalInfo: {
          ...initialResumeData.personalInfo,
          ...(jsonData.personalInfo || {}),
        },

        skills: Array.isArray(jsonData.skills)
          ? jsonData.skills
          : [],

        experience: Array.isArray(jsonData.experience)
          ? jsonData.experience
          : initialResumeData.experience,

        education: Array.isArray(jsonData.education)
          ? jsonData.education
          : initialResumeData.education,

        projects: Array.isArray(jsonData.projects)
          ? jsonData.projects
          : initialResumeData.projects,

        certifications: Array.isArray(jsonData.certifications)
          ? jsonData.certifications
          : initialResumeData.certifications,

        awards: Array.isArray(jsonData.awards)
          ? jsonData.awards
          : initialResumeData.awards,

        languages: Array.isArray(jsonData.languages)
          ? jsonData.languages
          : initialResumeData.languages,
      };

      console.log(
        "FINAL IMPORTED RESUME:",
        finalResumeData
      );

      setResumeData(finalResumeData);

      // Same flow as manual/PDF:
      // choose template first
      navigate("/templates");

    } catch (error) {
      console.error("Invalid JSON file:", error);

      alert(
        "Please upload a valid resume JSON file."
      );
    }
    e.target.value = "";
  };


  const downloadSampleJson = () => {
    const jsonString = JSON.stringify(simpleCV, null, 2);

    const blob = new Blob([jsonString], { type: "application/json", });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url; link.download = "sample-resume.json";

    document.body.appendChild(link); link.click(); document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Your Resume
        </h1>

        <p className="text-gray-500 mt-2">
          Choose how you would like to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <UploadResume />
        {/* Manual Resume */}
        <div className="border border-gray-300 rounded-xl p-6 hover:border-black hover:shadow-md transition">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <FiEdit3 size={22} />
          </div>
          <h2 className="font-semibold text-lg">
            Create Manually
          </h2>
          <p className="text-sm text-gray-500 mt-2 mb-5">
            Enter your personal details, skills, experience and projects.
          </p>
          <button
            onClick={() => navigate("/templates")}
            className="w-full border border-black text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-black hover:text-white"
          >
            <FiEdit3 />
            Create Resume
          </button>

        </div>


        {/* JSON Import */}
        <div className="border border-gray-300 rounded-xl p-6 hover:border-black hover:shadow-md transition">

          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <FiCode size={22} />
          </div>

          <h2 className="font-semibold text-lg">
            Import JSON
          </h2>

          <p onClick={downloadSampleJson} 
            className="text-[12px] text-blue-600 font-semibold cursor-pointer hover:underline">
            Download sample file
            </p>


          <p className="text-[14px] text-gray-500 mb-2">
            Import resume data from a previously exported JSON file.
          </p>

          <button
            onClick={() => jsonInputRef.current?.click()}
            className="w-full border border-black text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-black hover:text-white"
          >
            <FiUpload />
            Upload JSON
          </button>

          <input
            ref={jsonInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleJsonUpload}
            className="hidden"
          />

        </div>

      </div>
    </div>
  );
};

export default ResumeOptions;