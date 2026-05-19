import EmptyState from "./EmptyState.jsx";
import LionSummaryCard from "./LionSummaryCard.jsx";

export default function LionGrid({ lions }) {
  if (lions.length === 0) {
    return <EmptyState message="조건에 맞는 아기 사자가 없습니다." />;
  }

  return (
    <section className="lion-grid">
      {lions.map((lion) => (
        <LionSummaryCard key={lion.id} lion={lion} />
      ))}
    </section>
  );
}
