# Week 10 TIL

## 아기사자 대시보드 배포 및 프로덕션 점검

- 작성자: 김재웅
- 과제 주제: Vercel 배포 준비, UI/UX 최종 점검, 코드 품질 점검
- 기준일: 2026-06-21
- 프로젝트 루트: `week10`
- GitHub 저장소: <https://github.com/brian180099/likelion_TIL/tree/main/week10>
- Vercel Import 링크: <https://vercel.com/new/clone?repository-url=https://github.com/brian180099/likelion_TIL&root-directory=week10&project-name=likelion-week10>
- 배포 URL: Vercel 계정에서 GitHub 저장소 연결 및 환경 변수 입력 후 생성

## 1. 오늘 배운 내용

- 로컬 개발 서버(`yarn dev`)는 개발 중 빠르게 확인하기 위한 서버이고, 프로덕션 빌드(`yarn build`)는 실제 배포용 정적 파일을 만드는 과정이라는 점을 정리했다.
- Vercel은 GitHub 저장소와 연결해 main 브랜치에 push될 때마다 자동으로 새 빌드를 실행하고 배포해 주는 호스팅 플랫폼이다.
- Supabase URL과 anon key는 코드에 직접 작성하지 않고 `VITE_` 접두사가 붙은 환경 변수로 관리해야 한다.
- SPA 라우팅을 사용하는 앱은 배포 후 직접 URL 입력, 새로고침, 상세 페이지 접근까지 함께 확인해야 한다.
- 배포 전에는 TypeScript 빌드, 불필요한 `console.log`, 모바일 레이아웃, 로딩/에러/빈 상태를 반드시 점검해야 한다.

## 2. 구현 및 개선 내용

- `week09` 앱을 기반으로 `week10` 배포 점검 버전을 만들었다.
- 깨져 있던 한국어 UI 문구를 정상 문장으로 복구했다.
- 앱 제목과 패키지명을 Week 10 기준으로 수정했다.
- 환경 변수 예시 파일 `.env.example`을 추가했다.
- Supabase 환경 변수가 없을 때 사용자가 이해할 수 있는 안내 문구를 보여주도록 정리했다.
- 삭제 버튼을 누르면 바로 삭제하지 않고 확인창을 거치도록 개선했다.
- 샘플 명단 생성 데이터에 실제 작성자 이름인 `김재웅`을 포함했다.

## 3. 실행 방법

```bash
yarn install
yarn dev
yarn build
yarn preview
```

로컬 환경에서는 `.env.local` 파일에 아래 값을 넣어 실행한다.

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 4. Vercel 배포 체크리스트

- GitHub 저장소 `brian180099/likelion_TIL`을 Vercel에 연결한다.
- Root Directory를 `week10`으로 설정한다.
- Build Command는 `yarn build`, Output Directory는 `dist`를 사용한다.
- Vercel Project Settings의 Environment Variables에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 등록한다.
- main 브랜치에 push 후 자동 배포가 시작되는지 확인한다.
- 배포 URL에서 로그인, 로그아웃, 명단 조회, 추가, 삭제, 상세 페이지 새로고침을 확인한다.

## 5. 프로덕션 점검 기록

| 항목 | 점검 내용 | 상태 |
| --- | --- | --- |
| 빌드 | `yarn build` 실행 | 통과 |
| 미리보기 | `yarn preview` 실행 후 `http://127.0.0.1:4173/` 응답 확인 | 통과 |
| 콘솔 로그 | 개발용 `console.log` 검색 | 통과 |
| 환경 변수 | `.env.example` 추가, 실제 키는 코드에 미포함 | 통과 |
| 빈 상태 | 명단이 없거나 검색 결과가 없을 때 안내 문구 표시 | 통과 |
| 에러 상태 | Supabase 미설정/조회 실패 시 안내 문구 표시 | 통과 |
| 반응형 | CSS 미디어쿼리로 모바일/태블릿/데스크톱 대응 | 통과 |

## 6. 동료 피드백 기록 양식

실제 동료 서비스 URL을 받은 뒤 아래 형식으로 2명 이상 작성한다.

```markdown
## 피드백 대상
- 이름:
- 서비스 URL:

## 잘된 점
-

## 개선할 점 / 발견한 버그
-

## 추가하면 좋을 기능
-
```

## 7. 받은 피드백 반영 기록

- 반영 내용: 삭제 버튼 클릭 시 즉시 삭제되지 않도록 확인창을 추가했다.
- 반영 이유: 실수로 삭제했을 때 복구가 어렵다는 피드백을 가정하고, 실제 서비스에서 더 안전한 흐름이 되도록 개선했다.
- 수정 파일: `src/components/LionCard.tsx`

## 8. 회고

이번 주차에서는 로컬에서 동작하는 앱을 실제 서비스로 내보내기 위해 무엇을 확인해야 하는지 정리했다. 단순히 기능이 돌아가는 것에서 끝나는 것이 아니라, 배포 환경 변수, 라우팅, 빌드 결과, 에러 안내, 모바일 화면까지 확인해야 사용자에게 보여줄 수 있는 서비스가 된다는 점을 배웠다.
