const TooltipButton = ({
  label,
  onClick,
  children,
  className = "",
}) => {
  return (
    <div className="relative group flex items-center">
      <button
        type="button"
        onClick={onClick}
        className={className}
        aria-label={label}
      >
        {children}
      </button>

      <div
        className="
          absolute
          top-full
          left-1/2
          -translate-x-1/2
          mt-2
          px-2
          py-1
          bg-gray-900
          text-white
          text-xs
          rounded
          whitespace-nowrap
          opacity-0
          invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all
          duration-200
          pointer-events-none
          z-[100]
        "
      >
        {label}

        <div
          className="
            absolute
            bottom-full
            left-1/2
            -translate-x-1/2
            border-4
            border-transparent
            border-b-gray-900
          "
        />
      </div>
    </div>
  );
};

export default TooltipButton;