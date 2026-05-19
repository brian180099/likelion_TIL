export default function AsyncStatus({ requestState, onRetry }) {
  return (
    <div className={`async-status ${requestState.status}`}>
      <span>{requestState.message}</span>
      {requestState.status === "error" && (
        <button type="button" onClick={onRetry}>
          재시도
        </button>
      )}
    </div>
  );
}
