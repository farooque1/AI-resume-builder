function EducationSection({ data, theme }) {
  const educations =
    data?.education?.length > 0
      ? data.education
      : [
          {
            degree: "Bachelor of Engineering",
            college: "Mumbai University",
            duration: "2017 - 2019",
          },
        ];
  return (
    <section className="avoid-break">
      <h2
        className="text-[16px] font-bold uppercase tracking-wide mb-1"
        style={{color: theme?.headerText}}>
        Education
      </h2>

      {educations.map((edu, index) => (
        <div key={index} className="avoid-break">
          <h3
            className="font-bold text-[12px]"
            style={{
              color: theme?.accent || theme?.primary,
            }}
          >
            {edu.degree || "B.E Computer Science"}
          </h3>

          <p
           className="font-bold text-[12px]"
            style={{
              color: theme?.secondary,
            }}
          >
            {edu.institution || "Mumbai University"}
          </p>

          <p
            className="text-xs italic"
            style={{
              color: theme?.date || theme?.secondary,
            }}
          >
            {edu.fromDate || "01/2018"} - {edu.toDate || "01/2018"}
          </p>
        </div>
      ))}
    </section>
  );
}

export default EducationSection;