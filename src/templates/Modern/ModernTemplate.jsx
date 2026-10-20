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

function ModernTemplate({ data, theme, pageMode = "multi", onEditSection }) {
  const content = (
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
          onEditSection={onEditSection}
        />

        <LanguagesSection
          data={data}
          theme={theme}
          onEditSection={onEditSection}
        />

        <AwardsSection
          data={data}
          theme={theme}
          onEditSection={onEditSection}
        />

        <CertificationsSection
          data={data}
          theme={theme}
          onEditSection={onEditSection}
        />
      </div>

      {/* Right Content */}
      <div
        className="w-[70%] p-6"
        style={{
          backgroundColor: theme?.background,
        }}
      >
        <Header data={data} theme={theme} onEditSection={onEditSection} />

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
      </div>
    </div>
  );

  return pageMode === "single" ? (
    <SinglePageFit theme={theme}>{content}</SinglePageFit>
  ) : (
    content
  );
}

export default ModernTemplate;
