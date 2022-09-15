<script lang="ts" setup>
import { onAuthStateChanged, getAuth, User } from "@firebase/auth";
import { useRouter } from "vue-router";
import { useAuth } from "../store/auth";
import { getLocalstorage } from "../composables/localstorage";
const auth = getAuth();
const authStore = useAuth();
onAuthStateChanged(auth, (user) => {
  authStore.setUser(user);
});

const router = useRouter();
router.beforeEach((to) => {
  //로컬스토리지가 사용자에 의해 오염되었을 때를 대비.
  //예) auth에 임의로 true가 입력되었을 때
  const isLoggedIn = getLocalstorage("auth") as User;
  if (isLoggedIn?.uid) {
    return;
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    router.replace("/login");
  }
});
</script>

<template>
  <slot name="default" />
</template>
