import type { RequestState } from "../types/lion";

interface AsyncStatusProps {
  requestState: RequestState;
  onRetry: () => void;
}

export default function AsyncStatus({ requestState, onRetry }: AsyncStatusProps) {
  return (
    <div className={`async-status ${requestState.status}`}>
      <span>{requestState.message}</span>
      {requestState.status === "error" && (
        <button type="button" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}
