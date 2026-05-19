export default function TopControls({
  totalCount,
  isFormOpen,
  isLoading,
  onOpenForm,
  onDeleteLast,
  onAddRandomOne,
  onAddRandomFive,
  onRefresh,
}) {
  return (
    <div className="top-controls">
      <div className="total-box">
        <span>현재 명단</span>
        <strong>총 {totalCount}명</strong>
      </div>

      <div className="button-group">
        <button type="button" className="primary-button" onClick={onOpenForm}>
          {isFormOpen ? "폼 닫기" : "아기 사자 추가"}
        </button>
        <button type="button" className="ghost-button" onClick={onDeleteLast}>
          마지막 삭제
        </button>
      </div>

      <div className="button-group api-buttons">
        <button type="button" onClick={onAddRandomOne} disabled={isLoading}>
          랜덤 1명 추가
        </button>
        <button type="button" onClick={onAddRandomFive} disabled={isLoading}>
          랜덤 5명 추가
        </button>
        <button type="button" onClick={onRefresh} disabled={isLoading}>
          전체 새로고침
        </button>
      </div>
    </div>
  );
}
