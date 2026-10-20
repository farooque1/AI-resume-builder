import { useRef, useState } from "react";
import { FiFileText, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { initialResumeData } from "../data/initialResumeData";
import { convertDocumentToText } from "../utils/convertDocumentToText";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

async function parseResumeWithApi(text) {
  console.info("[resume-upload] parse_request_started", {
    textCharacters: text.length,
  });
  const response = await fetch(`${API_BASE_URL}/resume/parse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(125000),
  });
  console.info("[resume-upload] parse_response_received", {
    status: response.status,
    requestId: response.headers.get("X-Request-Id"),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(
      response.ok
        ? "The resume service returned an invalid response."
        : `The resume service could not be reached (HTTP ${response.status}).`,
    );
  }

  if (!response.ok) {
    throw new Error(result?.error?.message || "Unable to process this resume.");
  }

  const resume = result?.data?.resume;
  if (!resume || typeof resume !== "object" || Array.isArray(resume)) {
    throw new Error("The resume service returned an invalid response.");
  }

  return {
    ...initialResumeData,
    ...resume,
    personalInfo: {
      ...initialResumeData.personalInfo,
      ...resume.personalInfo,
    },
  };
}

function UploadResume() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setResumeData } = useResume();
  const navigate = useNavigate();
  const resumeInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setErrorMessage("");
    setLoading(true);

    try {
      setLoadingMessage("Extracting text from your document...");
      const text = await convertDocumentToText(file);
      console.info("[resume-upload] document_text_extracted", {
        characters: text.length,
      });

      if (text.length < 50) {
        throw new Error(
          "We could not find enough readable text. Check the document and try again.",
        );
      }
      if (text.length > 50000) {
        throw new Error(
          "This resume contains more than 50,000 characters. Shorten the document and try again.",
        );
      }

      setLoadingMessage("AI is organizing your resume information...");
      const resume = await parseResumeWithApi(text);

      setResumeData(resume);
      setLoadingMessage("Resume ready!");
      await new Promise((resolve) => setTimeout(resolve, 300));
      navigate("/builder");
    } catch (error) {
      console.error("Resume import failed:", error);
      setErrorMessage(
        error.message || "Unable to process the resume. Please try again.",
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
      event.target.value = "";
    }
  };

  return (
    <div className="p-1">
      <div className="border border-gray-300 rounded-xl p-6 hover:border-black hover:shadow-md transition">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <FiFileText size={22} />
        </div>
        <h2 className="font-semibold text-lg">Upload Resume</h2>
        <p className="text-sm text-gray-500 mb-5">
          Upload a PDF or DOCX resume. AI will organize its contents into the
          resume form.
        </p>
        <button
          type="button"
          onClick={() => resumeInputRef.current?.click()}
          disabled={loading}
          className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          } text-white`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Resume...
            </>
          ) : (
            <>
              <FiUpload />
              Upload Resume
            </>
          )}
        </button>

        <input
          ref={resumeInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileUpload}
          className="hidden"
        />

        {loadingMessage && (
          <p className="mt-4 text-sm text-gray-600" role="status">
            {loadingMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadResume;
