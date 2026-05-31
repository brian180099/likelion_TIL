interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <strong>Empty State</strong>
      <p>{message}</p>
    </section>
  );
}
