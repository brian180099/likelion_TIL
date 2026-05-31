import type { Lion } from "../types/lion";

export const initialLions: Lion[] = [
  {
    id: "my-card",
    name: "김재웅",
    part: "Frontend",
    imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    keyword: "상태로 화면 만들기",
    intro:
      "React와 TypeScript를 함께 사용해 데이터의 흐름이 분명한 화면을 만드는 중입니다.",
    goal: "props와 상태 타입을 자연스럽게 설계하기",
    favorite: "컴포넌트 구조",
    addedAt: 1,
    isMine: true,
  },
  {
    id: "initial-1",
    name: "Alex Morgan",
    part: "Backend",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    keyword: "API 연결",
    intro:
      "서버에서 가져온 데이터를 안정적인 화면 상태로 바꾸는 작업에 관심이 많습니다.",
    goal: "비동기 데이터 흐름을 더 명확하게 다루기",
    favorite: "Node.js",
    addedAt: 2,
    isMine: false,
  },
  {
    id: "initial-2",
    name: "Sofia Carter",
    part: "Design",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    keyword: "사용자 경험",
    intro:
      "정보가 한눈에 들어오는 화면을 만들기 위해 레이아웃과 색을 고민합니다.",
    goal: "개발자와 잘 협업하는 디자이너 되기",
    favorite: "Figma",
    addedAt: 3,
    isMine: false,
  },
  {
    id: "initial-3",
    name: "Jamie Brown",
    part: "Frontend",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    keyword: "컴포넌트",
    intro:
      "작은 컴포넌트를 조합해서 큰 화면을 만드는 과정의 재미를 알아가고 있습니다.",
    goal: "재사용하기 쉬운 UI 만들기",
    favorite: "React",
    addedAt: 4,
    isMine: false,
  },
];
