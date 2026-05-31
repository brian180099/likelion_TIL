import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { initialLions } from "../data/lions";
import type {
  Lion,
  LionForm,
  LionFormChangeEvent,
  LionFormSubmitEvent,
  RequestAction,
  RequestState,
  ViewOption,
  ViewOptionChangeEvent,
} from "../types/lion";
import { filterLions } from "../utils/filterLions";
import {
  createLionFromUser,
  createRandomFormValue,
  fetchRandomUsers,
} from "../utils/randomUser";
import {
  buildViewSearchParams,
  DEFAULT_VIEW_OPTION,
  parseViewOptions,
  updateViewOption,
} from "../utils/viewOptions";

const emptyForm: LionForm = {
  name: "",
  part: "Frontend",
  imageUrl: "",
  keyword: "",
  intro: "",
  goal: "",
  favorite: "",
};

const readyState: RequestState = {
  status: "ready",
  message: "준비 완료",
  lastAction: null,
};

const lionFormFieldNames: readonly string[] = [
  "name",
  "part",
  "imageUrl",
  "keyword",
  "intro",
  "goal",
  "favorite",
];

function isLionFormField(name: string): name is keyof LionForm {
  return lionFormFieldNames.includes(name);
}

export interface UseLionsResult {
  lions: Lion[];
  visibleLions: Lion[];
  isFormOpen: boolean;
  form: LionForm;
  viewOption: ViewOption;
  requestState: RequestState;
  canSubmit: boolean;
  openForm: () => void;
  closeForm: () => void;
  changeForm: (event: LionFormChangeEvent) => void;
  changeViewOption: (event: ViewOptionChangeEvent) => void;
  addLion: (event: LionFormSubmitEvent) => void;
  deleteLastLion: () => void;
  fillRandomForm: () => void;
  addRandomLions: (count: number) => void;
  refreshLions: () => void;
  retryLastRequest: () => void;
}

export function useLions(): UseLionsResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lions, setLions] = useState<Lion[]>(initialLions);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [form, setForm] = useState<LionForm>(emptyForm);
  const [requestState, setRequestState] = useState<RequestState>(readyState);
  const [viewOption, setViewOption] = useState<ViewOption>(() =>
    parseViewOptions(searchParams),
  );

  const visibleLions = filterLions(lions, viewOption);
  const canSubmit = Object.values(form).every((value) => value.trim() !== "");

  useEffect(() => {
    setViewOption(parseViewOptions(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (!isFormOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeForm();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isFormOpen]);

  function openForm(): void {
    setIsFormOpen((prev) => !prev);
  }

  function closeForm(): void {
    setForm(emptyForm);
    setIsFormOpen(false);
  }

  function changeForm(event: LionFormChangeEvent): void {
    const { name, value } = event.currentTarget;

    if (!isLionFormField(name)) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function changeViewOption(event: ViewOptionChangeEvent): void {
    const { name, value } = event.currentTarget;
    const nextViewOption = updateViewOption(viewOption, name, value);

    setViewOption(nextViewOption);
    setSearchParams(buildViewSearchParams(nextViewOption));
  }

  function addLion(event: LionFormSubmitEvent): void {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const newLion: Lion = {
      id: `local-${Date.now()}`,
      ...form,
      addedAt: Date.now(),
      isMine: false,
    };

    setLions((prev) => [...prev, newLion]);
    closeForm();
  }

  function deleteLastLion(): void {
    setLions((prev) => prev.slice(0, -1));
  }

  async function runRequest(action: RequestAction): Promise<void> {
    setRequestState({
      status: "loading",
      message: "불러오는 중...",
      lastAction: action,
    });

    try {
      await action();
      setRequestState({
        status: "success",
        message: "완료!",
        lastAction: action,
      });

      window.setTimeout(() => {
        setRequestState((prev) =>
          prev.status === "success" ? { ...readyState, lastAction: action } : prev,
        );
      }, 1000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

      setRequestState({
        status: "error",
        message: `불러오기 실패: ${message}`,
        lastAction: action,
      });
    }
  }

  function addRandomLions(count: number): void {
    const action = async () => {
      const users = await fetchRandomUsers(count);

      setLions((prev) => {
        const startOrder = Date.now();
        const newLions = users.map((user, index) =>
          createLionFromUser(user, startOrder + index),
        );

        return [...prev, ...newLions];
      });
    };

    void runRequest(action);
  }

  function refreshLions(): void {
    const action = async () => {
      const myCards = lions.filter((lion) => lion.isMine);
      const randomCount = Math.max(lions.length - myCards.length, 0);
      const users = await fetchRandomUsers(randomCount);

      setLions(() => {
        const startOrder = Date.now();
        const randomLions = users.map((user, index) =>
          createLionFromUser(user, startOrder + index),
        );

        return [...myCards, ...randomLions];
      });
    };

    void runRequest(action);
  }

  function fillRandomForm(): void {
    const action = async () => {
      const [user] = await fetchRandomUsers(1);

      if (user) {
        setForm(createRandomFormValue(user));
        setIsFormOpen(true);
      }
    };

    void runRequest(action);
  }

  function retryLastRequest(): void {
    if (requestState.lastAction) {
      void runRequest(requestState.lastAction);
    }
  }

  return {
    lions,
    visibleLions,
    isFormOpen,
    form,
    viewOption,
    requestState,
    canSubmit,
    openForm,
    closeForm,
    changeForm,
    changeViewOption,
    addLion,
    deleteLastLion,
    fillRandomForm,
    addRandomLions,
    refreshLions,
    retryLastRequest,
  };
}
