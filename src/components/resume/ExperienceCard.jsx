function ExperienceCard({ exp }) {
  return (
    <div>
      <h4>{exp.role}</h4>
      <p>{exp.company}</p>

      <ul>
        {exp.points
          ?.split("\n")
          .map((point, index) => (
            <li key={index}>{point}</li>
          ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;