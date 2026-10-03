import Header from "../component/sections/Header";
import ContactInfo from "../component/sections/ContactInfo";
import ExperienceSection from "../component/sections/ExperienceSection";
import EducationSection from "../component/sections/EducationSection";
import SkillsSection from "../component/sections/SkillsSection";
import ProjectsSection from "../component/sections/ProjectSection";
import CertificationsSection from "../component/sections/CertificationsSection";
import AwardsSection from "../component/sections/AwardsSection";
import LanguagesSection from "../component/sections/LanguagesSection";

function ModernTemplate({
  data,
  theme,
}) {
  return (
    <div className="bg-white max-w-[850px] mx-auto flex shadow-lg">

      {/* Left Sidebar */}
      <div
        className="w-[30%] text-white p-6"
        style={{
          background: `linear-gradient(
            180deg,
            ${theme?.primary},
            ${theme?.secondary}
          )`,
        }}
      >
        <SkillsSection
          data={data}
          theme={theme}
        />

        <LanguagesSection
          data={data}
          theme={theme}
        />

        <AwardsSection
          data={data}
          theme={theme}
        />

        <CertificationsSection
          data={data}
          theme={theme}
        />
      </div>

      {/* Right Content */}
      <div
        className="w-[70%] p-6"
        style={{
          backgroundColor:
            theme?.background,
        }}
      >
        <Header
          data={data}
          theme={theme}
        />

        <ContactInfo
          data={data}
          theme={theme}
        />

        <ExperienceSection
          data={data}
          theme={theme}
        />

        <ProjectsSection
          data={data}
          theme={theme}
        />

        <EducationSection
          data={data}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default ModernTemplate;