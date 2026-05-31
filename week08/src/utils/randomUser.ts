import type { Lion, LionForm, LionPart, RandomUser, RandomUserApiResponse } from "../types/lion";

export const PARTS: readonly LionPart[] = ["Frontend", "Backend", "Design"];

const keywords = [
  "함께 성장",
  "꾸준한 기록",
  "문제 해결",
  "좋은 질문",
  "작은 개선",
  "빠른 실행",
] as const;

const goals = [
  "팀 프로젝트에서 맡은 역할을 해내기",
  "읽기 쉬운 코드를 작성하기",
  "사용자가 편한 화면 만들기",
  "API 데이터를 자연스럽게 다루기",
  "오류를 차분하게 해결하기",
] as const;

const favorites = ["React", "CSS", "TypeScript", "Figma", "GitHub", "Node.js"] as const;

function pickRandom<T>(items: readonly T[]): T {
  const item = items[Math.floor(Math.random() * items.length)];

  if (item === undefined) {
    throw new Error("랜덤으로 선택할 항목이 없습니다.");
  }

  return item;
}

export async function fetchRandomUsers(count: number): Promise<RandomUser[]> {
  if (count <= 0) {
    return [];
  }

  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`,
  );

  if (!response.ok) {
    throw new Error("랜덤 사용자 데이터를 불러오지 못했습니다.");
  }

  const data: RandomUserApiResponse = await response.json();
  return data.results;
}

export function createLionFromUser(user: RandomUser, addedAt: number): Lion {
  const fullName = `${user.name.first} ${user.name.last}`;

  return {
    id: `${user.login.uuid}-${addedAt}`,
    name: fullName,
    part: pickRandom(PARTS),
    imageUrl: user.picture.large,
    keyword: pickRandom(keywords),
    intro: `${fullName}님은 ${user.location.country}에서 합류한 아기 사자입니다. 새로운 기술을 즐겁게 배우고 있습니다.`,
    goal: pickRandom(goals),
    favorite: pickRandom(favorites),
    addedAt,
    isMine: false,
  };
}

export function createRandomFormValue(user: RandomUser): LionForm {
  const lion = createLionFromUser(user, Date.now());

  return {
    name: lion.name,
    part: lion.part,
    imageUrl: lion.imageUrl,
    keyword: lion.keyword,
    intro: lion.intro,
    goal: lion.goal,
    favorite: lion.favorite,
  };
}
