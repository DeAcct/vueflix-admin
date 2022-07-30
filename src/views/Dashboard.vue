<script setup lang="ts">
import VueflixSection from "@/components/VueflixSection.vue";
import { orderBy } from "firebase/firestore";
import { useFirestoreDocs } from "../composables/firebase";

const { docs, error } = useFirestoreDocs("anime", orderBy("idNumber"));
console.log(docs.value, error.value);
</script>

<template>
  <div>
    <VueflixSection>
      <template #title>등록된 애니메이션</template>
      <template #content>
        <ul class="Animes">
          <li v-for="doc in docs">{{ doc.name }}</li>
        </ul>
      </template>
    </VueflixSection>
  </div>
</template>

<style lang="scss" scoped></style>
