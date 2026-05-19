import AddLionForm from "./components/AddLionForm.jsx";
import AsyncStatus from "./components/AsyncStatus.jsx";
import DetailList from "./components/DetailList.jsx";
import LionGrid from "./components/LionGrid.jsx";
import TopControls from "./components/TopControls.jsx";
import ViewOptions from "./components/ViewOptions.jsx";
import { useLions } from "./hooks/useLions.js";

export default function App() {
  const {
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
  } = useLions();

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">멋쟁이사자처럼 6주차</p>
        <h1>아기 사자 대시보드</h1>
        <p className="hero-text">
          명단 상태가 바뀌면 카드와 상세 정보가 함께 다시 그려지는 React 연습 화면입니다.
        </p>
      </section>

      <section className="panel control-panel">
        <TopControls
          totalCount={lions.length}
          isFormOpen={isFormOpen}
          isLoading={requestState.status === "loading"}
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
          isLoading={requestState.status === "loading"}
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
    </main>
  );
}
