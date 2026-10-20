import PreviewEditButton from "../../../components/PreviewEditButton";

function Header({ data, theme, onEditSection }) {
  console.log("header data", data);
  const displayRole = data?.experience?.[0]?.role || "Frontend Developer";

  return (
    <div
      className="avoid-break"
      style={{ borderBottom: `2px solid ${theme.border}` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: theme.headerText }}
          >
            {data?.personalInfo?.fullName || "M. Farooque Shaikh"}
          </h1>
          <h2
            className="text-1xl font-medium"
            style={{ color: theme.headerSubText }}
          >
            {data?.personalInfo?.jobTitle || "Senior Frontend Developer"}
          </h2>
        </div>
        <PreviewEditButton
          section="personalInfo"
          label="Personal Information"
          onEditSection={onEditSection}
        />
      </div>

      <div className="flex items-start justify-between gap-2">
        <p
          className="my-1 text-sm font-semibold leading-4"
          style={{ color: theme.headerSubText }}
        >
          {data?.summary ||
            "Frontend Developer with 5.5+ years of experience building scalable web applications using React.js, Next.js, TypeScript, Redux Toolkit and modern frontend technologies."}
        </p>
        <PreviewEditButton
          section="summary"
          label="Professional Summary"
          onEditSection={onEditSection}
        />
      </div>
    </div>
  );
}

export default Header;
