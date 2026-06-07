export const TRACK_OPTIONS = ["Frontend", "Backend", "Design", "Product"] as const;
export type Track = (typeof TRACK_OPTIONS)[number];

export const STATUS_OPTIONS = ["active", "learning", "paused"] as const;
export type LionStatus = (typeof STATUS_OPTIONS)[number];

export type SortOption = "newest" | "oldest" | "name" | "track";
export type ViewMode = "summary" | "detail";
export type TrackFilter = Track | "all";

export interface Lion {
  id: string;
  name: string;
  track: Track;
  role: string;
  email: string;
  github: string;
  skills: string[];
  motto: string;
  status: LionStatus;
  createdBy: string | null;
  createdAt: string;
}

export interface LionDraft {
  name: string;
  track: Track;
  role: string;
  email: string;
  github: string;
  skillsText: string;
  motto: string;
  status: LionStatus;
}

export interface FilterOptions {
  query: string;
  track: TrackFilter;
  sort: SortOption;
}

export function isTrack(value: string | null): value is Track {
  return TRACK_OPTIONS.some((track) => track === value);
}

export function isLionStatus(value: string | null): value is LionStatus {
  return STATUS_OPTIONS.some((status) => status === value);
}

export function isSortOption(value: string | null): value is SortOption {
  return value === "newest" || value === "oldest" || value === "name" || value === "track";
}

export function isViewMode(value: string | null): value is ViewMode {
  return value === "summary" || value === "detail";
}
