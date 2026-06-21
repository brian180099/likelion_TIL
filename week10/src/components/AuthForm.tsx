import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { AuthActionResult } from "../hooks/useAuth";

export type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (email: string, password: string) => Promise<AuthActionResult>;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isSignup = mode === "signup";
  const title = isSignup ? "회원가입" : "로그인";
  const buttonText = isSignup ? "계정 만들기" : "로그인";

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setFeedback("");

    if (!email.trim()) {
      setFeedback("이메일을 입력해 주세요.");
      return;
    }

    if (password.length < 6) {
      setFeedback("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setFeedback("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit(email, password);
    setIsSubmitting(false);

    if (!result.ok) {
      setFeedback(result.message);
    }
  }

  return (
    <section className="auth-panel">
      <div>
        <p className="eyebrow">Supabase Auth</p>
        <h1>{title}</h1>
        <p className="auth-copy">
          이메일과 비밀번호로 접속하면 아기사자 명단을 추가하고 삭제할 수 있습니다.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          이메일
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            placeholder="lion@example.com"
            autoComplete="email"
          />
        </label>

        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            placeholder="6자 이상"
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
        </label>

        {isSignup && (
          <label>
            비밀번호 확인
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
              placeholder="비밀번호를 한 번 더 입력"
              autoComplete="new-password"
            />
          </label>
        )}

        {feedback && <p className="form-feedback error">{feedback}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "처리 중..." : buttonText}
        </button>

        <p className="auth-switch">
          {isSignup ? "이미 계정이 있다면 " : "아직 계정이 없다면 "}
          <Link to={isSignup ? "/login" : "/signup"}>{isSignup ? "로그인" : "회원가입"}</Link>
        </p>
      </form>
    </section>
  );
}
