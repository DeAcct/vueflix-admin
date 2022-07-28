<script lang="ts" setup>
import VueflixLogo from "./VueflixLogo.vue";
const navProps = defineProps<{
  isOpen: boolean;
}>();
</script>

<template>
  <nav class="VueflixNav">
    <h1 class="VueflixNav__Logo">
      <RouterLink to="/">
        <VueflixLogo />
        <span>관리자</span>
      </RouterLink>
    </h1>
  </nav>
</template>

<style lang="scss" scoped>
.VueflixNav {
  width: 100vw;
  height: 100vh;
  &__Logo {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .VueflixNav {
    &__Logo {
      display: block;
    }
  }
}
</style>
