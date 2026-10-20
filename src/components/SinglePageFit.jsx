import { useLayoutEffect, useRef, useState } from "react";
import A4Page from "./A4Page";

const PAGE_CONTENT_HEIGHT = 1122 - 45 * 2;

function SinglePageFit({ children, theme }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return undefined;

    const measure = () => {
      const nextHeight = content.scrollHeight;
      setContentHeight((previousHeight) =>
        previousHeight === nextHeight ? previousHeight : nextHeight,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [children]);

  const scale =
    contentHeight > PAGE_CONTENT_HEIGHT
      ? PAGE_CONTENT_HEIGHT / contentHeight
      : 1;

  return (
    <A4Page
      pageNumber={1}
      theme={theme}
      contentStyle={{ "--resume-page-scale": scale }}
    >
      <div
        className="resume-single-page-fit"
        style={{ height: `${contentHeight * scale}px` }}
      >
        <div ref={contentRef} className="resume-single-page-content">
          {children}
        </div>
      </div>
    </A4Page>
  );
}

export default SinglePageFit;
