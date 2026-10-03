import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Login() {
  const navigate = useNavigate();

  const handleGuest = () => {
    navigate("/download");
  };

  const handleLogin = () => {
    // Future Login Page
    navigate("/auth");
  };

  return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">

          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-4xl">📄</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Download Resume
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Your resume is ready 🎉
            <br />
            Download it as a guest or create an account to save and manage multiple resumes.
          </p>

          {/* Guest Download */}
          <button
            onClick={handleGuest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
          >
            Continue as Guest
          </button>

          <div className="my-5 flex items-center">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Login */}
          <button
            onClick={handleLogin}
            className="w-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 py-3 rounded-lg font-medium transition"
          >
            Login / Register
          </button>

          {/* Benefits */}
          <div className="mt-8 text-left bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-3">
              Benefits of Creating an Account
            </h3>

            <ul className="text-sm text-gray-600 space-y-2">
              <li>✅ Save resumes in cloud</li>
              <li>✅ Create multiple resumes</li>
              <li>✅ Manage templates</li>
              <li>✅ Download anytime</li>
              <li>✅ Track resume versions</li>
            </ul>
          </div>

        </div>
      </div>
  );
}

export default Login;