import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";
import type { Lion } from "../types/lion";

interface DetailListProps {
  lions: Lion[];
}

export default function DetailList({ lions }: DetailListProps) {
  if (lions.length === 0) {
    return <EmptyState message="상세 정보를 표시할 명단이 없습니다." />;
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
            <Link className="text-link" to={`/lions/${lion.id}`}>
              상세 페이지
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
