const fontOptions = [
  ["Arial, Helvetica, sans-serif", "Arial"],
  ["Georgia, serif", "Georgia"],
  ["'Times New Roman', serif", "Times New Roman"],
  ["'Trebuchet MS', sans-serif", "Trebuchet MS"],
  ["Verdana, sans-serif", "Verdana"],
];

const colorOptions = [
  ["primaryColor", "Primary / headings"],
  ["secondaryColor", "Secondary text"],
  ["accentColor", "Accent / dividers"],
  ["backgroundColor", "Page background"],
];

function AppearanceSettingsModal({
  isOpen,
  onClose,
  appearance,
  theme,
  onChange,
  onReset,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="appearance-settings-title"
        aria-modal="true"
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
        role="dialog"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="appearance-settings-title" className="text-xl font-semibold text-gray-900">
              Global appearance
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Apply font and color choices throughout your resume.
            </p>
          </div>
          <button
            aria-label="Close appearance settings"
            className="rounded px-2 text-xl text-gray-500 hover:bg-gray-100"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Font size
            <div className="mt-1 flex items-center gap-3">
              <input
                aria-label="Font size"
                className="w-full accent-blue-600"
                max="1.5"
                min="0.75"
                onChange={(event) => onChange("fontScale", Number(event.target.value))}
                step="0.05"
                type="range"
                value={appearance.fontScale}
              />
              <output className="w-12 text-right tabular-nums">
                {Math.round(appearance.fontScale * 100)}%
              </output>
            </div>
            <span className="mt-1 block text-xs font-normal text-gray-500">
              Scales resume text up or down without changing its relative sizes.
            </span>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Body font
            <select
              className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2"
              onChange={(event) => onChange("fontFamily", event.target.value)}
              value={appearance.fontFamily}
            >
              {fontOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Heading font
            <select
              className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2"
              onChange={(event) => onChange("headingFontFamily", event.target.value)}
              value={appearance.headingFontFamily}
            >
              {fontOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {colorOptions.map(([key, label]) => (
              <label
                className="flex items-center justify-between gap-3 rounded-md border border-gray-200 p-3 text-sm font-medium text-gray-700"
                key={key}
              >
                {label}
                <input
                  aria-label={label}
                  className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
                  onChange={(event) => onChange(key, event.target.value)}
                  type="color"
                  value={appearance[key] || theme[key.replace("Color", "").toLowerCase()] || "#111827"}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            onClick={onReset}
            type="button"
          >
            Reset to template defaults
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={onClose}
            type="button"
          >
            Done
          </button>
        </div>
      </section>
    </div>
  );
}

export default AppearanceSettingsModal;
