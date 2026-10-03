import { useResume } from "../context/ResumeContext";

function ProjectsForm() {
  const { resumeData, setResumeData } = useResume();

  // Update project
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => {
      const updatedProjects = [...prev.projects];

      updatedProjects[index] = {
        ...updatedProjects[index],
                [name]: value,
      };

      return {
        ...prev,
        projects: updatedProjects,
      };
    });
  };

  // Add project
  const addProject = () => {
    const newProject = {
      name: "",
      technologies: "",
      description: "",
    };

    setResumeData((prev) => ({
      ...prev,

      projects: [
        ...(prev.projects || []),
        newProject,
      ],
    }));
  };

  // Remove project
  const removeProject = (index) => {
    setResumeData((prev) => ({
      ...prev,

      projects: prev.projects.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border mb-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-sm font-semibold">
          Projects
        </h2>

        <button
          type="button"
          onClick={addProject}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          + Add Project
        </button>

      </div>

      {/* Projects */}
      {(resumeData.projects || []).map(
        (project, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-5 bg-gray-50"
          >

            {/* Project Header */}
            <div className="flex justify-between items-center mb-4">

              <span className="text-sm font-medium text-gray-500">
                Project {index + 1}
              </span>

              {resumeData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeProject(index)
                  }
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}

            </div>

            <div className="space-y-4">

              {/* Project Name */}
              <input
                type="text"
                name="name"
                value={project.name || ""}
                onChange={(e) =>
                  handleProjectChange(index, e)
                }
                placeholder="Project Title"
                className="w-full border rounded p-2"
              />

              {/* Technologies */}
              <input
                type="text"
                name="technologies"
                value={project.technologies || ""}
                onChange={(e) =>
                  handleProjectChange(index, e)
                }
                placeholder="Technologies Used e.g. React, Node.js, Tailwind"
                className="w-full border rounded p-2"
              />

              {/* Description */}
              <textarea
                name="description"
                value={project.description || ""}
                onChange={(e) =>
                  handleProjectChange(index, e)
                }
                placeholder="Project Description / Key Achievements"
                rows={4}
                className="w-full border rounded p-2 resize-none"
              />

            </div>

          </div>
        )
      )}

    </div>
  );
}

export default ProjectsForm;
