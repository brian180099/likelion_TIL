import ProfileCard from "./ProfileCard.jsx";

function ProfileCardList({ lions }) {
  return (
    <section className="profile-card-section">
      <div className="profile-card-grid">
        {lions.map((lion) => (
          <ProfileCard key={lion.id} lion={lion} />
        ))}
      </div>
    </section>
  );
}

export default ProfileCardList;