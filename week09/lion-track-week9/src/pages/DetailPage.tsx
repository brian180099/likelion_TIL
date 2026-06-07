import { Link, useParams } from "react-router-dom";
import { useLionDetail } from "../hooks/useLionDetail";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lion, isLoading, errorMessage } = useLionDetail(id);

  if (isLoading) {
    return (
      <section className="panel detail-page">
        <p className="form-feedback info">상세 정보를 불러오는 중입니다.</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="panel detail-page">
        <p className="eyebrow">Error</p>
        <h1>상세 정보를 불러오지 못했습니다.</h1>
        <p className="form-feedback error">{errorMessage}</p>
        <Link className="text-link" to="/">
          목록으로 돌아가기
        </Link>
      </section>
    );
  }

  if (!lion) {
    return (
      <section className="panel detail-page">
        <p className="eyebrow">Not Found</p>
        <h1>해당 아기사자를 찾을 수 없습니다.</h1>
        <Link className="text-link" to="/">
          목록으로 돌아가기
        </Link>
      </section>
    );
  }

  return (
    <section className="panel detail-page">
      <div className="detail-topline">
        <div>
          <p className="eyebrow">Profile</p>
          <h1>{lion.name}</h1>
        </div>
        <Link className="text-link" to="/">
          목록으로 돌아가기
        </Link>
      </div>

      <article className="profile-layout">
        <div className="profile-main">
          <span className={`track-badge ${lion.track.toLowerCase()}`}>{lion.track}</span>
          <h2>{lion.role}</h2>
          <p>{lion.motto}</p>
          <div className="skill-row">
            {lion.skills.length > 0 ? (
              lion.skills.map((skill) => <span key={skill}>{skill}</span>)
            ) : (
              <span>스택 미입력</span>
            )}
          </div>
        </div>

        <dl className="profile-meta">
          <div>
            <dt>상태</dt>
            <dd>{lion.status}</dd>
          </div>
          <div>
            <dt>이메일</dt>
            <dd>{lion.email || "-"}</dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>{lion.github ? `@${lion.github}` : "-"}</dd>
          </div>
          <div>
            <dt>등록일</dt>
            <dd>{new Intl.DateTimeFormat("ko-KR").format(new Date(lion.createdAt))}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
