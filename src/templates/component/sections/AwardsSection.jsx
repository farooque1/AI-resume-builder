function AwardsSection({
  data,
  theme,
}) {
  const awards =
    data?.awards || [];

  const validAwards =
    awards.filter(
      (award) =>
        award.title ||
        award.year
    );

  if (validAwards.length === 0)
    return null;

  return (
    <section className="">
      <h2
        className="text-[16px] font-bold uppercase tracking-wide pb-1"
        style={{
          color: theme.primary,
          borderBottom: `1px solid black`,
        }}
      >
        Honours & Awards
      </h2>

      <div className="space-y-2">
        {validAwards.map(
          (award, index) => (
            <div
              key={index}
              className="flex justify-between items-baseline"
            >
              <p
                className="font-semibold text-[14px]"
                style={{
                  color:
                    theme.primary,
                }}
              >
                {award.title ||
                  "Award Title / Achievement"}
              </p>

              {award.year && (
                <p
                  className="text-[13px] font-medium"
                  style={{
                    color:
                      theme.secondary,
                  }}
                >
                  {award.year || 2026}
                </p>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default AwardsSection;