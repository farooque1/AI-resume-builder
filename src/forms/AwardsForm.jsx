import { useResume } from "../context/ResumeContext";

function AwardsForm() {
  const { resumeData, setResumeData } = useResume();

  const handleAwardChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => {
      const updatedAwards = [
        ...(prev.awards || []),
      ];

      updatedAwards[index] = {
        ...updatedAwards[index],
        [name]:value,
      };

      return {
        ...prev,
        awards: updatedAwards,
      };
    });
  };

  const addAward = () => {
    const newAward = {
      title: "",
      year: "",
    };

    setResumeData((prev) => ({
      ...prev,

      awards: [
        ...(prev.awards || []),
        newAward,
      ],
    }));
  };

  const removeAward = (index) => {
    setResumeData((prev) => ({
      ...prev,

      awards: (prev.awards || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white p-5 rounded shadow">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-sm font-semibold">
          Awards
        </h2>

        <button
          type="button"
          onClick={addAward}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          + Add Award
        </button>

      </div>

      {(resumeData.awards || []).map(
        (award, index) => (
          <div
            key={index}
            className="border p-4 rounded mb-4 space-y-3"
          >

            <div className="flex justify-between items-center">

              <span className="text-sm font-semibold text-gray-800">
                Award {index + 1}
              </span>

              {resumeData.awards.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeAward(index)
                  }
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}

            </div>

            <input
              type="text"
              name="title"
              placeholder="Award Title"
              value={award.title || ""}
              onChange={(e) =>
                handleAwardChange(index, e)
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={award.year || ""}
              onChange={(e) =>
                handleAwardChange(index, e)
              }
              className="w-full border p-2 rounded"
            />

          </div>
        )
      )}

    </div>
  );
}

export default AwardsForm;