function DetailCard({ lion }) {
  const partClassName = `part-label part-${lion.part.toLowerCase()}`;

  return (
    <article className="detail-card">
      <header className="detail-card-header">
        <h2>{lion.name}</h2>
        <strong className={partClassName}>{lion.part}</strong>
        <p>{lion.organization}</p>
      </header>

      <section className="detail-section">
        <h3>자기소개</h3>
        <p>{lion.introduction}</p>
      </section>

      <section className="detail-section">
        <h3>연락처</h3>
        <ul>
          <li>Email: {lion.contact.email}</li>
          <li>Phone: {lion.contact.phone}</li>
          <li>
            <a href={lion.contact.website} target="_blank" rel="noreferrer">
              {lion.contact.website}
            </a>
          </li>
        </ul>
      </section>

      <section className="detail-section">
        <h3>관심 기술</h3>
        <ul>
          {lion.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h3>한 마디</h3>
        <p>{lion.comment}</p>
      </section>
    </article>
  );
}

export default DetailCard;