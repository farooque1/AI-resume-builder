import { formatResumeMonthYear } from "../../../utils/resumeDate";
import PreviewEditButton from "../../../components/PreviewEditButton";

function ExperienceSection({
  data,
  theme,
  experienceItems = data.experience,
  showHeading = true,
  onEditSection,
}) {
  return (
    <section>
      {showHeading && (
        <div
          className="mt-1 flex items-center justify-between gap-5 border-b-1"
          style={{ borderColor: theme.border }}
        >
          <h2
            className="text-[18px] font-bold uppercase tracking-wide"
            style={{ color: theme.primary }}
          >
            Work Experience
          </h2>
          <PreviewEditButton
            section="experience"
            label="Work Experience"
            onEditSection={onEditSection}
          />
        </div>
      )}

      {experienceItems?.map((exp, index) => {
        const dateRange = [
          formatResumeMonthYear(exp.fromDate),
          exp.currentCompany ? "Present" : formatResumeMonthYear(exp.toDate),
        ]
          .filter(Boolean)
          .join(" - ");

        return (
          <div key={index} className="mb-1 avoid-break">
            {(exp.jobTitle || exp.role) && (
              <h3
                className="font-bold"
                style={{
                  color: theme.primary,
                }}
              >
                {exp.jobTitle || exp.role}
              </h3>
            )}

            {exp.company && (
              <p style={{ color: theme.secondary }}>{exp.company}</p>
            )}

            {(dateRange || exp.location) && (
              <div
                className="flex justify-between text-xs italic"
                style={{
                  color: theme.secondary,
                }}
              >
                {dateRange && (
                  <p className="text-xs text-gray-600">{dateRange}</p>
                )}
                {exp.location && <span>{exp.location}</span>}
              </div>
            )}

            {exp.points && (
              <>
                <p
                  className="inline-block rounded text-xs font-semibold"
                  style={{ color: "#c0b7b7" }}
                >
                  Responsibilities
                </p>
                <ul className="text-sm space-y-1">
                  {exp.points.split("\n").map((point, idx) => (
                    <li key={idx} className="flex">
                      <span className="mr-1 font-bold">-</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default ExperienceSection;
