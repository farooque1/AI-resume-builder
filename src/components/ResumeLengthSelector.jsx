const modes = [
  { id: "single", label: "One page" },
  { id: "multi", label: "Multiple pages" },
];

function ResumeLengthSelector({ value, onChange }) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="mr-2 text-sm font-semibold text-gray-700">
        Resume length
      </legend>
      <div className="inline-flex rounded-md border border-gray-300 p-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            aria-pressed={value === mode.id}
            onClick={() => onChange(mode.id)}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              value === mode.id
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default ResumeLengthSelector;
