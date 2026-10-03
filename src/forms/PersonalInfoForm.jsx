import { useEffect } from "react";
import { useResume } from "../context/ResumeContext";

function PersonalInfoForm() {
  const { resumeData, setResumeData } = useResume();

  console.log("PERSONAL INFO:", resumeData.personalInfo);

const handleChange = (e) => {
  const { name, value } = e.target;
  setResumeData((prev) => ({
    ...prev,
    personalInfo: {
      ...prev.personalInfo,
      [name]: value,
    },
  }));
};


  return (
    <div className="bg-white p-4 rounded-lg border mb-4">

      <h2 className="text-sm font-semibold mb-2">
        Personal Information
      </h2>

      <div className="space-y-2">

        <input
          type="text"
          name="fullName"
          value={resumeData.personalInfo.fullName || ""}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded px-2 text-xs h-6"
        />

        <input
          type="email"
          name="email"
          value={resumeData.personalInfo.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded px-2 text-xs h-6"
        />

        <input
          type="text"
          name="jobTitle"
          value={resumeData.personalInfo.jobTitle || ""}
          onChange={handleChange}
          placeholder="Frontend Developer"
          className="w-full border rounded px-2 text-xs h-6"
        />

        <input
          type="text"
          name="location"
          value={resumeData.personalInfo.location || ""}
          onChange={handleChange}
          placeholder="Mumbai, India"
          className="w-full border rounded px-2 text-xs h-6"
        />

        <input
          type="text"
          name="github"
          value={resumeData.personalInfo.github || ""}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full border rounded px-2 text-xs h-6"
        />

        <input
          type="text"
          name="portfolio"
          value={resumeData.personalInfo.portfolio || ""}
          onChange={handleChange}
          placeholder="Portfolio URL"
          className="w-full border rounded px-2 text-xs h-6"
        />

        <input
          type="text"
          name="linkedin"
          value={resumeData.personalInfo.linkedin || ""}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="w-full border rounded px-2 text-xs h-6"
        />

        <input
          type="text"
          name="phone"
          value={resumeData.personalInfo.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border rounded px-2 text-xs h-6"
        />

      </div>
    </div>
  );
}

export default PersonalInfoForm;