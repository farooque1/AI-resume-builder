import { useResume } from "../context/ResumeContext";

function SkillsForm() {
  const { resumeData, setResumeData } = useResume();

  const handleSkillsChange = (e) => {
    const value = e.target.value;

    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim());

    setResumeData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border">

      <h2 className="text-sm font-semibold mb-2">
        Skills
      </h2>

      <textarea
        name="skills"
        value={(resumeData.skills || []).join(", ")}
        onChange={handleSkillsChange}
        rows={4}
        placeholder="React, Next.js, JavaScript"
        className="w-full border rounded p-2"
      />

    </div>
  );
}

export default SkillsForm;