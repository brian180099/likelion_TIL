import { Link } from "react-router-dom";
import type { Lion, ViewMode } from "../types/lion";

interface LionCardProps {
  lion: Lion;
  viewMode: ViewMode;
  canWrite: boolean;
  isDeleting: boolean;
  onDelete: (id: string) => void;
}

export default function LionCard({
  lion,
  viewMode,
  canWrite,
  isDeleting,
  onDelete,
}: LionCardProps) {
  const createdDate = new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(lion.createdAt));

  function handleDelete(): void {
    if (window.confirm(`${lion.name}님을 명단에서 삭제할까요?`)) {
      onDelete(lion.id);
    }
  }

  return (
    <article className={`lion-card ${viewMode}`}>
      <div className="card-top">
        <span className={`track-badge ${lion.track.toLowerCase()}`}>{lion.track}</span>
        <span className="status-badge">{lion.status}</span>
      </div>

      <div>
        <h3>{lion.name}</h3>
        <p className="role-text">{lion.role}</p>
      </div>

      {viewMode === "detail" && (
        <div className="card-extra">
          <p>{lion.motto}</p>
          <div className="skill-row">
            {lion.skills.length > 0 ? (
              lion.skills.map((skill) => <span key={skill}>{skill}</span>)
            ) : (
              <span>기술 미입력</span>
            )}
          </div>
          <dl>
            <div>
              <dt>이메일</dt>
              <dd>{lion.email || "-"}</dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>{lion.github ? `@${lion.github}` : "-"}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="card-actions">
        <span>{createdDate}</span>
        <div>
          <Link className="text-link" to={`/lions/${lion.id}`}>
            상세
          </Link>
          <button
            type="button"
            className="danger-button"
            onClick={handleDelete}
            disabled={!canWrite || isDeleting}
          >
            {isDeleting ? "삭제 중" : "삭제"}
          </button>
        </div>
      </div>
    </article>
  );
}
