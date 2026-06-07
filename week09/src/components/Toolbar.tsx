import type { ChangeEvent } from "react";
import { TRACK_OPTIONS, type SortOption, type TrackFilter, type ViewMode } from "../types/lion";

interface ToolbarProps {
  query: string;
  track: TrackFilter;
  sort: SortOption;
  viewMode: ViewMode;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function Toolbar({
  query,
  track,
  sort,
  viewMode,
  onChange,
  onRefresh,
  isLoading,
}: ToolbarProps) {
  return (
    <section className="panel toolbar">
      <label>
        검색
        <input name="q" value={query} onChange={onChange} placeholder="이름, 파트, 스택 검색" />
      </label>

      <label>
        파트
        <select name="track" value={track} onChange={onChange}>
          <option value="all">전체</option>
          {TRACK_OPTIONS.map((trackOption) => (
            <option key={trackOption} value={trackOption}>
              {trackOption}
            </option>
          ))}
        </select>
      </label>

      <label>
        정렬
        <select name="sort" value={sort} onChange={onChange}>
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="name">이름순</option>
          <option value="track">파트순</option>
        </select>
      </label>

      <label>
        보기
        <select name="view" value={viewMode} onChange={onChange}>
          <option value="summary">요약 카드</option>
          <option value="detail">상세 카드</option>
        </select>
      </label>

      <button type="button" className="ghost-button" onClick={onRefresh} disabled={isLoading}>
        새로고침
      </button>
    </section>
  );
}
