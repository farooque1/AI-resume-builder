import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

import ATSFriendlyTemplate from "../templates/ATS/ATSFriendlyTemplate";
import { templateThemes } from "../templates/config/templateThemes";
import { useResume } from "../context/ResumeContext";
import { applyAppearanceToTheme } from "../utils/resumeAppearance";

function Preview() {
  const navigate = useNavigate();
  const { appearance } = useResume();

  const data =
    JSON.parse(localStorage.getItem("resumeData")) || {};

  const selectedTemplate =
    localStorage.getItem("selectedTemplate") || "ats";

  const templateTheme =
    JSON.parse(localStorage.getItem("selectedTheme")) ||
    templateThemes[selectedTemplate] ||
    templateThemes.ats;
  const theme = applyAppearanceToTheme(templateTheme, appearance);

  return (
    <>
      <div className="mb-6 flex justify-end gap-3">
        <button
          onClick={() => navigate("/builder")}
          className="px-4 py-2 border rounded"
        >
          Edit
        </button>

        <button
          onClick={() => navigate("/download")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Continue
        </button>
      </div>

      <div
        className="resume-global-appearance"
        style={{
          "--resume-font-family": appearance.fontFamily,
          "--resume-heading-font-family": appearance.headingFontFamily,
          "--resume-font-scale": appearance.fontScale,
        }}
      >
        <ATSFriendlyTemplate
          data={data}
          theme={theme}
        />
      </div>
    </>
  );
}

export default Preview;