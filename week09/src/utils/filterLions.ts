import type { FilterOptions, Lion } from "../types/lion";

function matchesQuery(lion: Lion, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    lion.name,
    lion.track,
    lion.role,
    lion.email,
    lion.github,
    lion.motto,
    lion.skills.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export function filterAndSortLions(lions: Lion[], options: FilterOptions): Lion[] {
  const filtered = lions.filter((lion) => {
    const trackMatches = options.track === "all" || lion.track === options.track;
    return trackMatches && matchesQuery(lion, options.query);
  });

  return [...filtered].sort((first, second) => {
    if (options.sort === "oldest") {
      return Date.parse(first.createdAt) - Date.parse(second.createdAt);
    }

    if (options.sort === "name") {
      return first.name.localeCompare(second.name, "ko");
    }

    if (options.sort === "track") {
      return first.track.localeCompare(second.track, "en");
    }

    return Date.parse(second.createdAt) - Date.parse(first.createdAt);
  });
}
