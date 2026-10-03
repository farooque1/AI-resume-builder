import { useResume } from "../context/ResumeContext";

function CertificationsForm() {
  const { resumeData, setResumeData } = useResume();

  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => {
      const updatedCertifications = [
        ...(prev.certifications || []),
      ];

      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [name]:value,
      };

      return {
        ...prev,
        certifications: updatedCertifications,
      };
    });
  };

  const addCertification = () => {
    const newCertification = {
      name: "",
      issuer: "",
      year: "",
    };

    setResumeData((prev) => ({
      ...prev,

      certifications: [
        ...(prev.certifications || []),
        newCertification,
      ],
    }));
  };

  const removeCertification = (index) => {
    setResumeData((prev) => ({
      ...prev,

      certifications: (prev.certifications || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white p-5 rounded shadow">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">
          Certifications
        </h2>

        <button
          type="button"
          onClick={addCertification}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          + Add Certification
        </button>
      </div>

      {(resumeData.certifications || []).map(
        (certification, index) => (
          <div
            key={index}
            className="border p-4 rounded mb-4 space-y-3"
          >
            <div className="flex justify-between items-center">

              <span className="text-sm font-semibold text-gray-800">
                Certification {index + 1}
              </span>

              {resumeData.certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeCertification(index)
                  }
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}

            </div>

            <input
              type="text"
              name="name"
              placeholder="Certification Name"
              value={certification.name || ""}
              onChange={(e) =>
                handleCertificationChange(index, e)
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="issuer"
              placeholder="Issued By"
              value={certification.issuer || ""}
              onChange={(e) =>
                handleCertificationChange(index, e)
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={certification.year || ""}
              onChange={(e) =>
                handleCertificationChange(index, e)
              }
              className="w-full border p-2 rounded"
            />

          </div>
        )
      )}

    </div>
  );
}

export default CertificationsForm;