export const PARTS = ["Frontend", "Backend", "Design"];

const keywords = [
  "함께 성장",
  "꾸준한 기록",
  "문제 해결",
  "좋은 질문",
  "작은 개선",
  "빠른 실행",
];

const goals = [
  "팀 프로젝트에서 제 몫을 해내기",
  "읽기 쉬운 코드를 작성하기",
  "사용자가 편한 화면 만들기",
  "API 데이터를 자연스럽게 다루기",
  "에러를 차분하게 해결하기",
];

const favorites = ["React", "CSS", "JavaScript", "Figma", "GitHub", "Node.js"];

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export async function fetchRandomUsers(count) {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`,
  );

  if (!response.ok) {
    throw new Error("외부 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.results;
}

export function createLionFromUser(user, addedAt) {
  const fullName = `${user.name.first} ${user.name.last}`;

  return {
    id: `${user.login.uuid}-${addedAt}`,
    name: fullName,
    part: pickRandom(PARTS),
    imageUrl: user.picture.large,
    keyword: pickRandom(keywords),
    intro: `${fullName}입니다. ${user.location.country}에서 온 아기 사자이고, 재미있게 배우는 중입니다.`,
    goal: pickRandom(goals),
    favorite: pickRandom(favorites),
    addedAt,
    isMine: false,
  };
}

export function createRandomFormValue(user) {
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
