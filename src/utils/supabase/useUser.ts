import type { User } from "@supabase/supabase-js"; // Assuming this is the correct import for User type
import { useEffect, useState } from "react";
import { createClient } from "./client";

export const useUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user); // Set the user state
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    void fetchUser(); // Marking the promise as intentionally ignored
  }, []);

  return user;
};
