import type { Lion } from "../types/lion";

interface SummaryCardsProps {
  lions: Lion[];
  visibleCount: number;
  userEmail: string;
}

export default function SummaryCards({ lions, visibleCount, userEmail }: SummaryCardsProps) {
  const frontendCount = lions.filter((lion) => lion.track === "Frontend").length;
  const latestLion = lions[0]?.name ?? "아직 없음";

  return (
    <section className="summary-grid" aria-label="명단 요약">
      <article>
        <span>전체 명단</span>
        <strong>{lions.length}</strong>
      </article>
      <article>
        <span>현재 표시</span>
        <strong>{visibleCount}</strong>
      </article>
      <article>
        <span>Frontend</span>
        <strong>{frontendCount}</strong>
      </article>
      <article>
        <span>접속 사용자</span>
        <strong>{userEmail || "비로그인"}</strong>
      </article>
      <article className="wide-summary">
        <span>최근 추가</span>
        <strong>{latestLion}</strong>
      </article>
    </section>
  );
}
