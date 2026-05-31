import { PARTS } from "../utils/randomUser";
import type { ViewOption, ViewOptionChangeEvent } from "../types/lion";

interface ViewOptionsProps {
  viewOption: ViewOption;
  onChange: (event: ViewOptionChangeEvent) => void;
}

export default function ViewOptions({ viewOption, onChange }: ViewOptionsProps) {
  return (
    <section className="panel view-options">
      <label>
        파트 필터
        <select name="part" value={viewOption.part} onChange={onChange}>
          <option value="전체">전체</option>
          {PARTS.map((part) => (
            <option key={part} value={part}>
              {part}
            </option>
          ))}
        </select>
      </label>

      <label>
        정렬
        <select name="sort" value={viewOption.sort} onChange={onChange}>
          <option value="latest">최신 추가순</option>
          <option value="name">이름순</option>
        </select>
      </label>

      <label className="search-field">
        이름 검색
        <input
          name="search"
          value={viewOption.search}
          onChange={onChange}
          placeholder="이름을 입력하세요"
        />
      </label>
    </section>
  );
}
