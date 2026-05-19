import EmptyState from "./EmptyState.jsx";

export default function DetailList({ lions }) {
  if (lions.length === 0) {
    return <EmptyState message="상세 정보에 표시할 명단이 없습니다." />;
  }

  return (
    <section className="detail-list">
      {lions.map((lion) => (
        <article key={lion.id} className="detail-card">
          <img src={lion.imageUrl} alt={`${lion.name} 프로필`} />
          <div>
            <div className="detail-top">
              <h3>{lion.name}</h3>
              <span className={`part-badge ${lion.part.toLowerCase()}`}>
                {lion.part}
              </span>
            </div>
            <p>{lion.intro}</p>
            <dl>
              <div>
                <dt>목표</dt>
                <dd>{lion.goal}</dd>
              </div>
              <div>
                <dt>관심사</dt>
                <dd>{lion.favorite}</dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </section>
  );
}
