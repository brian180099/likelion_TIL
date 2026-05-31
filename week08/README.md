# Week 08 TIL

## 오늘 배운 내용

- JavaScript로 작성된 React 코드를 TypeScript 기반의 `.tsx`, `.ts` 파일로 마이그레이션했다.
- 아기 사자 데이터, 폼 상태, 필터 옵션, API 응답 구조를 `interface`와 `type`으로 정의했다.
- 컴포넌트 props, `useState` 상태, 이벤트 핸들러 매개변수에 타입을 명시했다.
- React Router의 목록 페이지, 상세 페이지, URL 쿼리 파라미터 기능을 TypeScript 환경에서 유지했다.
- `yarn build`에서 `tsc -b` 타입 검사가 함께 실행되도록 설정했다.

## 핵심 정리

TypeScript를 적용하니 컴포넌트가 어떤 props를 받는지, 폼 이벤트에서 어떤 값을 읽을 수 있는지 코드 작성 단계에서 바로 확인할 수 있었다. 특히 API 응답 타입을 정의하니 외부 데이터를 화면에서 사용할 때 필요한 필드를 더 명확하게 다룰 수 있었다.

이번 주차의 목표는 기능을 새로 늘리는 것보다 기존 아기 사자 대시보드를 TypeScript로 안전하게 옮기는 것이다. 그래서 라우팅, 목록/상세 화면, URL 검색 조건, 명단 추가/삭제, 랜덤 사용자 API 불러오기 기능은 유지하고 타입 정의를 중심으로 구조를 정리했다.

## 실행 방법

```bash
yarn install
yarn dev
yarn build
```
