<script lang="ts" setup>
import { onAuthStateChanged, getAuth } from "@firebase/auth";
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
  const isLoggedIn = getLocalstorage("auth");
  if (isLoggedIn) {
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
