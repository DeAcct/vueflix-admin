<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.meta.authRequired);
</script>

<template>
  <div>애니메이션 상세페이지</div>
</template>
