import Header from "../component/sections/Header";
import ContactInfo from "../component/sections/ContactInfo";
import ExperienceSection from "../component/sections/ExperienceSection";
import EducationSection from "../component/sections/EducationSection";
import SkillsSection from "../component/sections/SkillsSection";
import ProjectsSection from "../component/sections/ProjectSection";
import CertificationsSection from "../component/sections/CertificationsSection";
import AwardsSection from "../component/sections/AwardsSection";
import LanguagesSection from "../component/sections/LanguagesSection";

import { templateThemes } from "../../templates/config/templateThemes";
import PaginatedResume from "../../components/PaginatedResume";

function ATSFriendlyTemplate({
  data,
  theme,
  pageMode = "multi",
  onEditSection,
}) {
  const currentTheme = theme || templateThemes.ats;

  const visibleSections = data?.visibleSections || [
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "awards",
  ];

  const isSectionVisible = (id) => {
    return visibleSections.includes(id);
  };

  return (
    <div className="resume-preview-container">
      <PaginatedResume
        theme={currentTheme}
        pageMode={pageMode}
        header={
          <>
            <Header
              data={data}
              theme={currentTheme}
              onEditSection={onEditSection}
            />
            <ContactInfo
              data={data}
              theme={currentTheme}
              onEditSection={onEditSection}
            />
          </>
        }
        leftColumn={[
          ...(isSectionVisible("experience")
            ? data.experience?.length
              ? data.experience.map((experience, index) => (
                  <ExperienceSection
                    key={`experience-${index}`}
                    data={data}
                    theme={currentTheme}
                    experienceItems={[experience]}
                    showHeading={index === 0}
                    onEditSection={onEditSection}
                  />
                ))
              : [
                  <ExperienceSection
                    key="experience"
                    data={data}
                    theme={currentTheme}
                    experienceItems={[]}
                    onEditSection={onEditSection}
                  />,
                ]
            : []),
          ...(isSectionVisible("education")
            ? [
                <EducationSection
                  key="education"
                  data={data}
                  theme={currentTheme}
                  onEditSection={onEditSection}
                />,
              ]
            : []),
          ...(isSectionVisible("certifications")
            ? [
                <CertificationsSection
                  key="certifications"
                  data={data}
                  theme={currentTheme}
                  onEditSection={onEditSection}
                />,
              ]
            : []),
          ...(isSectionVisible("languages")
            ? [
                <LanguagesSection
                  key="languages"
                  data={data}
                  theme={currentTheme}
                  onEditSection={onEditSection}
                />,
              ]
            : []),
        ]}
        rightColumn={[
          ...(isSectionVisible("skills")
            ? [
                <SkillsSection
                  key="skills"
                  data={data}
                  theme={currentTheme}
                  onEditSection={onEditSection}
                />,
              ]
            : []),
          ...(isSectionVisible("projects")
            ? data.projects?.length
              ? data.projects.map((project, index) => (
                  <ProjectsSection
                    key={`project-${index}`}
                    data={data}
                    theme={currentTheme}
                    projectItems={[project]}
                    showHeading={index === 0}
                    onEditSection={onEditSection}
                  />
                ))
              : [
                  <ProjectsSection
                    key="projects"
                    data={data}
                    theme={currentTheme}
                    projectItems={[]}
                    onEditSection={onEditSection}
                  />,
                ]
            : []),
          ...(isSectionVisible("awards")
            ? [
                <AwardsSection
                  key="awards"
                  data={data}
                  theme={currentTheme}
                  onEditSection={onEditSection}
                />,
              ]
            : []),
        ]}
      />
    </div>
  );
}

export default ATSFriendlyTemplate;
