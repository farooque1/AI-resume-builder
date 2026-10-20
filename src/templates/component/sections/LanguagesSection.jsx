import PreviewEditButton from "../../../components/PreviewEditButton";

function LanguagesSection({ data, theme, onEditSection }) {
  const languages = data?.languages || [];

  const validLanguages = languages.filter(
    (item) => item.language || item.proficiency,
  );

  if (validLanguages.length === 0 && !onEditSection) return null;

  return (
    <section className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-black pb-1">
        <h2
          className="text-[16px] font-bold uppercase tracking-wide"
          style={{ color: theme.primary }}
        >
          Languages
        </h2>
        <PreviewEditButton
          section="languages"
          label="Languages"
          onEditSection={onEditSection}
        />
      </div>

      <ul className="flex justify-start gap-2">
        {validLanguages.map((item, index) => (
          <li
            key={index}
            className="text-[13px]"
            style={{
              color: theme.secondary,
            }}
          >
            {item.proficiency
              ? `${item.language} (${item.proficiency})`
              : item.language}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LanguagesSection;
