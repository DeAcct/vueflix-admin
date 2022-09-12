import { User } from "@firebase/auth";
import { defineStore } from "pinia";
import { useLocalstorage } from "../composables/localstorage";

export const useAuth = defineStore("auth", () => {
  const [user, setUser] = useLocalstorage<User | null>("auth", null);
  return { user, setUser };
});
