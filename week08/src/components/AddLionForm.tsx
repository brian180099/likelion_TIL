import { PARTS } from "../utils/randomUser";
import type { LionForm, LionFormChangeEvent, LionFormSubmitEvent } from "../types/lion";

interface AddLionFormProps {
  form: LionForm;
  canSubmit: boolean;
  isLoading: boolean;
  onChange: (event: LionFormChangeEvent) => void;
  onSubmit: (event: LionFormSubmitEvent) => void;
  onCancel: () => void;
  onFillRandom: () => void;
}

export default function AddLionForm({
  form,
  canSubmit,
  isLoading,
  onChange,
  onSubmit,
  onCancel,
  onFillRandom,
}: AddLionFormProps) {
  return (
    <form className="panel add-form" onSubmit={onSubmit}>
      <div className="form-title">
        <div>
          <p className="eyebrow">New Lion</p>
          <h2>아기 사자 추가</h2>
        </div>
        <button type="button" onClick={onFillRandom} disabled={isLoading}>
          랜덤 값 채우기
        </button>
      </div>

      <label>
        이름
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="이름을 입력하세요"
        />
      </label>

      <label>
        파트
        <select name="part" value={form.part} onChange={onChange}>
          {PARTS.map((part) => (
            <option key={part} value={part}>
              {part}
            </option>
          ))}
        </select>
      </label>

      <label>
        사진 URL
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={onChange}
          placeholder="https://..."
        />
      </label>

      <label>
        키워드
        <input
          name="keyword"
          value={form.keyword}
          onChange={onChange}
          placeholder="나를 표현하는 한마디"
        />
      </label>

      <label className="wide-field">
        자기소개
        <textarea
          name="intro"
          value={form.intro}
          onChange={onChange}
          placeholder="간단한 자기소개를 적어주세요"
        />
      </label>

      <label>
        목표
        <input
          name="goal"
          value={form.goal}
          onChange={onChange}
          placeholder="이번 주 학습 목표"
        />
      </label>

      <label>
        관심사
        <input
          name="favorite"
          value={form.favorite}
          onChange={onChange}
          placeholder="React, CSS, Figma..."
        />
      </label>

      <div className="form-actions wide-field">
        <button type="submit" className="primary-button" disabled={!canSubmit || isLoading}>
          추가하기
        </button>
        <button type="button" className="ghost-button" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
}
