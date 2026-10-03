function CertificationsSection({
  data,
  theme,
}) {
  console.log("certifi data",data?.certifications)
  const certifications =
    data?.certifications || [];

  const validCertifications =
    certifications.filter(
      (cert) =>
        cert.name ||
        cert.issuer ||
        cert.year
    );

  if (
    validCertifications.length === 0
  )
    return null;

  return (
    <section className="">
      <h2
        className="text-[16px] font-bold uppercase tracking-wide pb-1 mb-2"
        style={{
          color: theme.primary,
          borderBottom: `1px solid black`,
        }}
      >
        Certifications
      </h2>

      <div className="space-y-2">
        {validCertifications.map(
          (cert, index) => (
            <div key={index}>
              <p
                className="font-semibold text-[12px]"
                style={{
                  color: theme.primary,
                }}
              >
                {cert.name ||
                  "Certification Name"}
              </p>

              <p
                className="text-[14px]"
                style={{
                  color:
                    theme.secondary,
                }}
              >
                {cert.issuer &&
                  cert.issuer || "shoshin school"}
                {cert.issuer &&
                  cert.year &&
                  " | "}
                {cert.year &&
                  cert.year || "2026"}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default CertificationsSection;