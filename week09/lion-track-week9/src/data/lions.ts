import type { LionDraft, LionStatus, Track } from "../types/lion";

const names = [
  "김재웅",
  "이도윤",
  "박서연",
  "최민준",
  "정하린",
  "강지호",
  "윤아린",
  "한서준",
  "오유진",
  "문지안",
];

const roles = [
  "컴포넌트 설계 담당",
  "Supabase CRUD 담당",
  "라우팅 흐름 담당",
  "반응형 UI 담당",
  "인증 플로우 담당",
  "데이터 타입 정리 담당",
];

const skillSets = [
  "React, TypeScript, CSS",
  "Supabase, RLS, Auth",
  "Router, URLSearchParams, Form",
  "Vite, Async UI, CRUD",
  "Database, Policy, Environment",
];

const mottos = [
  "작게 만들고 자주 확인합니다.",
  "데이터 흐름을 눈에 보이게 정리합니다.",
  "사용자가 헷갈리지 않는 화면을 만듭니다.",
  "타입으로 실수를 줄이는 코드를 좋아합니다.",
  "새로고침해도 살아남는 서비스를 만듭니다.",
];

const tracks: readonly Track[] = ["Frontend", "Backend", "Design", "Product"];
const statuses: readonly LionStatus[] = ["active", "learning", "paused"];

function pick<T>(items: readonly T[], seed: number): T {
  return items[seed % items.length];
}

export function createEmptyLionDraft(): LionDraft {
  return {
    name: "",
    track: "Frontend",
    role: "",
    email: "",
    github: "",
    skillsText: "",
    motto: "",
    status: "active",
  };
}

export function createRandomLionDrafts(count: number): LionDraft[] {
  const now = Date.now();

  return Array.from({ length: count }, (_, index) => {
    const seed = now + index * 7;
    const name = pick(names, seed + index);

    return {
      name: `${name}${index === 0 ? "" : ` ${index + 1}`}`,
      track: pick(tracks, seed + 1),
      role: pick(roles, seed + 2),
      email: `lion${seed % 10000}@likelion.dev`,
      github: `lion-${seed % 10000}`,
      skillsText: pick(skillSets, seed + 3),
      motto: pick(mottos, seed + 4),
      status: pick(statuses, seed + 5),
    };
  });
}
