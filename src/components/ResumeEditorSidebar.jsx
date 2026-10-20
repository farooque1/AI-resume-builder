import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiGlobe,
  FiHeart,
  FiUser,
  FiZap,
} from "react-icons/fi";
import ResumeLengthSelector from "./ResumeLengthSelector";
import PersonalInfoForm from "../forms/PersonalInfoForm";
import EducationForm from "../forms/EducationForm";
import SkillsForm from "../forms/SkillsForm";
import SummaryForm from "../forms/SummaryForm";
import ExperienceForm from "../forms/ExperienceForm";
import ProjectsForm from "../forms/ProjectForm";
import CertificationsForm from "../forms/CertificationsForm";
import AwardsForm from "../forms/AwardsForm";
import LanguagesForm from "../forms/LanguagesForm";

const sections = [
  { id: "personalInfo", label: "Personal info", icon: FiUser, required: true },
  { id: "summary", label: "Summary", icon: FiFileText },
  { id: "experience", label: "Experience", icon: FiBriefcase },
  { id: "education", label: "Education", icon: FiBookOpen },
  { id: "skills", label: "Skills", icon: FiZap },
  { id: "projects", label: "Projects", icon: FiHeart },
  { id: "certifications", label: "Certifications", icon: FiAward },
  { id: "awards", label: "Awards", icon: FiAward },
  { id: "languages", label: "Languages", icon: FiGlobe },
];

const sectionForms = {
  personalInfo: PersonalInfoForm,
  summary: SummaryForm,
  experience: ExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  certifications: CertificationsForm,
  awards: AwardsForm,
  languages: LanguagesForm,
};

function hasSectionContent(section, resumeData) {
  if (section === "personalInfo") {
    return Boolean(
      resumeData.personalInfo?.fullName || resumeData.personalInfo?.email,
    );
  }

  if (section === "summary") return Boolean(resumeData.summary?.trim());

  const value = resumeData[section];
  if (Array.isArray(value)) {
    return value.some((item) =>
      Object.values(item || {}).some((field) => Boolean(field)),
    );
  }
  if (typeof value === "string") return Boolean(value.trim());
  return false;
}

function ResumeEditorSidebar({
  resumeData,
  activeSection,
  onSelectSection,
  onToggleSection,
  pageMode,
  onPageModeChange,
  onPreview,
  onClear,
}) {
  const activeConfig = sections.find((section) => section.id === activeSection);
  const ActiveForm = sectionForms[activeSection] || PersonalInfoForm;
  const completeCount = sections.filter((section) =>
    hasSectionContent(section.id, resumeData),
  ).length;
  const completion = Math.round((completeCount / sections.length) * 100);
  const visibleSections = resumeData.visibleSections || [];

  return (
    <aside className="flex max-h-[calc(100vh-2rem)] min-h-[36rem] flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm xl:sticky xl:top-4">
      <header className="shrink-0 border-b border-gray-200 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Resume editor
            </p>
            <h1 className="mt-1 text-xl font-semibold text-gray-900">
              Build your CV
            </h1>
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">
            {completeCount}/{sections.length} complete
          </span>
        </div>
        <div
          aria-label={`Resume ${completion}% complete`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={completion}
          className="mt-3 h-1 overflow-hidden rounded-full bg-gray-100"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-[width]"
            style={{ width: `${completion}%` }}
          />
        </div>
        {/* <div className="mt-4">
          <ResumeLengthSelector value={pageMode} onChange={onPageModeChange} />
        </div> */}
      </header>

      <nav
        aria-label="Resume sections"
        className="grid shrink-0 grid-cols-2 gap-1 border-b border-gray-200 p-2 sm:grid-cols-3 xl:grid-cols-2"
      >
        {sections.map(({ id, label, icon: Icon, required }) => {
          const isActive = activeSection === id;
          const isVisible = required || visibleSections.includes(id);
          const isComplete = hasSectionContent(id, resumeData);

          return (
            <div className="flex min-w-0 items-center gap-1" key={id}>
              <button
                aria-pressed={isActive}
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-2 text-left text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!isVisible ? "opacity-50" : ""}`}
                onClick={() => onSelectSection(id)}
                type="button"
              >
                <Icon aria-hidden="true" className="shrink-0" size={14} />
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {isComplete && (
                  <span
                    aria-label="Completed"
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      isActive ? "bg-emerald-300" : "bg-emerald-600"
                    }`}
                  />
                )}
              </button>
              {!required && (
                <button
                  aria-label={`${isVisible ? "Hide" : "Show"} ${label} in resume`}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => onToggleSection(id)}
                  title={`${isVisible ? "Hide" : "Show"} ${label}`}
                  type="button"
                >
                  {isVisible ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                </button>
              )}
            </div>
          );
        })}
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-gray-500">Editing</p>
            <h2 className="text-base font-semibold text-gray-900">
              {activeConfig?.label || "Personal info"}
            </h2>
          </div>
          {activeSection !== "personalInfo" && (
            <span className="text-xs text-gray-500">
              {visibleSections.includes(activeSection)
                ? "Shown on resume"
                : "Hidden from resume"}
            </span>
          )}
        </div>
        <ActiveForm />
      </div>

      <footer className="grid shrink-0 grid-cols-2 gap-2 border-t border-gray-200 p-3">
        <button
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
          onClick={onPreview}
          type="button"
        >
          Preview & export
        </button>
        <button
          className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
          onClick={onClear}
          type="button"
        >
          Clear resume
        </button>
      </footer>
    </aside>
  );
}

export default ResumeEditorSidebar;
