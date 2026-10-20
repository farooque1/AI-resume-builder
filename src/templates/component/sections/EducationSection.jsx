import { formatResumeMonthYear } from "../../../utils/resumeDate";
import PreviewEditButton from "../../../components/PreviewEditButton";

function EducationSection({ data, theme, onEditSection }) {
  const educations = data?.education || [];

  return (
    <section className="avoid-break">
      <div
        className="mb-2 flex items-center justify-between gap-2 border-b pb-1"
        style={{ borderColor: theme?.primary || "#1e3a8a" }}
      >
        <h2
          className="text-[16px] font-bold uppercase tracking-wide"
          style={{ color: theme?.headerText }}
        >
          Education
        </h2>
        <PreviewEditButton
          section="education"
          label="Education"
          onEditSection={onEditSection}
        />
      </div>

      <div className="space-y-1">
        {educations.map((edu, index) => {
          const graduationDate = formatResumeMonthYear(
            edu.toDate || edu.fromDate,
          );

          return (
            <div
              key={index}
              className="avoid-break grid grid-cols-[1fr_auto] items-start gap-x-4"
            >
              <div className="min-w-0">
                {edu.degree && (
                  <span
                    className="text-[12px] font-bold"
                    style={{
                      color: theme?.accent || theme?.primary || "#111827",
                    }}
                  >
                    {edu.degree}
                  </span>
                )}

                {edu.institution && (
                  <>
                    {edu.degree && " "}
                    <span
                      className="text-[12px] font-normal"
                      style={{ color: theme?.secondary || "#111827" }}
                    >
                      – {edu.institution}
                    </span>
                  </>
                )}
              </div>

              {graduationDate && (
                <span
                  className="whitespace-nowrap text-right text-[12px] italic"
                  style={{
                    color: theme?.date || theme?.secondary || "#111827",
                  }}
                >
                  {graduationDate}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EducationSection;
