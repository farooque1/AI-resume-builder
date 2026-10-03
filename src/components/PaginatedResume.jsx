import { Fragment, useLayoutEffect, useRef, useState } from "react";
import A4Page from "./A4Page";

const PAGE_HEIGHT = 1122;
const PAGE_VERTICAL_PADDING = 91;
const PAGE_CONTENT_HEIGHT = PAGE_HEIGHT - PAGE_VERTICAL_PADDING * 2;

function PaginatedResume({ header, leftColumn, rightColumn, theme }) {
  const measureRef = useRef(null);
  const [pages, setPages] = useState([]);

  useLayoutEffect(() => {
    const container = measureRef.current;
    if (!container) return undefined;

    const measurePages = () => {
      const headerHeight =
        container.querySelector("[data-measure-header]")?.getBoundingClientRect().height ?? 0;
      const columns = ["left", "right"].map((side) => {
        const column = container.querySelector(`[data-measure-column="${side}"]`);
        return column ? Array.from(column.children) : [];
      });

      // Fill each side independently so content can continue in its own column.
      const splitColumn = (items) => {
        const splitPages = [];
        let currentPage = [];
        let currentHeight = 0;
        let availableHeight = PAGE_CONTENT_HEIGHT - headerHeight;

        items.forEach((item) => {
          const height = item.getBoundingClientRect().height;
          if (height === 0) return;

          if (currentHeight + height > availableHeight && currentPage.length) {
            splitPages.push(currentPage);
            currentPage = [];
            currentHeight = 0;
            availableHeight = PAGE_CONTENT_HEIGHT;
          }

          currentPage.push(Number(item.dataset.itemIndex));
          currentHeight += height;
        });

        if (currentPage.length) splitPages.push(currentPage);
        return splitPages;
      };

      const splitColumns = columns.map(splitColumn);
      const pageCount = Math.max(1, ...splitColumns.map((column) => column.length));
      const nextPages = Array.from({ length: pageCount }, (_, index) => ({
        left: splitColumns[0][index] || [],
        right: splitColumns[1][index] || [],
      }));

      setPages((previousPages) => {
        const isUnchanged =
          previousPages.length === nextPages.length &&
          previousPages.every(
            (page, index) =>
              ["left", "right"].every(
                (side) =>
                  page[side].length === nextPages[index][side].length &&
                  page[side].every(
                    (itemIndex, itemPosition) =>
                      itemIndex === nextPages[index][side][itemPosition]
                  )
              )
          );

        return isUnchanged ? previousPages : nextPages;
      });
    };

    measurePages();
    const observer = new ResizeObserver(measurePages);
    container.querySelectorAll("[data-measure-header], [data-item-index]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [header, leftColumn, rightColumn]);

  const columns = [leftColumn, rightColumn].map((items) =>
    (Array.isArray(items) ? items : [items]).filter(
      (item) => item !== null && item !== undefined && item !== false
    )
  );

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          width: "180mm",
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <div data-measure-header className="resume-page-item">
          {header}
        </div>
        <div className="grid grid-cols-2 gap-8">
          {columns.map((items, columnIndex) => (
            <div
              key={columnIndex}
              data-measure-column={columnIndex === 0 ? "left" : "right"}
              className="min-w-0"
            >
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  data-item-index={itemIndex}
                  className="resume-page-item"
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        {pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {pageIndex > 0 && (
              <div className="page-break-divider" role="separator" aria-label="Page break">
                <span>Page break</span>
              </div>
            )}
            <A4Page pageNumber={pageIndex + 1} theme={theme}>
              {pageIndex === 0 && <div className="resume-page-item">{header}</div>}
              <div className="grid grid-cols-2 gap-8">
                {["left", "right"].map((side, columnIndex) => (
                  <div key={side} className="min-w-0">
                    {page[side].map((itemIndex) => (
                      <div key={itemIndex} className="resume-page-item">
                        {columns[columnIndex][itemIndex]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </A4Page>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default PaginatedResume;
