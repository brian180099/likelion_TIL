import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="panel detail-page">
      <p className="eyebrow">404</p>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <Link className="text-link" to="/">
        명단으로 돌아가기
      </Link>
    </section>
  );
}
