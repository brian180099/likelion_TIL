import { useEffect, useState } from "react";
import { getMissingSupabaseMessage, supabase } from "../lib/supabase";
import type { Lion, LionDraft } from "../types/lion";
import { createRandomLionDrafts } from "../data/lions";
import { draftToInsert, rowToLion } from "../utils/lionMapper";

export interface UseLionsResult {
  lions: Lion[];
  isLoading: boolean;
  isSaving: boolean;
  deletingId: string | null;
  message: string;
  errorMessage: string;
  refreshLions: () => Promise<void>;
  addLion: (draft: LionDraft) => Promise<boolean>;
  addRandomLions: (count: number) => Promise<boolean>;
  deleteLion: (id: string) => Promise<boolean>;
}

export function useLions(userId: string | null): UseLionsResult {
  const [lions, setLions] = useState<Lion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function loadLions(nextMessage = ""): Promise<void> {
    if (!supabase) {
      setIsLoading(false);
      setErrorMessage(getMissingSupabaseMessage());
      return;
    }

    setErrorMessage("");

    const { data, error } = await supabase
      .from("lions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    setLions((data ?? []).map(rowToLion));
    setMessage(nextMessage);
    setIsLoading(false);
  }

  useEffect(() => {
    const client = supabase;

    if (!client) {
      setIsLoading(false);
      setErrorMessage(getMissingSupabaseMessage());
      return undefined;
    }

    void loadLions();

    const channel = client
      .channel("public-lions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lions" },
        () => {
          void loadLions("데이터베이스 변경 사항을 반영했습니다.");
        },
      )
      .subscribe();

    return () => {
      void client.removeChannel(channel);
    };
  }, []);

  async function refreshLions(): Promise<void> {
    setIsLoading(true);
    await loadLions("명단을 새로 불러왔습니다.");
  }

  async function addLion(draft: LionDraft): Promise<boolean> {
    if (!supabase) {
      setErrorMessage(getMissingSupabaseMessage());
      return false;
    }

    if (!userId) {
      setErrorMessage("로그인한 사용자만 명단을 추가할 수 있습니다.");
      return false;
    }

    setIsSaving(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("lions")
      .insert(draftToInsert(draft, userId))
      .select("*")
      .single();

    setIsSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return false;
    }

    if (data) {
      const addedLion = rowToLion(data);
      setLions((prev) => [addedLion, ...prev.filter((lion) => lion.id !== addedLion.id)]);
    }

    setMessage("아기사자 명단이 Supabase에 저장되었습니다.");
    return true;
  }

  async function addRandomLions(count: number): Promise<boolean> {
    if (!supabase) {
      setErrorMessage(getMissingSupabaseMessage());
      return false;
    }

    if (!userId) {
      setErrorMessage("로그인한 사용자만 랜덤 명단을 추가할 수 있습니다.");
      return false;
    }

    setIsSaving(true);
    setErrorMessage("");

    const rows = createRandomLionDrafts(count).map((draft) => draftToInsert(draft, userId));
    const { data, error } = await supabase.from("lions").insert(rows).select("*");

    setIsSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return false;
    }

    if (data) {
      const newLions = data.map(rowToLion);
      setLions((prev) => [
        ...newLions,
        ...prev.filter((lion) => !newLions.some((newLion) => newLion.id === lion.id)),
      ]);
    }

    setMessage(`랜덤 아기사자 ${count}명을 Supabase에 저장했습니다.`);
    return true;
  }

  async function deleteLion(id: string): Promise<boolean> {
    if (!supabase) {
      setErrorMessage(getMissingSupabaseMessage());
      return false;
    }

    if (!userId) {
      setErrorMessage("로그인한 사용자만 명단을 삭제할 수 있습니다.");
      return false;
    }

    setDeletingId(id);
    setErrorMessage("");

    const { error } = await supabase.from("lions").delete().eq("id", id);

    setDeletingId(null);

    if (error) {
      setErrorMessage(error.message);
      return false;
    }

    setLions((prev) => prev.filter((lion) => lion.id !== id));
    setMessage("아기사자 명단을 삭제했습니다.");
    return true;
  }

  return {
    lions,
    isLoading,
    isSaving,
    deletingId,
    message,
    errorMessage,
    refreshLions,
    addLion,
    addRandomLions,
    deleteLion,
  };
}
