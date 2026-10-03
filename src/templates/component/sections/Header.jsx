function Header({ data, theme }) {

  console.log("header data",data)
  const displayRole =
    data?.experience?.[0]?.role ||
    "Frontend Developer";

  return (
    <div className="pb-2 avoid-break" style={{borderBottom: `2px solid ${theme.border}`,}}>
      <h1 className="text-3xl font-bold tracking-tight"
        style={{color: theme.headerText,}}>
        {data?.personalInfo?.fullName ||"M. Farooque Shaikh"}
      </h1>
      <h2 className="text-1xl font-medium mt-1"
        style={{color: theme.headerSubText,}}>
        {data?.personalInfo?.jobTitle || "Senior Frontend Developer"}
      </h2>

      <p className="my-2 text-sm font-semibold leading-5 max-w-2xl"
        style={{color: theme.headerSubText,}}>
        {data?.summary ||"Frontend Developer with 5.5+ years of experience building scalable web applications using React.js, Next.js, TypeScript, Redux Toolkit and modern frontend technologies."}
      </p>
    </div>
  );
}

export default Header;