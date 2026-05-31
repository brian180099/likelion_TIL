import type { ChangeEvent, FormEvent } from "react";

export type LionPart = "Frontend" | "Backend" | "Design";
export type LionPartFilter = LionPart | "전체";
export type SortOption = "latest" | "name";
export type RequestStatus = "ready" | "loading" | "success" | "error";
export type RequestAction = () => Promise<void>;

export interface Lion {
  id: string;
  name: string;
  part: LionPart;
  imageUrl: string;
  keyword: string;
  intro: string;
  goal: string;
  favorite: string;
  addedAt: number;
  isMine: boolean;
}

export type LionForm = Pick<
  Lion,
  "name" | "part" | "imageUrl" | "keyword" | "intro" | "goal" | "favorite"
>;

export interface ViewOption {
  part: LionPartFilter;
  sort: SortOption;
  search: string;
}

export interface RequestState {
  status: RequestStatus;
  message: string;
  lastAction: RequestAction | null;
}

export interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  picture: {
    large: string;
  };
  location: {
    country: string;
  };
}

export interface RandomUserApiResponse {
  results: RandomUser[];
}

export type LionFormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type ViewOptionChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type LionFormSubmitEvent = FormEvent<HTMLFormElement>;
