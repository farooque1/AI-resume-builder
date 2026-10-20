export function normalizeResumeText(text) {
  return text
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[^\S\n]+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

export async function convertDocumentToText(file) {
  const fileName = file.name.toLowerCase();
  if (file.size > 20 * 1024 * 1024) {
    throw new Error("The document is larger than the 20 MB upload limit.");
  }

  if (file.type === "application/pdf" || fileName.endsWith(".pdf")) {
    const { extractPdfText } = await import("./extractPdfText");
    return normalizeResumeText(await extractPdfText(file));
  }

  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const mammoth = await import("mammoth/mammoth.browser.js");
    const result = await mammoth.extractRawText({
      arrayBuffer: await file.arrayBuffer(),
    });
    return normalizeResumeText(result.value);
  }

  throw new Error(
    "Choose a PDF or DOCX document. Legacy .doc files are not supported.",
  );
}
