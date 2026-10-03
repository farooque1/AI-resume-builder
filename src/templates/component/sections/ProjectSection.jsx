function ProjectsSection({
  data,
  theme,
  projectItems = data.projects,
  showHeading = true,
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
        <h2
          className="text-[16px] font-bold uppercase tracking-wide mb-4 pb-1"
          style={{
            color: theme.primary,
            borderBottom: `1px solid black`,
          }}
        >
          Project Summary
        </h2>
      )}

      {projects.map((project, index) => (
        <div key={index} className="mb-3">
          <h3
            className="font-bold text-[15px]"
            style={{
              color: theme.primary,
            }}
          >
            {project.title || "Resume Builder"}
          </h3>
          <p
            className="inline-block rounded text-xs font-semibold"
            style={{
              color: "#c0b7b7",
            }}
          >
            Responsibilities
          </p>

          <ul className="ml-1 mt-1 text-xs">
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
              <p className="font-semibold text-xs mb-1">Technologies & Tools</p>

              <div className="flex flex-wrap gap-1">
                {(project.techStack || project.technologies)
                  .split(",")
                  .filter((tech) => tech.trim() !== "")
                  .map((tech, index) => (
                    <span
                      key={index}
                      className="px-1 py-1 text-[10px] rounded border"
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