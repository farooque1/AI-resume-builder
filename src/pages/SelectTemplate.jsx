import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TemplatePreview from "../components/TemplatePreview";
import ResumeLengthSelector from "../components/ResumeLengthSelector";
import { templateOptions } from "../templates/config/templateOptions";
import { templateThemes } from "../templates/config/templateThemes";

function SelectTemplate() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [pageMode, setPageMode] = useState(
    localStorage.getItem("resumePageMode") || "multi",
  );

  const categories = [
    "All",
    ...new Set(templateOptions.map((template) => template.category)),
  ];
  const visibleTemplates = templateOptions.filter(
    (template) => category === "All" || template.category === category,
  );

  const selectTemplate = (templateId) => {
    localStorage.setItem("selectedTemplate", templateId);
    localStorage.setItem("resumePageMode", pageMode);

    const selectedTheme = templateThemes[templateId] || templateThemes.ats;

    localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));

    navigate("/builder");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-3">
        Choose your resume design
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Pick a layout and page length to start your CV
      </p>

      <div className="mb-7 flex flex-col items-center gap-5">
        {/* <ResumeLengthSelector
          value={pageMode}
          onChange={(mode) => {
            setPageMode(mode);
            localStorage.setItem("resumePageMode", mode);
          }}
        /> */}

        <div
          className="flex flex-wrap justify-center gap-2"
          aria-label="Template categories"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                category === item
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTemplates.map((template) => (
          <article
            key={template.id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <TemplatePreview type={template.id} />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-900">
                  {template.name}
                </h2>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                  {template.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {template.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => selectTemplate(template.id)}
                className="mt-5 w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                Use template
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default SelectTemplate;
