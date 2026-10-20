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
import MinimalTemplate from "../templates/Minimal/MinimalTemplate";

import { templateThemes } from "../templates/config/templateThemes";
import { templateOptions } from "../templates/config/templateOptions";

import ResumeToolbar from "../components/ResumeToolbar";
import TemplateModal from "../components/TemplateModal";
import ResumeEditorSidebar from "../components/ResumeEditorSidebar";
import AppearanceSettingsModal from "../components/AppearanceSettingsModal";
import ErrorBoundary from "../components/ErrorBoundary";
import SectionEditModal from "../components/SectionEditModal";

import { useResume } from "../context/ResumeContext";
import { initialResumeData } from "../data/initialResumeData";
import {
  applyAppearanceToTheme,
  DEFAULT_RESUME_APPEARANCE,
} from "../utils/resumeAppearance";

const sectionForms = {
  personalInfo: PersonalInfoForm,
  contactInfo: PersonalInfoForm,
  summary: SummaryForm,
  skills: SkillsForm,
  experience: ExperienceForm,
  education: EducationForm,
  projects: ProjectsForm,
  certifications: CertificationsForm,
  awards: AwardsForm,
  languages: LanguagesForm,
};

const sectionLabels = {
  personalInfo: "Personal Information",
  contactInfo: "Contact Information",
  summary: "Professional Summary",
  skills: "Skills",
  experience: "Work Experience",
  education: "Education",
  projects: "Projects",
  certifications: "Certifications",
  awards: "Honours & Awards",
  languages: "Languages",
};

function ResumeBuilder() {
  const navigate = useNavigate();

  const { resumeData, setResumeData, appearance, setAppearance } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("selectedTemplate") || "ats",
  );
  const [pageMode, setPageMode] = useState(
    localStorage.getItem("resumePageMode") || "multi",
  );
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAppearanceSettings, setShowAppearanceSettings] = useState(false);
  const [activeEditSection, setActiveEditSection] = useState(null);
  const [activeSection, setActiveSection] = useState("personalInfo");

  const templateMap = {
    ats: ATSFriendlyTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    executive: ProfessionalTemplate,
    minimal: MinimalTemplate,
  };

  const SelectedTemplate = templateMap[selectedTemplate] || ATSFriendlyTemplate;
  const ActiveSectionForm = sectionForms[activeEditSection];
  const templateTheme = templateThemes[selectedTemplate] || templateThemes.ats;
  const currentTheme = applyAppearanceToTheme(templateTheme, appearance);
  const appearanceStyle = {
    "--resume-font-family": appearance.fontFamily,
    "--resume-heading-font-family": appearance.headingFontFamily,
    "--resume-font-scale": appearance.fontScale,
  };
  // Save resume automatically
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);
  // Toggle section
  const toggleSection = (section) => {
    setResumeData((prev) => {
      const visibleSections = prev.visibleSections || [];
      return {
        ...prev,
        visibleSections: visibleSections.includes(section)
          ? visibleSections.filter((item) => item !== section)
          : [...visibleSections, section],
      };
    });
  };

  // Change template
  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    localStorage.setItem("selectedTemplate", templateId);
    localStorage.setItem(
      "selectedTheme",
      JSON.stringify(templateThemes[templateId] || templateThemes.ats),
    );
    setShowTemplateModal(false);
  };
  const handlePageModeChange = (mode) => {
    setPageMode(mode);
    localStorage.setItem("resumePageMode", mode);
  };
  // Clear resume
  const handleClearResume = () => {
    localStorage.removeItem("resumeData");
    setResumeData(initialResumeData);
  };

  const handleNext = () => {
    navigate("/download");
  };

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(390px,0.85fr)_minmax(0,1.65fr)]">
      <ResumeEditorSidebar
        resumeData={resumeData}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onToggleSection={toggleSection}
        pageMode={pageMode}
        onPageModeChange={handlePageModeChange}
        onPreview={handleNext}
        onClear={handleClearResume}
      />

      <div
        className="min-w-0 xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] xl:overflow-y-auto"
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
          onChangeTemplate={() => setShowTemplateModal(true)}
          onPreview={handleNext}
        />

        <div className="resume-global-appearance" style={appearanceStyle}>
          <ErrorBoundary name="Resume preview">
            <SelectedTemplate
              data={resumeData}
              theme={currentTheme}
              pageMode={pageMode}
              onEditSection={setActiveEditSection}
            />
          </ErrorBoundary>
        </div>
      </div>

      {/* TEMPLATE MODAL */}

      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        templates={templateOptions}
        selectedTemplate={selectedTemplate}
        onSelect={handleTemplateChange}
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

      <SectionEditModal
        isOpen={Boolean(activeEditSection)}
        title={sectionLabels[activeEditSection] || "Resume section"}
        onClose={() => setActiveEditSection(null)}
      >
        {ActiveSectionForm && <ActiveSectionForm />}
      </SectionEditModal>
    </div>
  );
}

export default ResumeBuilder;
