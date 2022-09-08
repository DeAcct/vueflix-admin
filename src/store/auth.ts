import { User } from "@firebase/auth";
import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const user: Ref<User | null> = ref(null);
  function setUser(userData: User | null) {
    user.value = userData;
  }
  return { user, setUser };
});
