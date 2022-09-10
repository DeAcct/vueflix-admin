<script lang="ts" setup>
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../store/auth";
const auth = getAuth();
const authStore = useAuth();
onAuthStateChanged(auth, (user) => {
  authStore.setUser(user);
});

const route = useRoute();
const router = useRouter();
watch(
  () => route.meta.requiresAuth,
  () => {
    console.log(route.meta.requiresAuth);
    if (route.meta.requiresAuth && !authStore.user) {
      console.log("로그인이 되어 있지 않아 로그인 뷰로 보냄");
      router.replace("/login");
    }
  }
);
</script>

<template>
  <slot name="default" />
</template>
