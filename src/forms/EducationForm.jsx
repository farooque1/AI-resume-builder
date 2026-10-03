import { useResume } from "../context/ResumeContext";

function EducationForm() {
  const { resumeData, setResumeData } = useResume();

  const currentMonthStr = new Date()
    .toISOString()
    .slice(0, 7);

  // Update education
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => {
      const updatedEducation = [...prev.education];

      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };

      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  // Add education
  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      fromDate: "",
      toDate: "",
      location: "",
    };

    setResumeData((prev) => ({
      ...prev,

      education: [
        ...(prev.education || []),
        newEducation,
      ],
    }));
  };

  // Remove education
  const removeEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,

      education: prev.education.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border mb-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-sm font-semibold">
          Education
        </h2>

        <button
          type="button"
          onClick={addEducation}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          + Add Education
        </button>

      </div>

      {(resumeData.education || []).map(
        (edu, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-5 bg-gray-50"
          >

            {/* Education header */}
            <div className="flex justify-between items-center mb-4">

              <span className="text-sm font-medium text-gray-500">
                Education {index + 1}
              </span>

              {resumeData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeEducation(index)
                  }
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}

            </div>

            <div className="space-y-4">

              {/* Degree */}
              <input
                type="text"
                name="degree"
                value={edu.degree || ""}
                onChange={(e) =>
                  handleEducationChange(index, e)
                }
                placeholder="Degree / Course"
                className="w-full border rounded p-2"
              />

              {/* College / University */}
              <input
                type="text"
                name="institution"
                value={edu.institution || ""}
                onChange={(e) =>
                  handleEducationChange(index, e)
                }
                placeholder="College / University"
                className="w-full border rounded p-2"
              />

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* From */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    From
                  </label>

                  <input
                    type="month"
                    name="fromDate"
                    max={currentMonthStr}
                    value={edu.fromDate || ""}
                    onChange={(e) =>
                      handleEducationChange(index, e)
                    }
                    className="w-full min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* To */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    To
                  </label>

                  <input
                    type="month"
                    name="toDate"
                    min={edu.fromDate || undefined}
                    max={currentMonthStr}
                    value={edu.toDate || ""}
                    onChange={(e) =>
                      handleEducationChange(index, e)
                    }
                    className="w-full min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>

            </div>

          </div>
        )
      )}

    </div>
  );
}

export default EducationForm;