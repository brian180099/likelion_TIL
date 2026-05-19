import { useEffect, useMemo, useState } from "react";
import { initialLions } from "../data/lions.js";
import {
  createLionFromUser,
  createRandomFormValue,
  fetchRandomUsers,
} from "../utils/randomUser.js";

const emptyForm = {
  name: "",
  part: "Frontend",
  imageUrl: "",
  keyword: "",
  intro: "",
  goal: "",
  favorite: "",
};

const readyState = {
  status: "ready",
  message: "준비 완료",
  lastAction: null,
};

export function useLions() {
  const [lions, setLions] = useState(initialLions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [requestState, setRequestState] = useState(readyState);
  const [viewOption, setViewOption] = useState({
    part: "전체",
    sort: "latest",
    search: "",
  });

  const canSubmit = Object.values(form).every((value) => value.trim() !== "");

  const visibleLions = useMemo(() => {
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
  }, [lions, viewOption]);

  useEffect(() => {
    if (!isFormOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeForm();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isFormOpen]);

  function openForm() {
    setIsFormOpen((prev) => !prev);
  }

  function closeForm() {
    setForm(emptyForm);
    setIsFormOpen(false);
  }

  function changeForm(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function changeViewOption(event) {
    const { name, value } = event.target;
    setViewOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function addLion(event) {
    event.preventDefault();

    if (!canSubmit) return;

    const newLion = {
      id: `local-${Date.now()}`,
      ...form,
      addedAt: Date.now(),
      isMine: false,
    };

    setLions((prev) => [...prev, newLion]);
    closeForm();
  }

  function deleteLastLion() {
    setLions((prev) => prev.slice(0, -1));
  }

  async function runRequest(action) {
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
      setRequestState({
        status: "error",
        message: `불러오기 실패: ${error.message}`,
        lastAction: action,
      });
    }
  }

  function addRandomLions(count) {
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

    runRequest(action);
  }

  function refreshLions() {
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

    runRequest(action);
  }

  function fillRandomForm() {
    const action = async () => {
      const [user] = await fetchRandomUsers(1);
      setForm(createRandomFormValue(user));
      setIsFormOpen(true);
    };

    runRequest(action);
  }

  function retryLastRequest() {
    if (requestState.lastAction) {
      runRequest(requestState.lastAction);
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
