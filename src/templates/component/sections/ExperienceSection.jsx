function ExperienceSection({
  data,
  theme,
  experienceItems = data.experience,
  showHeading = true,
}) {

  const formatMonthYear = (date) => {
    if (!date) return "";

    const [year, month] = date.split("-");

    return new Date(year, month - 1).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section>
      {showHeading && (
        <h2
          className="text-[18px] font-bold uppercase tracking-wide pb-1"
          style={{
            color: theme.primary,
            borderBottom: `2px solid ${theme.border}`,
          }}
        >
          Work Experience
        </h2>
      )}

      {experienceItems?.map((exp, index) => (
        <div key={index} className="mb-4 avoid-break">
          <h3
            className="font-bold"
            style={{
              color: theme.primary,
            }}
          >
            {exp.role ||
              "Specialist - Software Engineering"}
          </h3>

          <p
            style={{
              color: theme.secondary,
            }}
          >
            {exp.company || "LTIMindtree"}
          </p>

          <div
            className="flex justify-between text-xs italic"
            style={{
              color: theme.secondary,
            }}
          ><div>
              <p className="text-xs text-gray-600">
                {formatMonthYear(exp.fromDate)} -{" "}
                {exp.currentCompany
                  ? "Present"
                  : formatMonthYear(exp.toDate)}
              </p>
            </div>

            <span>
              {exp.location || "Mumbai"}
            </span>
          </div>
          <p className="inline-block rounded text-xs font-semibold" style={{ color: "#c0b7b7", }}>
            Responsibilities
          </p>

          <ul className="ml-1 mt-2 text-xs space-y-1">
            {exp.points?.split("\n").map((point, idx) => (
              <li key={idx} className="flex">
                <span className="mr-2 font-bold">-</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

        </div>
      ))}
    </section>
  );
}

export default ExperienceSection;