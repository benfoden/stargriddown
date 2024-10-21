import { type User } from "@supabase/supabase-js";
import { api } from "~/trpc/server";
import { createClient } from "./server";

export type AuthUser = User & {
  name: string;
};

export const getUser = async (): Promise<AuthUser | null> => {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const userData = await api.user.read();

    const { name } = userData!;
    return { ...user, name: name ?? "" };
  } catch (error) {
    console.error(error);
    return null;
  }
};
