import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getMissingSupabaseMessage, supabase } from "../lib/supabase";

export interface AuthActionResult {
  ok: boolean;
  message: string;
}

export interface UseAuthResult {
  user: User | null;
  email: string;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthActionResult>;
  signUp: (email: string, password: string) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
}

function toKoreanAuthMessage(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }

  if (lowerMessage.includes("already") || lowerMessage.includes("registered")) {
    return "이미 가입된 이메일입니다.";
  }

  if (lowerMessage.includes("password")) {
    return "비밀번호 조건을 확인해 주세요.";
  }

  return message;
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!supabase) {
      setIsAuthLoading(false);
      return undefined;
    }

    let isMounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setUser(data.session?.user ?? null);
        setIsAuthLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string): Promise<AuthActionResult> {
    if (!supabase) {
      return { ok: false, message: getMissingSupabaseMessage() };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { ok: false, message: toKoreanAuthMessage(error.message) };
    }

    setUser(data.user);
    return { ok: true, message: "로그인되었습니다." };
  }

  async function signUp(email: string, password: string): Promise<AuthActionResult> {
    if (!supabase) {
      return { ok: false, message: getMissingSupabaseMessage() };
    }

    if (password.length < 6) {
      return { ok: false, message: "비밀번호는 최소 6자 이상이어야 합니다." };
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      return { ok: false, message: toKoreanAuthMessage(error.message) };
    }

    setUser(data.user);
    return { ok: true, message: "회원가입이 완료되었습니다." };
  }

  async function signOut(): Promise<AuthActionResult> {
    if (!supabase) {
      return { ok: false, message: getMissingSupabaseMessage() };
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      return { ok: false, message: error.message };
    }

    setUser(null);
    return { ok: true, message: "로그아웃되었습니다." };
  }

  return {
    user,
    email: user?.email ?? "",
    isAuthenticated: Boolean(user),
    isAuthLoading,
    signIn,
    signUp,
    signOut,
  };
}
