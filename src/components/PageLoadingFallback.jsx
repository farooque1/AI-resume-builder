function PageLoadingFallback() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-5xl space-y-5 py-8"
      role="status"
    >
      <span className="sr-only">Loading page...</span>
      <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="h-5 w-1/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-5 h-10 w-full animate-pulse rounded bg-gray-100" />
        <div className="mt-3 h-10 w-full animate-pulse rounded bg-gray-100" />
        <div className="mt-3 h-10 w-2/3 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default PageLoadingFallback;
