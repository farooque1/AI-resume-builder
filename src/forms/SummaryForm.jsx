import { useResume } from "../context/ResumeContext";

function SummaryForm() {
  const { resumeData, setResumeData } = useResume();

  const handleSummaryChange = (e) => {
    setResumeData((prev) => ({
      ...prev,
      summary: e.target.value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h2 className="text-sm font-semibold mb-2">
        Professional Summary
      </h2>

      <textarea
        name="summary"
        value={resumeData.summary || ""}
        onChange={handleSummaryChange}
        placeholder="Briefly describe your professional background..."
        className="w-full border rounded p-2 h-24 resize-none"
      />
    </div>
  );
}

export default SummaryForm;