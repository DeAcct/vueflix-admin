<script lang="ts" setup>
import { onAuthStateChanged, User, getAuth } from "@firebase/auth";
import { useAuth } from "../store/auth";
const auth = getAuth();
const authStore = useAuth();
onAuthStateChanged(auth, (user) => {
  authStore.setUser(user);
});
</script>

<template>
  <slot name="default" />
</template>
