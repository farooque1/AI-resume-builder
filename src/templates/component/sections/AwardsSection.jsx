import PreviewEditButton from "../../../components/PreviewEditButton";

function AwardsSection({ data, theme, onEditSection }) {
  const awards = data?.awards || [];

  const validAwards = awards.filter((award) => award.title || award.year);

  if (validAwards.length === 0 && !onEditSection) return null;

  return (
    <section className="">
      <div className="flex items-center justify-between gap-2 border-b border-black pb-1">
        <h2
          className="text-[16px] font-bold uppercase tracking-wide"
          style={{ color: theme.primary }}
        >
          Honours & Awards
        </h2>
        <PreviewEditButton
          section="awards"
          label="Honours & Awards"
          onEditSection={onEditSection}
        />
      </div>

      <div className="space-y-2">
        {validAwards.map((award, index) => (
          <div key={index} className="flex justify-between items-baseline">
            <p
              className="font-semibold text-[14px]"
              style={{
                color: theme.primary,
              }}
            >
              {award.title || "Award Title / Achievement"}
            </p>

            {award.year && (
              <p
                className="text-[13px] font-medium"
                style={{
                  color: theme.secondary,
                }}
              >
                {award.year || 2026}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default AwardsSection;
