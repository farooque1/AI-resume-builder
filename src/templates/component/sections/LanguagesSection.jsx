function LanguagesSection({
  data,
  theme,
}) {
  const languages =
    data?.languages || [];

  const validLanguages =
    languages.filter(
      (item) =>
        item.language ||
        item.proficiency
    );

  if (validLanguages.length === 0)
    return null;

  return (
    <section className="mt-4">
      <h2
        className="text-[16px] font-bold uppercase tracking-wide pb-1 mb-2"
        style={{
          color: theme.primary,
          borderBottom: `1px solid black`,
        }}
      >
        Languages
      </h2>

      <ul className="flex justify-start gap-2">
        {validLanguages.map((item, index) => (
          <li
            key={index}
            className="text-[13px]"
            style={{
              color: theme.secondary,
            }}
          >
            {item.language}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LanguagesSection;