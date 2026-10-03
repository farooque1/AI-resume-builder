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

function ATSFriendlyTemplate({ data, theme }) {
  const currentTheme = theme || templateThemes.ats;

  const visibleSections =
    data?.visibleSections || [
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
        header={
          <>
            <Header data={data} theme={currentTheme} />
            <ContactInfo data={data} theme={currentTheme} />
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
                  />
                ))
              : [
                  <ExperienceSection
                    key="experience"
                    data={data}
                    theme={currentTheme}
                    experienceItems={[]}
                  />,
                ]
            : []),
          ...(isSectionVisible("education")
            ? [<EducationSection key="education" data={data} theme={currentTheme} />]
            : []),
          ...(isSectionVisible("certifications")
            ? [<CertificationsSection key="certifications" data={data} theme={currentTheme} />]
            : []),
          ...(isSectionVisible("languages")
            ? [<LanguagesSection key="languages" data={data} theme={currentTheme} />]
            : []),
        ]}
        rightColumn={[
          ...(isSectionVisible("skills")
            ? [<SkillsSection key="skills" data={data} theme={currentTheme} />]
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
                  />
                ))
              : [<ProjectsSection key="projects" data={data} theme={currentTheme} projectItems={[]} />]
            : []),
          ...(isSectionVisible("awards")
            ? [<AwardsSection key="awards" data={data} theme={currentTheme} />]
            : []),
        ]}
      />
    </div>
  );
}

export default ATSFriendlyTemplate;