import { useState, useRef } from "react";
import { extractPdfText } from "../utils/extractPdfText";
import { parseResumeText } from "../utils/parseResumeText";
import { useResume } from "../context/ResumeContext";
import { FiFileText, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function UploadResume() {

    const [pdfText, setPdfText] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const { setResumeData } = useResume();
    const navigate = useNavigate();

    const resumeInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        try {
            setLoading(true);

            setLoadingMessage(
                "Reading your resume..."
            );

            // Start minimum delay
            const minimumDelay = new Promise(
                (resolve) => setTimeout(resolve, 1500)
            );

            const text = await extractPdfText(file);

            setLoadingMessage(
                "Processing resume information..."
            );

            const parsedData =
                parseResumeText(text);

            console.log(
                "PARSED RESUME:",
                parsedData
            );

            setResumeData(parsedData);

            // Wait for minimum loader duration
            await minimumDelay;

            setLoadingMessage(
                "Resume ready!"
            );

            // Small transition so user sees success
            await new Promise(
                (resolve) => setTimeout(resolve, 400)
            );

            navigate("/builder");

        } catch (error) {
            console.error(
                "Resume upload failed:",
                error
            );

            alert(
                "Unable to process the resume. Please try again."
            );

        } finally {
            setLoading(false);
            setLoadingMessage("");

            // Allow selecting same PDF again
            e.target.value = "";
        }
    };

    return (
        <div className="p-1">
            <div className="border border-gray-300 rounded-xl p-6 hover:border-black hover:shadow-md transition">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiFileText size={22} />
                </div>
                <h2 className="font-semibold text-lg">
                    Upload Resume
                </h2>

                <p className="text-sm text-gray-500 mt-5 mb-10">
                    Upload your existing PDF resume.
                </p>

                <button
                    type="button"
                    onClick={() => resumeInputRef.current?.click()}
                    disabled={loading}
                    className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition
                    ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"}
                    text-white
  `                 }>
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
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                />


                {loading && (
                    <p className="mt-5">
                        Reading resume...
                    </p>
                )}

                {pdfText && (
                    <div className="mt-8">

                        <h2 className="font-bold mb-3">
                            Extracted PDF Text
                        </h2>

                        <textarea
                            value={pdfText}
                            readOnly
                            className="w-full h-96 border rounded p-4"
                        />

                    </div>
                )}
            </div>
        </div>
    );
}

export default UploadResume;