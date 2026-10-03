import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import ResumeToolbar from "../components/ResumeToolbar";
import AppearanceSettingsModal from "../components/AppearanceSettingsModal";
import ATSFriendlyTemplate from "../templates/ATS/ATSFriendlyTemplate";
import ModernTemplate from "../templates/Modern/ModernTemplate";
import ProfessionalTemplate from "../templates/Professional/ProfessionalTemplate";
import { templateThemes } from "../templates/config/templateThemes";
import { useResume } from "../context/ResumeContext";
import {
  applyAppearanceToTheme,
  DEFAULT_RESUME_APPEARANCE,
} from "../utils/resumeAppearance";
import { useState } from "react";

function Download() {

  const resumeRef = useRef(null);
  const { resumeData, appearance, setAppearance } = useResume();
  const [showAppearanceSettings, setShowAppearanceSettings] = useState(false);

  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("resumeData")) || {};

  const selectedTemplate =
    localStorage.getItem("selectedTemplate") || "ats";
  const templateMap = {
    ats: ATSFriendlyTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
  };
  const SelectedTemplate =
    templateMap[selectedTemplate] || ATSFriendlyTemplate;
  const templateTheme =
    templateThemes[selectedTemplate] || templateThemes.ats;
  const theme = applyAppearanceToTheme(templateTheme, appearance);
  const fileName =
    data?.personalInfo?.name?.trim().replace(/\s+/g, "_") || "Resume";

  // PDF Download
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${fileName}_Resume`,
  });


  // Edit Resume
  const handleEdit = () => {
    navigate("/builder");
  };
  // PNG Download
  const handleDownloadPng = async () => {
    if (!resumeRef.current) return;
    try {
      const imageDataUrl = await toPng(resumeRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });
      const downloadLink = document.createElement("a");
      downloadLink.download = `${fileName}_Resume.png`;
      downloadLink.href = imageDataUrl;
      downloadLink.click();
    } catch (error) {
      console.error("PNG download failed:", error);
    }
  };
  // JSON Download
  const handleDownloadJson = () => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      const jsonBlob = new Blob([jsonData], {
        type: "application/json;charset=utf-8",
      });
      saveAs(jsonBlob, `${fileName}_Resume.json`);
    } catch (error) {
      console.error("JSON download failed:", error);
    }
  };
  // DOCX Download
  // const handleDownloadDocx = async () => {
  //   try {
  //     const personalInfo = data?.personalInfo || {};
  //     const experience = Array.isArray(data?.experience)
  //       ? data.experience
  //       : [];
  //     const education = Array.isArray(data?.education)
  //       ? data.education
  //       : [];
  //     const projects = Array.isArray(data?.projects)
  //       ? data.projects
  //       : [];
  //     const skills = Array.isArray(data?.skills)
  //       ? data.skills
  //       : [];
  //     const languages = Array.isArray(data?.languages)
  //       ? data.languages
  //       : [];
  //     const children = [];
  //     // Name
  //     children.push(
  //       new Paragraph({
  //         alignment: "center",
  //         heading: HeadingLevel.TITLE,
  //         children: [
  //           new TextRun({
  //             text: personalInfo?.name || "Resume",
  //             bold: true,
  //             size: 34,
  //           }),
  //         ],
  //       })
  //     );
  //     // Job Title
  //     if (personalInfo?.jobTitle) {
  //       children.push(
  //         new Paragraph({
  //           alignment: "center",
  //           children: [
  //             new TextRun({
  //               text: personalInfo.jobTitle,
  //               bold: true,
  //               size: 24,
  //             }),
  //           ],
  //         })
  //       );
  //     }
  //     // Contact Details
  //     const contactDetails = [
  //       personalInfo?.email,
  //       personalInfo?.phone,
  //       personalInfo?.location,
  //       personalInfo?.linkedin,
  //       personalInfo?.github,
  //     ]
  //       .filter(Boolean)
  //       .join(" | ");
  //     if (contactDetails) {
  //       children.push(
  //         new Paragraph({
  //           alignment: "center",
  //           children: [
  //             new TextRun({
  //               text: contactDetails,
  //               size: 20,
  //             }),
  //           ],
  //         })
  //       );
  //     }
  //     // Summary
  //     const summary =
  //       data?.summary ||
  //       data?.professionalSummary ||
  //       personalInfo?.summary;
  //     if (summary) {
  //       children.push(
  //         new Paragraph({
  //           heading: HeadingLevel.HEADING_1,
  //           children: [
  //             new TextRun({
  //               text: "Professional Summary",
  //               bold: true,
  //             }),
  //           ],
  //         }),
  //         new Paragraph({
  //           children: [
  //             new TextRun({
  //               text: summary,
  //             }),
  //           ],
  //         })
  //       );
  //     }
  //     // Skills
  //     if (skills.length > 0) {
  //       children.push(
  //         new Paragraph({
  //           heading: HeadingLevel.HEADING_1,
  //           children: [
  //             new TextRun({
  //               text: "Skills",
  //               bold: true,
  //             }),
  //           ],
  //         })
  //       );
  //       const formattedSkills = skills
  //         .map((skill) => {
  //           if (typeof skill === "string") {
  //             return skill;
  //           }
  //           return skill?.name || skill?.skill || "";
  //         })
  //         .filter(Boolean)
  //         .join(", ");
  //       if (formattedSkills) {
  //         children.push(
  //           new Paragraph({
  //             children: [
  //               new TextRun({
  //                 text: formattedSkills,
  //               }),
  //             ],
  //           })
  //         );
  //       }
  //     }
  //     // Experience
  //     if (experience.length > 0) {
  //       children.push(
  //         new Paragraph({
  //           heading: HeadingLevel.HEADING_1,
  //           children: [
  //             new TextRun({
  //               text: "Professional Experience",
  //               bold: true,
  //             }),
  //           ],
  //         })
  //       );
  //       experience.forEach((item) => {
  //         const duration = [
  //           item?.fromDate || item?.startDate,
  //           item?.currentCompany
  //             ? "Present"
  //             : item?.toDate || item?.endDate,
  //         ]
  //           .filter(Boolean)
  //           .join(" - ");
  //         children.push(
  //           new Paragraph({
  //             children: [
  //               new TextRun({
  //                 text:
  //                   item?.jobTitle ||
  //                   item?.position ||
  //                   item?.role ||
  //                   "",
  //                 bold: true,
  //                 size: 22,
  //               }),
  //             ],
  //           })
  //         );
  //         const companyLine = [
  //           item?.company,
  //           item?.location,
  //           duration,
  //         ]
  //           .filter(Boolean)
  //           .join(" | ");
  //         if (companyLine) {
  //           children.push(
  //             new Paragraph({
  //               children: [
  //                 new TextRun({
  //                   text: companyLine,
  //                   italics: true,
  //                 }),
  //               ],
  //             })
  //           );
  //         }
  //         const responsibilities =
  //           item?.points ||
  //           item?.responsibilities ||
  //           item?.description ||
  //           "";
  //         responsibilities
  //           .split("\n")
  //           .map((point) => point.trim())
  //           .filter(Boolean)
  //           .forEach((point) => {
  //             children.push(
  //               new Paragraph({
  //                 text: point.replace(/^[-•]\s*/, ""),
  //                 bullet: {
  //                   level: 0,
  //                 },
  //               })
  //             );
  //           });
  //       });
  //     }
  //     // Projects
  //     if (projects.length > 0) {
  //       children.push(
  //         new Paragraph({
  //           heading: HeadingLevel.HEADING_1,
  //           children: [
  //             new TextRun({
  //               text: "Projects",
  //               bold: true,
  //             }),
  //           ],
  //         })
  //       );
  //       projects.forEach((project) => {
  //         children.push(
  //           new Paragraph({
  //             children: [
  //               new TextRun({
  //                 text: project?.name || project?.title || "Project",
  //                 bold: true,
  //                 size: 22,
  //               }),
  //             ],
  //           })
  //         );
  //         const technologies =
  //           project?.techStack || project?.technologies;
  //         if (technologies) {
  //           children.push(
  //             new Paragraph({
  //               children: [
  //                 new TextRun({
  //                   text: "Technology & Tools: ",
  //                   bold: true,
  //                 }),
  //                 new TextRun({
  //                   text: Array.isArray(technologies)
  //                     ? technologies.join(", ")
  //                     : technologies,
  //                 }),
  //               ],
  //             })
  //           );
  //         }
  //         const projectDescription = project?.description || "";
  //         projectDescription
  //           .split("\n")
  //           .map((line) => line.trim())
  //           .filter(Boolean)
  //           .forEach((line) => {
  //             children.push(
  //               new Paragraph({
  //                 text: line.replace(/^[-•]\s*/, ""),
  //                 bullet: {
  //                   level: 0,
  //                 },
  //               })
  //             );
  //           });
  //       });
  //     }
  //     // Education
  //     if (education.length > 0) {
  //       children.push(
  //         new Paragraph({
  //           heading: HeadingLevel.HEADING_1,
  //           children: [
  //             new TextRun({
  //               text: "Education",
  //               bold: true,
  //             }),
  //           ],
  //         })
  //       );
  //       education.forEach((item) => {
  //         const educationTitle = [
  //           item?.degree,
  //           item?.fieldOfStudy,
  //         ]
  //           .filter(Boolean)
  //           .join(" in ");
  //         children.push(
  //           new Paragraph({
  //             children: [
  //               new TextRun({
  //                 text: educationTitle,
  //                 bold: true,
  //                 size: 22,
  //               }),
  //             ],
  //           })
  //         );
  //         const educationDetails = [
  //           item?.institution ||
  //           item?.college ||
  //           item?.university,
  //           item?.startDate,
  //           item?.endDate,
  //         ]
  //           .filter(Boolean)
  //           .join(" | ");
  //         if (educationDetails) {
  //           children.push(
  //             new Paragraph({
  //               children: [
  //                 new TextRun({
  //                   text: educationDetails,
  //                 }),
  //               ],
  //             })
  //           );
  //         }
  //       });
  //     }
  //     // Languages
  //     const validLanguages = languages.filter(
  //       (item) =>
  //         typeof item === "string"
  //           ? item.trim()
  //           : item?.language?.trim()
  //     );
  //     if (validLanguages.length > 0) {
  //       children.push(
  //         new Paragraph({
  //           heading: HeadingLevel.HEADING_1,
  //           children: [
  //             new TextRun({
  //               text: "Languages",
  //               bold: true,
  //             }),
  //           ],
  //         })
  //       );
  //       const languageText = validLanguages
  //         .map((item) => {
  //           if (typeof item === "string") {
  //             return item;
  //           }
  //           return item?.proficiency
  //             ? `${item.language} - ${item.proficiency}`
  //             : item.language;
  //         })
  //         .join(", ");
  //       children.push(
  //         new Paragraph({
  //           children: [
  //             new TextRun({
  //               text: languageText,
  //             }),
  //           ],
  //         })
  //       );
  //     }
  //     const document = new Document({
  //       sections: [
  //         {
  //           properties: {},
  //           children,
  //         },
  //       ],
  //     });
  //     const docxBlob = await Packer.toBlob(document);
  //     saveAs(docxBlob, `${fileName}_Resume.docx`);
  //   } catch (error) {
  //     console.error("DOCX download failed:", error);
  //   }
  // };


  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-2">
        <ResumeToolbar
          showRefresh={true}
          showEdit={true}
          showPreview={false}
          showTypography={true}
          showColor={true}
          showDownload={true}
          showDocx={false}
          onDownloadPdf={handlePrint}
          // onDownloadDocx={handleDownloadDoc}
          onDownloadPng={handleDownloadPng}
          onDownloadJson={handleDownloadJson}
          onEdit={handleEdit}
          onTypography={() => setShowAppearanceSettings(true)}
          onColorChange={() => setShowAppearanceSettings(true)}
        />
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100">
            <div ref={resumeRef} className="flex justify-center bg-white">
              <div
                className="resume-global-appearance w-full max-w-[900px]"
                style={{
                  "--resume-font-family": appearance.fontFamily,
                  "--resume-heading-font-family": appearance.headingFontFamily,
                  "--resume-font-scale": appearance.fontScale,
                }}
              >
                <SelectedTemplate data={resumeData} theme={theme} />
              </div>
            </div>
          </div>
        </div>
        <AppearanceSettingsModal
          isOpen={showAppearanceSettings}
          onClose={() => setShowAppearanceSettings(false)}
          appearance={appearance}
          theme={theme}
          onChange={(key, value) =>
            setAppearance((previous) => ({ ...previous, [key]: value }))
          }
          onReset={() => setAppearance(DEFAULT_RESUME_APPEARANCE)}
        />
      </div>
  );
}
export default Download;​
