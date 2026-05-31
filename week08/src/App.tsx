import { NavLink, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LionDetailPage from "./pages/LionDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useLions } from "./hooks/useLions";

export default function App() {
  const lionState = useLions();

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">멋쟁이사자처럼 8주차</p>
        <h1>아기 사자 대시보드</h1>
        <p className="hero-text">
          React로 만든 명단 대시보드를 TypeScript로 옮겨 데이터 구조, props,
          상태, 이벤트, API 응답 타입을 명확하게 관리합니다.
        </p>
      </section>

      <nav className="app-nav" aria-label="페이지 이동">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          명단
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage {...lionState} />} />
        <Route
          path="/lions/:lionId"
          element={<LionDetailPage lions={lionState.lions} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}
