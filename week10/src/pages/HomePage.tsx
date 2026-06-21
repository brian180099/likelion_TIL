import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LionCard from "../components/LionCard";
import LionForm from "../components/LionForm";
import SummaryCards from "../components/SummaryCards";
import Toolbar from "../components/Toolbar";
import { createEmptyLionDraft } from "../data/lions";
import { useLions } from "../hooks/useLions";
import {
  isLionStatus,
  isSortOption,
  isTrack,
  isViewMode,
  type LionDraft,
  type SortOption,
  type TrackFilter,
  type ViewMode,
} from "../types/lion";
import { filterAndSortLions } from "../utils/filterLions";

const draftTextFields = ["name", "role", "email", "github", "skillsText", "motto"] as const;
type DraftTextField = (typeof draftTextFields)[number];

interface HomePageProps {
  userId: string | null;
  userEmail: string;
}

function isDraftTextField(value: string): value is DraftTextField {
  return draftTextFields.some((field) => field === value);
}

export default function HomePage({ userId, userEmail }: HomePageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState<LionDraft>(() => createEmptyLionDraft());
  const {
    lions,
    isLoading,
    isSaving,
    deletingId,
    message,
    errorMessage,
    refreshLions,
    addLion,
    addRandomLions,
    deleteLion,
  } = useLions(userId);

  const query = searchParams.get("q") ?? "";
  const trackParam = searchParams.get("track");
  const sortParam = searchParams.get("sort");
  const viewParam = searchParams.get("view");
  const track: TrackFilter = isTrack(trackParam) ? trackParam : "all";
  const sort: SortOption = isSortOption(sortParam) ? sortParam : "newest";
  const viewMode: ViewMode = isViewMode(viewParam) ? viewParam : "summary";
  const visibleLions = filterAndSortLions(lions, { query, track, sort });
  const canWrite = Boolean(userId);

  function updateSearchParam(name: string, value: string): void {
    const nextParams = new URLSearchParams(searchParams);
    const shouldRemove =
      value === "" ||
      (name === "track" && value === "all") ||
      (name === "sort" && value === "newest") ||
      (name === "view" && value === "summary");

    if (shouldRemove) {
      nextParams.delete(name);
    } else {
      nextParams.set(name, value);
    }

    setSearchParams(nextParams);
  }

  function handleToolbarChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    updateSearchParam(event.currentTarget.name, event.currentTarget.value);
  }

  function handleDraftChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void {
    const { name, value } = event.currentTarget;

    if (name === "track" && isTrack(value)) {
      setDraft((prev) => ({ ...prev, track: value }));
      return;
    }

    if (name === "status" && isLionStatus(value)) {
      setDraft((prev) => ({ ...prev, status: value }));
      return;
    }

    if (isDraftTextField(name)) {
      setDraft((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!draft.name.trim() || !draft.role.trim() || !draft.motto.trim()) {
      return;
    }

    const saved = await addLion(draft);

    if (saved) {
      setDraft(createEmptyLionDraft());
    }
  }

  async function handleRandomAdd(): Promise<void> {
    await addRandomLions(5);
  }

  return (
    <>
      <section className="intro-band">
        <div>
          <p className="eyebrow">Week 10 Deployment</p>
          <h1>아기사자 대시보드</h1>
          <p>
            Supabase에 저장된 아기사자 명단을 불러오고, 로그인한 사용자만 데이터를 추가하거나 삭제할 수
            있도록 정리한 프로덕션 점검 버전입니다.
          </p>
        </div>
        {!canWrite && (
          <Link className="login-callout" to="/login">
            로그인하고 명단 관리하기
          </Link>
        )}
      </section>

      <SummaryCards lions={lions} visibleCount={visibleLions.length} userEmail={userEmail} />

      <Toolbar
        query={query}
        track={track}
        sort={sort}
        viewMode={viewMode}
        onChange={handleToolbarChange}
        onRefresh={() => void refreshLions()}
        isLoading={isLoading}
      />

      <LionForm
        draft={draft}
        disabled={!canWrite}
        isSaving={isSaving}
        onChange={handleDraftChange}
        onSubmit={handleSubmit}
        onRandomAdd={() => void handleRandomAdd()}
      />

      <section className="status-area" aria-live="polite">
        {isLoading && <p className="form-feedback info">Supabase에서 명단을 불러오는 중입니다.</p>}
        {message && !isLoading && <p className="form-feedback success">{message}</p>}
        {errorMessage && <p className="form-feedback error">{errorMessage}</p>}
      </section>

      <section className="section-heading">
        <div>
          <p className="eyebrow">Members</p>
          <h2>명단 카드</h2>
        </div>
        <strong>{visibleLions.length}명 표시 중</strong>
      </section>

      {!isLoading && visibleLions.length === 0 && (
        <section className="empty-state">
          <strong>표시할 아기사자가 없습니다.</strong>
          <p>검색 조건을 바꾸거나, 로그인 후 새 명단을 추가해 주세요.</p>
        </section>
      )}

      <section className={`lion-grid ${viewMode}`}>
        {visibleLions.map((lion) => (
          <LionCard
            key={lion.id}
            lion={lion}
            viewMode={viewMode}
            canWrite={canWrite}
            isDeleting={deletingId === lion.id}
            onDelete={(id) => void deleteLion(id)}
          />
        ))}
      </section>
    </>
  );
}
