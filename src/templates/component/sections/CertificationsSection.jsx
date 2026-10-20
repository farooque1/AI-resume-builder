import PreviewEditButton from "../../../components/PreviewEditButton";

function CertificationsSection({ data, theme, onEditSection }) {
  console.log("certifi data", data?.certifications);
  const certifications = data?.certifications || [];

  const validCertifications = certifications.filter(
    (cert) => cert.name || cert.issuer || cert.year,
  );

  if (validCertifications.length === 0 && !onEditSection) return null;

  return (
    <section className="">
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-black pb-1">
        <h2
          className="text-[16px] font-bold uppercase tracking-wide"
          style={{ color: theme.primary }}
        >
          Certifications
        </h2>
        <PreviewEditButton
          section="certifications"
          label="Certifications"
          onEditSection={onEditSection}
        />
      </div>

      <div className="space-y-2">
        {validCertifications.map((cert, index) => (
          <div key={index}>
            <p
              className="font-semibold text-[12px]"
              style={{
                color: theme.primary,
              }}
            >
              {cert.name || "Certification Name"}
            </p>

            <p
              className="text-[14px]"
              style={{
                color: theme.secondary,
              }}
            >
              {(cert.issuer && cert.issuer) || "shoshin school"}
              {cert.issuer && cert.year && " | "}
              {(cert.year && cert.year) || "2026"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CertificationsSection;
