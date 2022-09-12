<script lang="ts" setup>
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { useRouter } from "vue-router";
import { getLocalstorage } from "../composables/localstorage";
import { useAuth } from "../store/auth";
const auth = getAuth();
const authStore = useAuth();
onAuthStateChanged(auth, (user) => {
  authStore.setUser(user);
});

const router = useRouter();
router.beforeEach((to, from) => {
  const isLoggedIn = getLocalstorage("auth");
  if (isLoggedIn) {
    return;
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    router.replace("/login");
  }
});

// onMounted(() => {
//   console.log(authStore.user, route.meta.requiresAuth);
//   if (!authStore.user && route.meta) {
//     router.replace("/login");
//   }
// });
// router.beforeEach((to) => {
//   const a = useAuth();
//   console.log(a, to.meta);
// });
</script>

<template>
  <slot name="default" />
</template>
