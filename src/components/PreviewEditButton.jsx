import { FiEdit2 } from "react-icons/fi";

function PreviewEditButton({ section, label, onEditSection }) {
  if (!onEditSection) return null;

  return (
    <button
      aria-label={`Edit ${label}`}
      className="resume-preview-edit-control inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={() => onEditSection(section)}
      title={`Edit ${label}`}
      type="button"
    >
      <FiEdit2 aria-hidden="true" size={18} />
    </button>
  );
}

export default PreviewEditButton;
