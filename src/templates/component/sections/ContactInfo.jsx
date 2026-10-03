import {
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa";

function ContactInfo({ data, theme }) {

  return (
    <div
      className="grid grid-cols-2 gap-4 py-4 text-xs"
      style={{
        borderBottom: '1px solid black',
        borderTop: '1px solid black',
        color: theme.secondary,
      }}
    >
      <div className="space-y-2">
        <p className="flex items-center gap-2">
          <FaEnvelope
            style={{ color: theme.accent }}
          />
          {data?.personalInfo?.email ||
            "farooque.shaikh@gmail.com"}
        </p>

        <p className="flex items-center gap-2">
          <FaMapMarkerAlt
            style={{ color: theme.accent }}
          />
          {data?.personalInfo?.location ||
            "MH, Mumbai"}
        </p>

        <p className="flex items-center gap-2 break-all">
          <FaGithub
            style={{ color: theme.accent }}
          />
          {data?.personalInfo?.github ||
            "github.com/farooque1"}
        </p>
      </div>

      <div className="space-y-2">
        <p className="flex items-center gap-2">
          <FaPhoneAlt
            style={{ color: theme.accent }}
          />
          {data?.personalInfo?.phone ||
            "+91 9876543210"}
        </p>

        <p className="flex items-center gap-2 break-all">
          <FaGlobe
            style={{ color: theme.accent }}
          />
          {data?.personalInfo?.portfolio ||
            "www.farooque.dev"}
        </p>
          <p className="flex items-center gap-2 break-all">
          <FaLinkedin
            style={{ color: theme.accent }}
          />
          {data?.personalInfo?.linkedin ||
            "www.farooque.dev"}
        </p>
      </div>
    </div>
  );
}

export default ContactInfo;