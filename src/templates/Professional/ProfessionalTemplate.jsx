import Header from "../component/sections/Header";
import ContactInfo from "../component/sections/ContactInfo";
import ExperienceSection from "../component/sections/ExperienceSection";
import EducationSection from "../component/sections/EducationSection";
import SkillsSection from "../component/sections/SkillsSection";
import ProjectsSection from "../component/sections/ProjectSection";
import CertificationsSection from "../component/sections/CertificationsSection";
import AwardsSection from "../component/sections/AwardsSection";
import LanguagesSection from "../component/sections/LanguagesSection";

function ProfessionalTemplate({
  data,
  theme,
}) {
    console.log("theme=>",theme)
  return (
    <div
      className="bg-white p-8 max-w-[850px] mx-auto border-t-8"
      style={{
        borderTopColor: theme?.primary,
      }}
    >
      <div
        className="p-8 rounded-xl shadow-lg"
        style={{
          background: `linear-gradient(to right, ${theme?.primary}, ${theme?.secondary})`,
          color: "#fff",
        }}
      >
        <Header
          data={data}
          theme={theme}
        />
      </div>

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

      <SkillsSection
        data={data}
        theme={theme}
      />

      <CertificationsSection
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
    </div>
  );
}

export default ProfessionalTemplate;