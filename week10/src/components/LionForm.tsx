import type { ChangeEvent, FormEvent } from "react";
import { STATUS_OPTIONS, TRACK_OPTIONS, type LionDraft } from "../types/lion";

interface LionFormProps {
  draft: LionDraft;
  disabled: boolean;
  isSaving: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onRandomAdd: () => void;
}

export default function LionForm({
  draft,
  disabled,
  isSaving,
  onChange,
  onSubmit,
  onRandomAdd,
}: LionFormProps) {
  return (
    <section className="panel form-panel">
      <div className="form-heading">
        <div>
          <p className="eyebrow">Create</p>
          <h2>아기사자 추가</h2>
        </div>
        <button type="button" className="ghost-button" onClick={onRandomAdd} disabled={disabled || isSaving}>
          샘플 5명 추가
        </button>
      </div>

      {!disabled && (
        <form className="lion-form" onSubmit={onSubmit}>
          <label>
            이름
            <input
              name="name"
              value={draft.name}
              onChange={onChange}
              placeholder="예: 김재웅"
              required
            />
          </label>

          <label>
            트랙
            <select name="track" value={draft.track} onChange={onChange}>
              {TRACK_OPTIONS.map((track) => (
                <option key={track} value={track}>
                  {track}
                </option>
              ))}
            </select>
          </label>

          <label>
            역할
            <input
              name="role"
              value={draft.role}
              onChange={onChange}
              placeholder="예: 배포 점검 담당"
              required
            />
          </label>

          <label>
            상태
            <select name="status" value={draft.status} onChange={onChange}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label>
            이메일
            <input
              name="email"
              type="email"
              value={draft.email}
              onChange={onChange}
              placeholder="lion@example.com"
            />
          </label>

          <label>
            GitHub
            <input
              name="github"
              value={draft.github}
              onChange={onChange}
              placeholder="github-id"
            />
          </label>

          <label className="wide-field">
            기술 스택
            <input
              name="skillsText"
              value={draft.skillsText}
              onChange={onChange}
              placeholder="React, TypeScript, Supabase"
            />
          </label>

          <label className="wide-field">
            한 줄 소개
            <textarea
              name="motto"
              value={draft.motto}
              onChange={onChange}
              placeholder="배포 환경에서도 안정적으로 동작하는 명단을 만들겠습니다."
              required
            />
          </label>

          <div className="form-actions wide-field">
            <button type="submit" disabled={isSaving}>
              {isSaving ? "저장 중..." : "Supabase에 저장"}
            </button>
          </div>
        </form>
      )}

      {disabled && (
        <div className="locked-box">
          <strong>로그인하면 명단을 수정할 수 있습니다.</strong>
          <p>조회는 누구나 가능하지만, 추가와 삭제는 인증된 사용자에게만 열려 있습니다.</p>
        </div>
      )}
    </section>
  );
}
