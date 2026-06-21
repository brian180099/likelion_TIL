import { Navigate, useNavigate } from "react-router-dom";
import AuthForm, { type AuthMode } from "../components/AuthForm";
import type { AuthActionResult, UseAuthResult } from "../hooks/useAuth";

interface LoginPageProps {
  mode: AuthMode;
  auth: UseAuthResult;
}

export default function LoginPage({ mode, auth }: LoginPageProps) {
  const navigate = useNavigate();

  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(email: string, password: string): Promise<AuthActionResult> {
    const result =
      mode === "login" ? await auth.signIn(email, password) : await auth.signUp(email, password);

    if (result.ok) {
      navigate("/");
    }

    return result;
  }

  return <AuthForm mode={mode} onSubmit={handleSubmit} />;
}
