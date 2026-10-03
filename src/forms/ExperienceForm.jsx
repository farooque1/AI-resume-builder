import { useResume } from "../context/ResumeContext";

function ExperienceForm() {
  const { resumeData, setResumeData } = useResume();

  const currentMonthStr = new Date()
    .toISOString()
    .slice(0, 7);

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const fieldValue =
      type === "checkbox" ? checked : value;

    setResumeData((prev) => {
      const updatedExperience = [...prev.experience];

      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: fieldValue,
      };
      ``

      // If Present is checked, clear To Date
      if (name === "currentCompany" && checked) {
        updatedExperience[index].toDate = "";
      }

      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  const addExperience = () => {
    const newExperience = {
      jobTitle: "",
      company: "",
      fromDate: "",
      toDate: "",
      currentCompany: false,
      location: "",
      points: "",
    };

    setResumeData((prev) => ({
      ...prev,

      experience: [
        ...(prev.experience || []),
        newExperience,
      ],
    }));
  };

  const removeExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,

      experience: prev.experience.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border">

      <h2 className="text-sm font-semibold mb-2">
        Work Experience
      </h2>

      {(resumeData.experience || []).map(
        (exp, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-5 bg-gray-50"
          >

            <div className="flex justify-between items-center mb-3">

              <h3 className="font-semibold">
                Experience {index + 1}
              </h3>

              {resumeData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="jobTitle"
                value={exp.jobTitle || ""}
                onChange={(e) =>
                  handleExperienceChange(index, e)
                }
                placeholder="Job Role / Designation"
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                name="company"
                value={exp.company || ""}
                onChange={(e) =>
                  handleExperienceChange(index, e)
                }
                placeholder="Company Name"
                className="w-full border rounded p-2"
              />

              {/* Experience Dates */}
              <div className="space-y-3">

                {/* From + To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* From Date */}
                  <div className="w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      From
                    </label>

                    <input
                      type="month"
                      name="fromDate"
                      max={currentMonthStr}
                      value={exp.fromDate || ""}
                      onChange={(e) =>
                        handleExperienceChange(index, e)
                      }
                      className="
          w-full
          min-w-0
          border
          border-gray-300
          rounded-md
          px-3
          py-2
          text-sm
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
                    />
                  </div>

                  {/* To Date */}
                  {!exp.currentCompany && (
                    <div className="w-full">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        To
                      </label>

                      <input
                        type="month"
                        name="toDate"
                        min={exp.fromDate || undefined}
                        max={currentMonthStr}
                        value={exp.toDate || ""}
                        onChange={(e) =>
                          handleExperienceChange(index, e)
                        }
                        className="
            w-full
            min-w-0
            border
            border-gray-300
            rounded-md
            px-3
            py-2
            text-sm
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
                      />
                    </div>
                  )}

                </div>

                {/* Present Checkbox */}
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="currentCompany"
                    checked={Boolean(exp.currentCompany)}
                    onChange={(e) =>
                      handleExperienceChange(index, e)
                    }
                    className="
        h-4
        w-4
        rounded
        border-gray-300
        text-blue-600
        focus:ring-blue-500
      "
                  />

                  <span>
                    I currently work here
                  </span>
                </label>

              </div>

              <input
                type="text"
                name="location"
                value={exp.location || ""}
                onChange={(e) =>
                  handleExperienceChange(index, e)
                }
                placeholder="Location e.g. Mumbai"
                className="w-full border rounded p-2"
              />

              <textarea
                name="points"
                value={exp.points || ""}
                onChange={(e) =>
                  handleExperienceChange(index, e)
                }
                placeholder="Responsibilities - write each point on new line"
                rows="5"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        ))}

      <button
        type="button"
        onClick={addExperience}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        + Add More Experience
      </button>
    </div>
  );
}

export default ExperienceForm;