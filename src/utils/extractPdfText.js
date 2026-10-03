import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractPdfText = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  let fullText = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);

    const textContent = await page.getTextContent();

    let pageText = "";
    let lastY = null;

    textContent.items.forEach((item) => {
      const currentY = item.transform[5];

      if (lastY !== null && Math.abs(currentY - lastY) > 2) {
        pageText += "\n";
      } else if (pageText) {
        pageText += " ";
      }

      pageText += item.str;

      lastY = currentY;
    });

    fullText += pageText + "\n";
  }

  return fullText.trim();
};