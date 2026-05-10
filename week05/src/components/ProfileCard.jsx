function ProfileCard({ lion }) {
  const cardClassName = lion.isMe
    ? "profile-card my-card"
    : "profile-card";

  const partClassName = `part-label part-${lion.part.toLowerCase()}`;

  return (
    <article className={cardClassName}>
      <div className="profile-image-area">
        <img
          className="profile-image"
          src={lion.image}
          alt={`${lion.name} 프로필 이미지`}
        />
        <span className="profile-badge">{lion.badge}</span>
      </div>

      <div className="profile-card-content">
        <h2>{lion.name}</h2>
        <strong className={partClassName}>{lion.part}</strong>
        <p>{lion.oneLine}</p>
      </div>
    </article>
  );
}

export default ProfileCard;