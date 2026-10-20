import PreviewEditButton from "../../../components/PreviewEditButton";

function SkillsSection({ data, theme, onEditSection }) {
  const fallbackSkills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Redux",
    "Node.js",
    "Express.js",
    "REST APIs",
    "GraphQL",
    "MySQL",
    "Git",
    "Docker",
    "AWS",
    "Tailwind CSS",
    "Material UI",
  ];

  const rawSkills = data?.skills;

  const skills = Array.from(
    new Set(
      (Array.isArray(rawSkills)
        ? rawSkills
        : typeof rawSkills === "string"
          ? rawSkills.split(",")
          : []
      )
        .map((skill) => skill?.trim())
        .filter(Boolean),
    ),
  );

  const displaySkills = skills.length > 0 ? skills : fallbackSkills;

  return (
    <section className="avoid-break">
      <div
        className="mt-1 flex items-center justify-between gap-2 border-b-1"
        style={{ borderColor: theme.border }}
      >
        <h2
          className="text-[18px] font-bold uppercase tracking-wide"
          style={{ color: theme.primary }}
        >
          Skills
        </h2>
        <PreviewEditButton
          section="skills"
          label="Skills"
          onEditSection={onEditSection}
        />
      </div>

      <div className="flex flex-wrap gap-1 my-2">
        {displaySkills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-[2px] rounded text-[12px] font-medium"
            style={{
              backgroundColor: "#374151",
              color: "#FFFFFF",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
