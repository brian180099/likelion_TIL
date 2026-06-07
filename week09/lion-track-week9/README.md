# Week 09 PBL - Supabase 아기사자 대시보드

Supabase 데이터베이스와 이메일/비밀번호 인증을 연결한 React + TypeScript + Vite 앱입니다. 로그인하지 않은 사용자는 명단을 조회할 수 있고, 로그인한 사용자만 아기사자 명단을 추가하거나 삭제할 수 있습니다.

## 실행 방법

```bash
yarn install
yarn dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

## Supabase 설정

1. Supabase 프로젝트를 생성합니다.
2. `supabase/schema.sql`의 SQL을 Supabase SQL Editor에서 실행합니다.
3. 프로젝트 루트에 `.env.local`을 만들고 아래 값을 채웁니다.

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

`.env.local`은 `.gitignore`에 포함되어 Git에 올라가지 않습니다.

## 구현 내용

- `/` 목록 페이지, `/lions/:id` 상세 페이지, `/login` 로그인 페이지, `/signup` 회원가입 페이지
- Supabase `lions` 테이블 조회, 추가, 삭제
- Supabase Realtime 구독을 통한 명단 변경 반영
- 이메일/비밀번호 회원가입 및 로그인
- 로그인 사용자 이메일 표시 및 로그아웃
- 비로그인 상태에서 추가/삭제 버튼 비활성화
- URL 쿼리 파라미터 기반 검색, 파트 필터, 정렬, 보기 옵션
- 요약 카드, 상세 카드, 반응형 레이아웃
- `Database` 타입을 Supabase 클라이언트 제네릭으로 전달
- Supabase Row 타입과 앱 `Lion` 타입 간 변환 함수 분리

## 이메일 인증 참고

개발 중 회원가입에서 이메일 발송 제한이 발생하면 Supabase Dashboard의 `Authentication -> Sign In / Providers`에서 `Confirm email` 옵션을 끄면 확인 이메일 없이 바로 로그인 흐름을 테스트할 수 있습니다.
