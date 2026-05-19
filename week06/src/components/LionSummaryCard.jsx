export default function LionSummaryCard({ lion }) {
  return (
    <article className="summary-card">
      <img src={lion.imageUrl} alt={`${lion.name} 프로필`} />
      <div className="card-body">
        <div className="card-top">
          <h3>{lion.name}</h3>
          <span className={`part-badge ${lion.part.toLowerCase()}`}>{lion.part}</span>
        </div>
        <p>{lion.keyword}</p>
        {lion.isMine && <span className="my-badge">내 카드</span>}
      </div>
    </article>
  );
}
