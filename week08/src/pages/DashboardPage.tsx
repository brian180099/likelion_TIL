import AddLionForm from "../components/AddLionForm";
import AsyncStatus from "../components/AsyncStatus";
import DetailList from "../components/DetailList";
import LionGrid from "../components/LionGrid";
import TopControls from "../components/TopControls";
import ViewOptions from "../components/ViewOptions";
import type { UseLionsResult } from "../hooks/useLions";

export default function DashboardPage({
  lions,
  visibleLions,
  isFormOpen,
  form,
  viewOption,
  requestState,
  canSubmit,
  openForm,
  closeForm,
  changeForm,
  changeViewOption,
  addLion,
  deleteLastLion,
  fillRandomForm,
  addRandomLions,
  refreshLions,
  retryLastRequest,
}: UseLionsResult) {
  const isLoading = requestState.status === "loading";

  return (
    <>
      <section className="panel control-panel">
        <TopControls
          totalCount={lions.length}
          isFormOpen={isFormOpen}
          isLoading={isLoading}
          onOpenForm={openForm}
          onDeleteLast={deleteLastLion}
          onAddRandomOne={() => addRandomLions(1)}
          onAddRandomFive={() => addRandomLions(5)}
          onRefresh={refreshLions}
        />
        <AsyncStatus requestState={requestState} onRetry={retryLastRequest} />
      </section>

      {isFormOpen && (
        <AddLionForm
          form={form}
          canSubmit={canSubmit}
          isLoading={isLoading}
          onChange={changeForm}
          onSubmit={addLion}
          onCancel={closeForm}
          onFillRandom={fillRandomForm}
        />
      )}

      <ViewOptions viewOption={viewOption} onChange={changeViewOption} />

      <section className="section-heading">
        <div>
          <p className="eyebrow">Summary</p>
          <h2>자기소개 요약 카드</h2>
        </div>
        <strong>{visibleLions.length}명 표시 중</strong>
      </section>

      <LionGrid lions={visibleLions} />

      <section className="section-heading detail-heading">
        <div>
          <p className="eyebrow">Detail</p>
          <h2>상세 자기소개</h2>
        </div>
      </section>

      <DetailList lions={visibleLions} />
    </>
  );
}
