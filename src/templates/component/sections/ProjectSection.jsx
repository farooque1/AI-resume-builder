import PreviewEditButton from "../../../components/PreviewEditButton";

function ProjectsSection({
  data,
  theme,
  projectItems = data.projects,
  showHeading = true,
  onEditSection,
}) {
  const projects =
    projectItems?.length > 0
      ? projectItems
      : [
          {
            title: "Resume Builder",
            techStack: "React JS, Tailwind CSS, Vite",
            description:
              "Built dynamic resume builder.\nReal-time preview.\nPDF export support.",
          },
        ];

  return (
    <section>
      {showHeading && (
        <div className="flex items-center justify-between gap-2 border-b border-black pb-1">
          <h2
            className="text-[16px] font-bold uppercase tracking-wide"
            style={{ color: theme.primary }}
          >
            Project Summary
          </h2>
          <PreviewEditButton
            section="projects"
            label="Projects"
            onEditSection={onEditSection}
          />
        </div>
      )}

      {projects.map((project, index) => (
        <div key={index} className="mb-1">
          <h3
            className="font-bold text-[14px]"
            style={{
              color: theme.primary,
            }}
          >
            {project.name || project.title || "Resume Builder"}
          </h3>
          <p
            className="inline-block rounded text-xs font-semibold"
            style={{
              color: "#c0b7b7",
            }}
          >
            Responsibilities
          </p>

          <ul className="text-sm">
            {(
              project.description ||
              "Built dynamic resume builder.\nReal-time preview.\nPDF export support."
            )
              .split("\n")
              .filter(Boolean)
              .slice(0, 3)
              .map((line, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span>-</span>
                  <span>{line}</span>
                </li>
              ))}
          </ul>

          {(project.techStack || project.technologies)?.trim() && (
            <>
              <p className="font-semibold text-xs my-1">Technologies & Tools</p>

              <div className="flex flex-wrap">
                {(project.techStack || project.technologies)
                  .split(",")
                  .filter((tech) => tech.trim() !== "")
                  .map((tech, index) => (
                    <span
                      key={index}
                      className="px-1 py-1 text-[12px] rounded border"
                      style={{
                        backgroundColor: "#374151",
                        color: "#FFFFFF",
                      }}
                    >
                      {tech.trim()}
                    </span>
                  ))}
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
}

export default ProjectsSection;
