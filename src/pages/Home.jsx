import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiZap,
  FiDownload,
} from "react-icons/fi";
import { useResume } from "../context/ResumeContext";

function Home() {

const { resumeData } = useResume();

console.log(
"GLOBAL RESUME DATA:",
resumeData
);

  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FiZap />
              Build your professional resume
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Build a Resume
              <span className="block text-blue-600">
                That Gets Noticed.
              </span>
            </h1>

            <p className="text-lg text-gray-600 mt-6 max-w-xl leading-8">
              Create a professional and ATS-friendly resume with real-time
              preview, customizable templates, and multiple download options.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">

              <button
                onClick={() => navigate("/ResumeOptions")}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
              >
                Create My Resume

                <FiArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={() => navigate("/ResumeOptions")}
                className="border border-gray-300 hover:border-gray-400 bg-white text-gray-700 px-7 py-3.5 rounded-lg font-semibold transition"
              >
                Upload Resume
              </button>

            </div>

            {/* Small Benefits */}
            <div className="flex flex-wrap gap-5 mt-8 text-sm text-gray-600">

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                ATS Friendly
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                Real-Time Preview
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                Multiple Formats
              </div>

            </div>

          </div>


          {/* Right Resume Preview */}
          <div className="relative hidden md:flex justify-center">

            {/* Background decoration */}
            <div className="absolute w-[420px] h-[420px] bg-blue-200 rounded-full blur-3xl opacity-30"></div>

            {/* Resume */}
            <div className="relative bg-white w-[390px] min-h-[500px] shadow-2xl rounded-xl border border-gray-200 p-8">

              {/* Resume Header */}
              <div className="border-b border-gray-200 pb-5">
                <div className="w-36 h-5 bg-gray-900 rounded mb-3"></div>

                <div className="w-24 h-3 bg-blue-500 rounded mb-4"></div>

                <div className="flex gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded"></div>
                  <div className="w-24 h-2 bg-gray-200 rounded"></div>
                  <div className="w-16 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>


              {/* Summary */}
              <div className="mt-6">
                <div className="w-20 h-3 bg-gray-800 rounded mb-3"></div>

                <div className="space-y-2">
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                </div>
              </div>


              {/* Experience */}
              <div className="mt-7">

                <div className="w-24 h-3 bg-gray-800 rounded mb-4"></div>

                <div className="flex justify-between mb-3">
                  <div>
                    <div className="w-28 h-3 bg-gray-600 rounded mb-2"></div>
                    <div className="w-20 h-2 bg-blue-400 rounded"></div>
                  </div>

                  <div className="w-16 h-2 bg-gray-200 rounded"></div>
                </div>

                <div className="space-y-2">
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                </div>

              </div>


              {/* Skills */}
              <div className="mt-7">

                <div className="w-14 h-3 bg-gray-800 rounded mb-4"></div>

                <div className="flex flex-wrap gap-2">

                  {[
                    "React",
                    "JavaScript",
                    "Next.js",
                    "TypeScript",
                    "CSS",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="bg-gray-900 text-white text-[9px] px-3 py-1.5 rounded"
                    >
                      {skill}
                    </div>
                  ))}

                </div>

              </div>


              {/* Floating Live Preview */}
              <div className="absolute -right-10 top-10 bg-white shadow-xl border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <FiZap className="text-green-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Resume
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    Live Preview
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="grid md:grid-cols-3 gap-5">

          <Feature
            icon={<FiFileText />}
            title="ATS Friendly"
            description="Build clean and professional resumes designed for modern hiring processes."
          />

          <Feature
            icon={<FiZap />}
            title="Real-Time Preview"
            description="See your resume update instantly while adding your information."
          />

          <Feature
            icon={<FiDownload />}
            title="Multiple Downloads"
            description="Export your resume using PDF, DOCX, image, or JSON options."
          />

        </div>

      </section>

    </div>
  );
}


function Feature({ icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-4">
        {icon}
      </div>

      <h3 className="font-bold text-gray-900 text-lg">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2 leading-6">
        {description}
      </p>

    </div>
  );
}

export default Home;