import type { LionPartFilter, SortOption, ViewOption } from "../types/lion";
import { PARTS } from "./randomUser";

export const DEFAULT_VIEW_OPTION: ViewOption = {
  part: "전체",
  sort: "latest",
  search: "",
};

export function isLionPartFilter(value: string): value is LionPartFilter {
  return value === "전체" || PARTS.some((part) => part === value);
}

export function isSortOption(value: string): value is SortOption {
  return value === "latest" || value === "name";
}

export function parseViewOptions(searchParams: URLSearchParams): ViewOption {
  const partParam = searchParams.get("part") ?? DEFAULT_VIEW_OPTION.part;
  const sortParam = searchParams.get("sort") ?? DEFAULT_VIEW_OPTION.sort;
  const searchParam = searchParams.get("search") ?? DEFAULT_VIEW_OPTION.search;

  return {
    part: isLionPartFilter(partParam) ? partParam : DEFAULT_VIEW_OPTION.part,
    sort: isSortOption(sortParam) ? sortParam : DEFAULT_VIEW_OPTION.sort,
    search: searchParam,
  };
}

export function buildViewSearchParams(viewOption: ViewOption): URLSearchParams {
  const params = new URLSearchParams();

  if (viewOption.part !== DEFAULT_VIEW_OPTION.part) {
    params.set("part", viewOption.part);
  }

  if (viewOption.sort !== DEFAULT_VIEW_OPTION.sort) {
    params.set("sort", viewOption.sort);
  }

  if (viewOption.search.trim() !== "") {
    params.set("search", viewOption.search.trim());
  }

  return params;
}

export function updateViewOption(
  current: ViewOption,
  name: string,
  value: string,
): ViewOption {
  if (name === "part" && isLionPartFilter(value)) {
    return { ...current, part: value };
  }

  if (name === "sort" && isSortOption(value)) {
    return { ...current, sort: value };
  }

  if (name === "search") {
    return { ...current, search: value };
  }

  return current;
}
