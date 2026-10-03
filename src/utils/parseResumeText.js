export const parseResumeText = (text) => {
    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    // EMAIL
    const email =
        text.match(
            /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
        )?.[0] || "";


    // PHONE
    const phone =
        text.match(
            /(?:\+91[\s-]?)?[6-9]\d{9}/
        )?.[0] || "";


    // GITHUB
    const github =
        lines.find((line) =>
            line.toLowerCase().includes("github.com/")
        ) || "";


    // LINKEDIN
    const linkedin =
        lines.find((line) =>
            line.toLowerCase().includes("linkedin.com/")
        ) || "";


    // PORTFOLIO / WEBSITE
    const portfolio =
        lines.find((line) => {
            const value = line.toLowerCase();

            return (
                (value.includes("www.") ||
                    value.startsWith("http://") ||
                    value.startsWith("https://")) &&
                !value.includes("github.com") &&
                !value.includes("linkedin.com")
            );
        }) || "";


    // NAME
    // Usually first meaningful line in this resume format
    const fullName = lines[0] || "";


    // JOB TITLE
    // Don't accept values such as "1"
    const possibleJobTitle = lines[1] || "";

    const jobTitle =
        possibleJobTitle.length > 2 &&
            !/^\d+$/.test(possibleJobTitle)
            ? possibleJobTitle
            : "";


    // LOCATION
    // Look before WORK EXPERIENCE
    const workIndex = lines.findIndex((line) =>
        /^(work experience|professional experience|experience)$/i.test(line)
    );

    const headerLines =
        workIndex !== -1
            ? lines.slice(0, workIndex)
            : lines.slice(0, 10);

    const location =
        headerLines.find((line) => {
            if (line === fullName) return false;
            if (line === jobTitle) return false;
            if (line.includes("@")) return false;
            if (line === phone) return false;

            const lower = line.toLowerCase();

            if (lower.includes("github")) return false;
            if (lower.includes("linkedin")) return false;
            if (lower.includes("www.")) return false;

            // Example: "MH, Mumbai"
            return line.includes(",") && line.length < 50;
        }) || "";

    const projectHeadings = [
        "PROJECTS",
        "PROJECT SUMMARY",
        "PROJECT EXPERIENCE",
        "PERSONAL PROJECTS",
    ];



    const summaryStartIndex = 2;

    const emailIndex = lines.findIndex((line) => line.includes(email));

    const summaryLines = lines.slice(summaryStartIndex, emailIndex);

    const skillsStartIndex = lines.findIndex((line) => line.toUpperCase() === "SKILLS");

    const skillsEndIndex = lines.findIndex(
        (line) =>
            projectHeadings.includes(
                line.toUpperCase()
            )
    );

    let skillLines = [];

    if (
        skillsStartIndex !== -1 &&
        skillsEndIndex !== -1 &&
        skillsEndIndex > skillsStartIndex
    ) {
        skillLines = lines.slice(
            skillsStartIndex + 1,
            skillsEndIndex
        );
    }

    const skills = skillLines
        .flatMap((line) => line.split(/\s{2,}/))
        .map((skill) => skill.trim())
        .filter(Boolean);

        
        const summary = summaryLines.join(" ");
        
        const educationHeadings = [
        "EDUCATION",
        "EDUCATIONAL QUALIFICATION",
        "EDUCATION QUALIFICATION",
        "ACADEMIC QUALIFICATION",
        "ACADEMIC BACKGROUND",
        ];

    const experienceHeadings = [
        "WORK EXPERIENCE",
        "EXPERIENCE",
        "PROFESSIONAL EXPERIENCE",
        "EMPLOYMENT HISTORY",
    ];

    const experienceStartIndex = lines.findIndex((line) =>
        experienceHeadings.includes(line.toUpperCase())
    );

    const skillsHeadings = [
        "SKILLS",
        "TECHNICAL SKILLS",
        "SKILLS SUMMARY",
        "CORE SKILLS",
    ];

    const experienceEndIndex = lines.findIndex((line) =>
        skillsHeadings.includes(line.toUpperCase())
    );
    let experienceLines = [];
    if (
        experienceStartIndex !== -1 &&
        experienceEndIndex !== -1 &&
        experienceEndIndex > experienceStartIndex
    ) {
        experienceLines = lines.slice(
            experienceStartIndex + 1,
            experienceEndIndex
        );
    }
    // Detect date line
    const isDateLine = (line) => {
        return (
            /\b\d{1,2}\/\d{4}\b/.test(line) ||
            /\b\d{4}\b/.test(line)
        );
    };
    // Find job date indexes
    const dateIndexes = [];
    experienceLines.forEach((line, index) => {
        if (isDateLine(line)) {
            dateIndexes.push(index);
        }
    });
    const experience = [];
    dateIndexes.forEach((dateIndex, index) => {
        const expJobTitle =
            experienceLines[dateIndex - 2] || "";
        const company =
            experienceLines[dateIndex - 1] || "";
        const dateAndLocation =
            experienceLines[dateIndex] || "";
        // Description starts after date
        const descriptionStart =
            dateIndex + 1;
        // Next job date
        const nextDateIndex =
            dateIndexes[index + 1];
        let descriptionEnd;
        if (nextDateIndex !== undefined) {
            descriptionEnd =
                nextDateIndex - 2;
        } else {

            descriptionEnd =
                experienceLines.length;
        }
        const descriptionLines =
            experienceLines.slice(
                descriptionStart,
                descriptionEnd
            );
        // Join PDF broken lines
        const description =
            descriptionLines.join(" ");
        // Get date
        const dateMatch =
            dateAndLocation.match(
                /\b\d{1,2}\/\d{4}\b|\b\d{4}\b/
            );

        const startDate =
            dateMatch?.[0] || "";
        // Remove date to get location
        const expLocation =
            dateAndLocation
                .replace(startDate, "")
                .trim();
        experience.push({
            jobTitle: expJobTitle,
            company,
            startDate,
            endDate: "",
            location: expLocation,
            currentCompany: false,
            points: description,
        });

    });

    const projects = [];

    const techStackIndexes = [];

    let projectLines = [];

    const projectStartIndex = lines.findIndex((line) =>
    projectHeadings.includes(
        line.toUpperCase()
    )
);

//     const educationHeadings = [
//     "EDUCATION",
//     "EDUCATIONAL QUALIFICATION",
//     "ACADEMIC QUALIFICATION",
// ];

const projectEndIndex = lines.findIndex((line) =>
    educationHeadings.includes(
        line.toUpperCase()
    )
);

if (
    projectStartIndex !== -1 &&
    projectEndIndex !== -1 &&
    projectEndIndex > projectStartIndex
) {
    projectLines = lines.slice(
        projectStartIndex + 1,
        projectEndIndex
    );

}
    projectLines.forEach((line, index) => {
        if (
            line
                .toLowerCase()
                .startsWith("tech stack:")
        ) {
            techStackIndexes.push(index);
        }
    });
const isDescriptionLine = (line) => {
    return /^(Developed|Designed|Implemented|Created|Built|Refactored|Optimized|Integrated)/i.test(
        line
    );
};

    techStackIndexes.forEach(
        (techIndex, index) => {

            const projectName =
                projectLines[techIndex - 1] || "";
            const nextTechIndex =
                techStackIndexes[index + 1];
            const projectEnd =
                nextTechIndex !== undefined
                    ? nextTechIndex - 1
                    : projectLines.length;
            const currentProjectLines =
                projectLines.slice(
                    techIndex,
                    projectEnd
                );
            const descriptionStart =
                currentProjectLines.findIndex(
                    isDescriptionLine
                );
            let technologyLines = [];
            let descriptionLines = [];
            if (descriptionStart !== -1) {
                technologyLines =
                    currentProjectLines.slice(
                        0,
                        descriptionStart
                    );
                descriptionLines =
                    currentProjectLines.slice(
                        descriptionStart
                    );
            }
            const technologies =
                technologyLines
                    .join(" ")
                    .replace(
                        /^Tech Stack:\s*/i,
                        ""
                    )
                    .trim();
            const description =
                descriptionLines
                    .join(" ")
                    .trim();
            projects.push({
                name: projectName,
                technologies,
                description,
                liveUrl: "",
                githubUrl: "",
            });
        }
    );


const educationStartIndex = lines.findIndex((line) =>
  educationHeadings.includes(
    line.toUpperCase()
  )
);


let educationLines = [];

if (educationStartIndex !== -1) {
  educationLines = lines.slice(
    educationStartIndex + 1
  );
}

const techStackIndex = educationLines.findIndex(
  (line) =>
    line
      .toLowerCase()
      .startsWith("tech stack:")
);

if (techStackIndex !== -1) {
  educationLines = educationLines.slice(
    0,
    techStackIndex - 1
  );
}

const educationDateIndexes = [];

educationLines.forEach(
  (line, index) => {

    if (isDateLine(line)) {
      educationDateIndexes.push(index);
    }

  }
);

educationDateIndexes.forEach(
  (dateIndex) => {

    const degree =
      educationLines[dateIndex - 2];

    const institution =
      educationLines[dateIndex - 1];

    const date =
      educationLines[dateIndex];
  }
);

const education = [];

educationDateIndexes.forEach(
  (dateIndex) => {

    const degree =
      educationLines[dateIndex - 2] || "";

    const institution =
      educationLines[dateIndex - 1] || "";

    const date =
      educationLines[dateIndex] || "";


    education.push({
      degree,
      institution,
      startDate: date,
      endDate: "",
      location: "",
      description: "",
    });

  }
);



    return {
        personalInfo: {
            fullName,
            jobTitle,
            email,
            phone,
            location,
            linkedin,
            github,
            portfolio,
        },

        summary,

        skills,

        experience,

        projects,

        education,
    };
};