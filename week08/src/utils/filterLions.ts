import type { Lion, ViewOption } from "../types/lion";

export function filterLions(lions: Lion[], viewOption: ViewOption): Lion[] {
  const keyword = viewOption.search.trim().toLowerCase();

  return lions
    .filter((lion) => viewOption.part === "전체" || lion.part === viewOption.part)
    .filter((lion) => lion.name.toLowerCase().includes(keyword))
    .slice()
    .sort((a, b) => {
      if (viewOption.sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return b.addedAt - a.addedAt;
    });
}
