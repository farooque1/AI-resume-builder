import Header from "../component/sections/Header";
import ContactInfo from "../component/sections/ContactInfo";
import ExperienceSection from "../component/sections/ExperienceSection";
import EducationSection from "../component/sections/EducationSection";
import SkillsSection from "../component/sections/SkillsSection";
import ProjectsSection from "../component/sections/ProjectSection";
import CertificationsSection from "../component/sections/CertificationsSection";
import AwardsSection from "../component/sections/AwardsSection";
import LanguagesSection from "../component/sections/LanguagesSection";
import SinglePageFit from "../../components/SinglePageFit";

function ProfessionalTemplate({
  data,
  theme,
  pageMode = "multi",
  onEditSection,
}) {
  const content = (
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
        <Header data={data} theme={theme} onEditSection={onEditSection} />
      </div>

      <ContactInfo data={data} theme={theme} onEditSection={onEditSection} />

      <ExperienceSection
        data={data}
        theme={theme}
        onEditSection={onEditSection}
      />

      <ProjectsSection
        data={data}
        theme={theme}
        onEditSection={onEditSection}
      />

      <EducationSection
        data={data}
        theme={theme}
        onEditSection={onEditSection}
      />

      <SkillsSection data={data} theme={theme} onEditSection={onEditSection} />

      <CertificationsSection
        data={data}
        theme={theme}
        onEditSection={onEditSection}
      />

      <LanguagesSection
        data={data}
        theme={theme}
        onEditSection={onEditSection}
      />

      <AwardsSection data={data} theme={theme} onEditSection={onEditSection} />
    </div>
  );

  return pageMode === "single" ? (
    <SinglePageFit theme={theme}>{content}</SinglePageFit>
  ) : (
    content
  );
}

export default ProfessionalTemplate;
