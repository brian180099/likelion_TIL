import { useEffect, useState } from "react";
import { getMissingSupabaseMessage, supabase } from "../lib/supabase";
import type { Lion } from "../types/lion";
import { rowToLion } from "../utils/lionMapper";

export interface UseLionDetailResult {
  lion: Lion | null;
  isLoading: boolean;
  errorMessage: string;
}

export function useLionDetail(id: string | undefined): UseLionDetailResult {
  const [lion, setLion] = useState<Lion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setErrorMessage("잘못된 상세 페이지 주소입니다.");
      return undefined;
    }

    if (!supabase) {
      setIsLoading(false);
      setErrorMessage(getMissingSupabaseMessage());
      return undefined;
    }

    let isMounted = true;

    void supabase
      .from("lions")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!isMounted) {
          return;
        }

        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }

        setLion(data ? rowToLion(data) : null);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { lion, isLoading, errorMessage };
}
