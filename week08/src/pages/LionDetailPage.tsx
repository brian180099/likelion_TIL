import { Link, useParams } from "react-router-dom";
import type { Lion } from "../types/lion";

interface LionDetailPageProps {
  lions: Lion[];
}

export default function LionDetailPage({ lions }: LionDetailPageProps) {
  const { lionId } = useParams<{ lionId: string }>();
  const lion = lions.find((candidate) => candidate.id === lionId);

  if (!lion) {
    return (
      <section className="panel detail-page">
        <p className="eyebrow">Not Found</p>
        <h2>해당 아기 사자를 찾을 수 없습니다.</h2>
        <Link className="text-link" to="/">
          명단으로 돌아가기
        </Link>
      </section>
    );
  }

  return (
    <section className="panel detail-page">
      <div className="detail-page-top">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>{lion.name}</h2>
        </div>
        <Link className="text-link" to="/">
          명단으로 돌아가기
        </Link>
      </div>

      <article className="profile-layout">
        <img src={lion.imageUrl} alt={`${lion.name} 프로필`} />
        <div>
          <span className={`part-badge ${lion.part.toLowerCase()}`}>{lion.part}</span>
          <h3>{lion.keyword}</h3>
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
    </section>
  );
}
