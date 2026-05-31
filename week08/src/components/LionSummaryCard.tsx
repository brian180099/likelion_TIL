import { Link } from "react-router-dom";
import type { Lion } from "../types/lion";

interface LionSummaryCardProps {
  lion: Lion;
}

export default function LionSummaryCard({ lion }: LionSummaryCardProps) {
  return (
    <article className="summary-card">
      <img src={lion.imageUrl} alt={`${lion.name} 프로필`} />
      <div className="card-body">
        <div className="card-top">
          <h3>{lion.name}</h3>
          <span className={`part-badge ${lion.part.toLowerCase()}`}>
            {lion.part}
          </span>
        </div>
        <p>{lion.keyword}</p>
        <div className="card-actions">
          {lion.isMine && <span className="my-badge">내 카드</span>}
          <Link className="text-link" to={`/lions/${lion.id}`}>
            상세 보기
          </Link>
        </div>
      </div>
    </article>
  );
}
