export const initialResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    jobTitle: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },

  summary: "",

  skills: [],

  experience: [
    {
      jobTitle: "",
      company: "",
      fromDate: "",
      toDate: "",
      currentCompany: false,
      location: "",
      points: "",
    },
  ],

  education: [
    {
      degree: "",
      institution: "",
      fromDate: "",
      toDate: "",
      location: "",
    },
  ],

  projects: [
    {
      name: "",
      technologies: "",
      description: "",
    },
  ],

  certifications: [
    {
      name: "",
      issuer: "",
      year: "",
    },
  ],

  awards: [
    {
      title: "",
      year: "",
    },
  ],

  languages: [
    {
      language: "",
    },
  ],

  visibleSections: [
    "summary",
    "skills",
    "experience",
    "education",
    "projects",
    "certifications",
    "awards",
    "languages",
  ],
};