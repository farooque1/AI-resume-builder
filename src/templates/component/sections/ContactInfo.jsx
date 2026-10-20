import {
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa";
import PreviewEditButton from "../../../components/PreviewEditButton";

function ContactInfo({ data, theme, onEditSection }) {
  const contactColumns = [
    [
      { Icon: FaEnvelope, value: data?.personalInfo?.email },
      { Icon: FaMapMarkerAlt, value: data?.personalInfo?.location },
      { Icon: FaGithub, value: data?.personalInfo?.github },
    ],
    [
      { Icon: FaPhoneAlt, value: data?.personalInfo?.phone },
      { Icon: FaGlobe, value: data?.personalInfo?.portfolio },
      { Icon: FaLinkedin, value: data?.personalInfo?.linkedin },
    ],
  ];

  return (
    <div
      className="grid grid-cols-2 gap-4 py-2 text-sm"
      style={{
        borderBottom: "1px solid black",
        borderTop: "1px solid black",
        color: theme.secondary,
      }}
    >
      {/* <div className="col-span-2 flex justify-end">
        <PreviewEditButton
          section="contactInfo"
          label="Contact Information"
          onEditSection={onEditSection}
        />
      </div> */}
      {contactColumns.map((contacts, columnIndex) => (
        <div className="space-y-1" key={columnIndex}>
          {contacts.map(({ Icon, value }, contactIndex) =>
            value ? (
              <p
                className="flex items-center gap-2 break-all"
                key={contactIndex}
              >
                <Icon style={{ color: theme.accent }} />
                {value}
              </p>
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;
