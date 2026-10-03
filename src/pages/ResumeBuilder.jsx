import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonalInfoForm from "../forms/PersonalInfoForm";
import EducationForm from "../forms/EducationForm";
import SkillsForm from "../forms/SkillsForm";
import SummaryForm from "../forms/SummaryForm";
import ExperienceForm from "../forms/ExperienceForm";
import ProjectsForm from "../forms/ProjectForm";
import CertificationsForm from "../forms/CertificationsForm";
import AwardsForm from "../forms/AwardsForm";
import LanguagesForm from "../forms/LanguagesForm";

import ATSFriendlyTemplate from "../templates/ATS/ATSFriendlyTemplate";
import ModernTemplate from "../templates/Modern/ModernTemplate";
import ProfessionalTemplate from "../templates/Professional/ProfessionalTemplate";

import { templateThemes } from "../templates/config/templateThemes";
import { templateOptions } from "../templates/config/templateOptions";

import ResumeToolbar from "../components/ResumeToolbar";
import TemplateModal from "../components/TemplateModal";
import AppearanceSettingsModal from "../components/AppearanceSettingsModal";

import { useResume } from "../context/ResumeContext";
import { initialResumeData } from "../data/initialResumeData";
import {
  applyAppearanceToTheme,
  DEFAULT_RESUME_APPEARANCE,
} from "../utils/resumeAppearance";


const sections = [
  "summary",
  "skills",
  "experience",
  "education",
  "projects",
  "certifications",
  "awards",
  "languages",
];


const SectionWrapper = ({
  id,
  visibleSections,
  onToggle,
  children,
}) => {
  if (!visibleSections.includes(id)) {
    return null;
  }

  return (
    <div className="relative border p-3 rounded-md shadow-sm bg-white">

      <button
        type="button"
        onClick={() => onToggle(id)}
        className="absolute top-1 right-4 text-xs bg-red-100 hover:bg-red-200 text-red-600 px-1 py-1 rounded z-10"
      >
        Remove Section
      </button>

      <div className="pt-2">
        {children}
      </div>

    </div>
  );
};


