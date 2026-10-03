function A4Page({ children, pageNumber, theme }) {
  return (
    <div
      className="a4-page"
      style={{
        backgroundColor: theme?.background || "#ffffff",
        color: theme?.primary || "#000000",
      }}
    >
      <div className="a4-page-content">
        {children}
      </div>

      <div className="a4-page-number">
        Page {pageNumber}
      </div>
    </div>
  );
}

export default A4Page;