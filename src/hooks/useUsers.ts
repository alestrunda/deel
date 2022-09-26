import { useMemo, useState } from "react";
import { api, User } from "../api";
import { debounce } from "../helpers";

const DEBOUNCE_TIMEOUT = 300;

export const useUsers = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const resetState = () => {
    setUsers([]);
    setError("");
    setIsLoading(false);
  };

  const loadUsersDebounced = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (!searchQuery) {
          resetState();
          return;
        }
        try {
          const users = await api.getUsers(searchQuery);
          setUsers(users);
        } catch (error) {
          // would be better to log the javascript error privately and for users print
          // some nice user-friendly message
          let message = "Unknown error";
          if (error instanceof Error) {
            message = error.message;
          }
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }, DEBOUNCE_TIMEOUT),
    []
  );

  const loadUsers = (searchQuery: string) => {
    setIsLoading(true);
    loadUsersDebounced(searchQuery);
  };

  return {
    error,
    isLoading,
    loadUsers,
    users,
  };
};
