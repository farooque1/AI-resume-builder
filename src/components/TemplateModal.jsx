import TemplatePreview from "./TemplatePreview";

const TemplateModal = ({
  isOpen,
  onClose,
  templates = [],
  selectedTemplate,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-black/50
        backdrop-blur-sm
        flex items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          bg-white
          w-full
          max-w-4xl
          rounded-2xl
          shadow-2xl
          p-6
          max-h-[90vh]
          overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Change Template
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a template to instantly update your resume.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9 h-9
              rounded-full
              flex
              items-center
              justify-center
              text-gray-500
              hover:text-black
              hover:bg-gray-100
              transition
              text-xl
            "
          >
            ×
          </button>
        </div>

        {/* Templates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {templates.map((template) => {
            const isSelected =
              selectedTemplate === template.id;

            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onSelect(template.id)}
                className={`
                  relative
                  text-left
                  border-2
                  rounded-xl
                  overflow-hidden
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-lg

                  ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-400"
                  }
                `}
              >
                {/* Selected Badge */}
                {isSelected && (
                  <span
                    className="
                      absolute
                      top-3
                      right-3
                      z-10
                      bg-blue-600
                      text-white
                      text-[11px]
                      font-semibold
                      px-3
                      py-1
                      rounded-full
                    "
                  >
                    Selected
                  </span>
                )}

                {/* Template Preview */}
                <TemplatePreview type={template.id} />

                {/* Information */}
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>

                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="
              px-5 py-2
              border
              border-gray-300
              rounded-lg
              text-sm
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;