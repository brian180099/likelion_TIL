import type { LionInsert, LionRow } from "../types/database";
import {
  isLionStatus,
  isTrack,
  type Lion,
  type LionDraft,
  type LionStatus,
  type Track,
} from "../types/lion";

function normalizeTrack(value: string): Track {
  return isTrack(value) ? value : "Frontend";
}

function normalizeStatus(value: string): LionStatus {
  return isLionStatus(value) ? value : "active";
}

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function parseSkills(skillsText: string): string[] {
  return skillsText
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);
}

export function rowToLion(row: LionRow): Lion {
  return {
    id: row.id,
    name: row.name,
    track: normalizeTrack(row.track),
    role: row.role,
    email: row.email ?? "",
    github: row.github ?? "",
    skills: row.skills,
    motto: row.motto,
    status: normalizeStatus(row.status),
    createdBy: row.created_by,
    createdAt: row.created_at,
  };
}

export function draftToInsert(draft: LionDraft, userId: string): LionInsert {
  return {
    name: draft.name.trim(),
    track: draft.track,
    role: draft.role.trim(),
    email: emptyToNull(draft.email),
    github: emptyToNull(draft.github.replace(/^@/, "")),
    skills: parseSkills(draft.skillsText),
    motto: draft.motto.trim(),
    status: draft.status,
    created_by: userId,
  };
}
