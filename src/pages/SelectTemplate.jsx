import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";

import { templateThemes } from "../templates/config/templateThemes";

function SelectTemplate() {
  const navigate = useNavigate();

  const selectTemplate = (templateId) => {
    localStorage.setItem("selectedTemplate", templateId);

    const selectedTheme =
      templateThemes[templateId] || templateThemes.ats;

    localStorage.setItem(
      "selectedTheme",
      JSON.stringify(selectedTheme)
    );

    navigate("/builder");
  };

  const templates = [
    {
      id: "modern",
      name: "Modern Resume",
      description: "Clean layout for developers and IT professionals",
      templateImage: image1,
    },
    {
      id: "professional",
      name: "Professional Resume",
      description: "Formal design suitable for experienced professionals",
      templateImage: image2,
    },
    {
      id: "ats",
      name: "ATS Friendly",
      description: "Simple structure optimized for ATS systems",
      templateImage: image3,
    },
  ];

  return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-3">
          Select Template
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Choose a template to start building your CV
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="
                group bg-white rounded-2xl overflow-hidden border shadow-md
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
              "
            >
              <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                <img
                  src={template.templateImage}
                  alt={template.name}
                  className="
                    w-full h-full object-contain p-3
                    transition-transform duration-500 group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute inset-0 bg-black/60 opacity-0
                    group-hover:opacity-100 transition-all duration-300
                    flex items-center justify-center
                  "
                >
                  <button
                    onClick={() => selectTemplate(template.id)}
                    className="
                      bg-blue-600 hover:bg-blue-700 text-white
                      px-6 py-3 rounded-lg font-semibold shadow-lg
                      transition-all duration-300 scale-90 group-hover:scale-100
                    "
                  >
                    Use Template
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {template.name}
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default SelectTemplate;