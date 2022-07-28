<script setup lang="ts">
import VueflixSection from "@/components/VueflixSection.vue";
</script>

<template>
  <div>
    <VueflixSection>
      <template #title>등록된 애니메이션</template>
      <template #content>
        <ul class="Animes"></ul>
      </template>
    </VueflixSection>
  </div>
</template>

<style lang="scss" scoped></style>
