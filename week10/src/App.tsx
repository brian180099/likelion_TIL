import { Link, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const auth = useAuth();

  return (
    <main className="app">
      <header className="app-header">
        <Link className="brand" to="/">
          <span>LIKELION</span>
          <strong>Week 10</strong>
        </Link>

        <nav className="app-nav" aria-label="페이지 이동">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            명단
          </NavLink>
          {!auth.isAuthenticated && (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                로그인
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                회원가입
              </NavLink>
            </>
          )}
        </nav>

        <div className="auth-box">
          {auth.isAuthLoading && <span>인증 확인 중</span>}
          {!auth.isAuthLoading && auth.isAuthenticated && (
            <>
              <span>{auth.email}</span>
              <button type="button" className="ghost-button" onClick={() => void auth.signOut()}>
                로그아웃
              </button>
            </>
          )}
          {!auth.isAuthLoading && !auth.isAuthenticated && <span>비로그인 조회 모드</span>}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage userId={auth.user?.id ?? null} userEmail={auth.email} />} />
        <Route path="/lions/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage mode="login" auth={auth} />} />
        <Route path="/signup" element={<LoginPage mode="signup" auth={auth} />} />
        <Route
          path="*"
          element={
            <section className="panel detail-page">
              <p className="eyebrow">404</p>
              <h1>페이지를 찾을 수 없습니다.</h1>
              <Link className="text-link" to="/">
                명단으로 돌아가기
              </Link>
            </section>
          }
        />
      </Routes>
    </main>
  );
}
