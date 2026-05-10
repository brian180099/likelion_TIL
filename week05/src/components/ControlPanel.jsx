import ViewOptions from "./ViewOptions.jsx";
import AddLionForm from "./AddLionForm.jsx";

function ControlPanel({ totalCount }) {
  return (
    <header className="control-panel">
      <section className="control-row">
        <button type="button" className="control-button">
          아기 사자 추가
        </button>

        <button type="button" className="control-button">
          마지막 아기 사자 삭제
        </button>

        <strong className="total-count">총 {totalCount}명</strong>
      </section>

      <section className="control-row">
        <button type="button" className="control-button">
          랜덤 1명 추가
        </button>

        <button type="button" className="control-button">
          랜덤 5명 추가
        </button>

        <button type="button" className="control-button">
          전체 새로고침
        </button>

        <strong className="status-text">준비 완료</strong>

        <button type="button" className="retry-button" hidden>
          재시도
        </button>
      </section>

      <ViewOptions />

      <AddLionForm />
    </header>
  );
}

export default ControlPanel;