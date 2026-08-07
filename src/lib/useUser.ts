"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

/** 클라이언트에서 로그인 상태를 구독한다.
 *  ready 가 false 인 동안에는 로그인/비로그인 UI 깜빡임을 막기 위해 판단을 보류한다. */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, ready };
}

/** user_metadata.full_name → email 순으로 표시 이름을 고른다. */
export function displayNameOf(user: User | null): string {
  return (
    (user?.user_metadata?.full_name as string | undefined)?.trim() ||
    user?.email ||
    "회원"
  );
}
