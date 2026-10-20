export function getResumeDateInputType(value) {
  return !value || /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
    ? "month"
    : "text";
}

export function formatResumeMonthYear(value) {
  if (!value) return "";

  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) return value;

  return new Date(Number(match[1]), Number(match[2]) - 1).toLocaleString(
    "en-US",
    { month: "short", year: "numeric" }
  );
}
