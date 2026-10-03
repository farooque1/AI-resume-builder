import { useResume } from "../context/ResumeContext";

function LanguagesForm() {
  const { resumeData, setResumeData } = useResume();

  const handleLanguageChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => {
      const updatedLanguages = [
        ...(prev.languages || []),
      ];

      updatedLanguages[index] = {
        ...updatedLanguages[index],
        [name]:value,
      };

      return {
        ...prev,
        languages: updatedLanguages,
      };
    });
  };

  const addLanguage = () => {
    const newLanguage = {
      language: "",
    };

    setResumeData((prev) => ({
      ...prev,

      languages: [
        ...(prev.languages || []),
        newLanguage,
      ],
    }));
  };

  const removeLanguage = (index) => {
    setResumeData((prev) => ({
      ...prev,

      languages: (prev.languages || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white p-5 rounded shadow">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-sm font-semibold">
          Languages
        </h2>

        <button
          type="button"
          onClick={addLanguage}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          + Add Language
        </button>

      </div>

      {(resumeData.languages || []).map(
        (languageItem, index) => (
          <div
            key={index}
            className="border p-4 rounded mb-4 space-y-3"
          >

            <div className="flex justify-between items-center">

              <span className="text-sm font-semibold text-gray-800">
                Language {index + 1}
              </span>

              {resumeData.languages.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeLanguage(index)
                  }
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}

            </div>

            <input
              type="text"
              name="language"
              placeholder="Language e.g. English"
              value={languageItem.language || ""}
              onChange={(e) =>
                handleLanguageChange(index, e)
              }
              className="w-full border p-2 rounded"
            />

          </div>
        )
      )}

    </div>
  );
}

export default LanguagesForm;