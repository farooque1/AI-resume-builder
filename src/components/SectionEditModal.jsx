function SectionEditModal({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="section-editor-title"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl sm:p-6"
        role="dialog"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2
            className="text-lg font-semibold text-gray-900"
            id="section-editor-title"
          >
            Edit {title}
          </h2>
          <button
            aria-label={`Close ${title} editor`}
            className="rounded px-2 text-xl leading-8 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        {children}

        <div className="mt-6 flex justify-end border-t border-gray-200 pt-4">
          <button
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
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

export default SectionEditModal;