function ResumeBuilder() {
  const navigate = useNavigate();

  const { resumeData, setResumeData, appearance, setAppearance } = useResume();
  const [selectedTemplate, setSelectedTemplate] =useState(localStorage.getItem("selectedTemplate") ||"ats");
  const [showTemplateModal, setShowTemplateModal,] = useState(false);
  const [showAppearanceSettings, setShowAppearanceSettings] = useState(false);

  const templateMap = {
    ats: ATSFriendlyTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
  };

  const SelectedTemplate =
    templateMap[selectedTemplate] ||
    ATSFriendlyTemplate;
  const templateTheme =
    templateThemes[selectedTemplate] ||
    templateThemes.ats;
  const currentTheme = applyAppearanceToTheme(templateTheme, appearance);
  const appearanceStyle = {
    "--resume-font-family": appearance.fontFamily,
    "--resume-heading-font-family": appearance.headingFontFamily,
    "--resume-font-scale": appearance.fontScale,
  };
  // Save resume automatically
  useEffect(() => {
    localStorage.setItem(
      "resumeData",
      JSON.stringify(resumeData)
    );
  }, [resumeData]);
  // Toggle section
  const toggleSection = (section) => {
    setResumeData((prev) => {
      const visibleSections =
        prev.visibleSections || [];
      return {
        ...prev,
        visibleSections:
          visibleSections.includes(section)
            ? visibleSections.filter(
              (item) => item !== section
            )
            : [
              ...visibleSections,
              section,
            ],
      };
    });
  };

  // Change template
  const handleTemplateChange = (
    templateId
  ) => {
    setSelectedTemplate(templateId);
    localStorage.setItem(
      "selectedTemplate",
      templateId
    );
    setShowTemplateModal(false);
  };
  // Clear resume
  const handleClearResume = () => {
    localStorage.removeItem(
      "resumeData"
    );
    setResumeData(initialResumeData);
  };

  const handleNext = () => {
    navigate("/download");
  };

  return (
    <div className="grid md:grid-cols-[30%_70%] gap-6">
      {/* LEFT FORM */}
      <div className="space-y-6">
        <PersonalInfoForm />
        {/* Toggle Sections */}

        <div className="p-4 bg-gray-50 rounded border">

          <p className="text-sm font-semibold mb-2">
            Toggle Sections:
          </p>

          <div className="flex flex-wrap gap-2">
            {sections.map((section) => {
              const isActive =
                resumeData.visibleSections?.includes(
                  section
                );
              return (

                <button
                  key={section}
                  type="button"
                  onClick={() =>
                    toggleSection(section)
                  }
                  className={`
                    px-3 py-1
                    text-xs
                    rounded
                    border
                    capitalize
                    transition-colors
                    ${isActive
                      ? "bg-blue-100 border-blue-400 text-blue-700"
                      : "bg-white border-gray-300 text-gray-500"
                    }
                  `}
                >
                  {isActive
                    ? `✓ ${section}`
                    : `+ ${section}`}
                </button>
              );
            })}
          </div>
        </div>


        {/* Summary */}

        <SectionWrapper
          id="summary"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <SummaryForm />
        </SectionWrapper>

        {/* Skills */}

        <SectionWrapper
          id="skills"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <SkillsForm />
        </SectionWrapper>


        {/* Experience */}

        <SectionWrapper
          id="experience"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <ExperienceForm />
        </SectionWrapper>


        {/* Education */}

        <SectionWrapper
          id="education"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <EducationForm />
        </SectionWrapper>


        {/* Projects */}

        <SectionWrapper
          id="projects"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <ProjectsForm />
        </SectionWrapper>


        {/* Certifications */}

        <SectionWrapper
          id="certifications"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <CertificationsForm />
        </SectionWrapper>


        {/* Awards */}

        <SectionWrapper
          id="awards"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <AwardsForm />
        </SectionWrapper>
        {/* Languages */}
        <SectionWrapper
          id="languages"
          visibleSections={
            resumeData.visibleSections || []
          }
          onToggle={toggleSection}
        >
          <LanguagesForm />
        </SectionWrapper>
        {/* Actions */}

        <div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Preview CV
          </button>

          <button
            type="button"
            onClick={handleClearResume}
            className="w-full bg-red-500 text-white mt-2 px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Resume
          </button>
        </div>
      </div>
      {/* RIGHT PREVIEW */}

      <div
        className="sticky top-6 h-screen overflow-y-auto"
        id="resume"
      >

        <ResumeToolbar
          showRefresh
          showEdit={false}
          showDownload
          showDocx={false}
          showTemplate
          onTypography={() => setShowAppearanceSettings(true)}
          onColorChange={() => setShowAppearanceSettings(true)}
          onChangeTemplate={() =>
            setShowTemplateModal(true)
          }
          onPreview={handleNext}
        />


        <div className="resume-global-appearance" style={appearanceStyle}>
          <SelectedTemplate
            data={resumeData}
            theme={currentTheme}
          />
        </div>
      </div>

      {/* TEMPLATE MODAL */}

      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() =>
          setShowTemplateModal(false)
        }
        templates={templateOptions}
        selectedTemplate={
          selectedTemplate
        }
        onSelect={
          handleTemplateChange
        }
      />

      <AppearanceSettingsModal
        isOpen={showAppearanceSettings}
        onClose={() => setShowAppearanceSettings(false)}
        appearance={appearance}
        theme={currentTheme}
        onChange={(key, value) =>
          setAppearance((previous) => ({ ...previous, [key]: value }))
        }
        onReset={() => setAppearance(DEFAULT_RESUME_APPEARANCE)}
      />

    </div>
  );
}

export default ResumeBuilder;