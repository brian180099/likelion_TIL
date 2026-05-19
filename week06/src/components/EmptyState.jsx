export default function EmptyState({ message }) {
  return (
    <section className="empty-state">
      <strong>Empty State</strong>
      <p>{message}</p>
    </section>
  );
}
