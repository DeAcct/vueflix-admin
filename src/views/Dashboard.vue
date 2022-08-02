<script setup lang="ts">
import { orderBy, limit } from "firebase/firestore";
import { useFirestoreDocs } from "../composables/firebase";
import VueflixSection from "@/components/VueflixSection.vue";
import AnimeListCard from "../components/AnimeListCard.vue";
import IconBase from "../components/IconBase.vue";
import IconArrowNext from "../components/icons/IconArrowNext.vue";
import { AnimeDoc } from "../types/AnimeDoc";

const { docs: animes } = useFirestoreDocs<AnimeDoc>(
  "anime",
  orderBy("idNumber"),
  limit(3)
);
</script>

<template>
  <div class="Dashboard">
    <VueflixSection>
      <template #title>등록된 애니메이션</template>
      <template #counter><p></p></template>
      <template #content>
        <ul class="Animes">
          <AnimeListCard
            v-for="doc in animes"
            :anime-name="doc.name"
            :poster="doc.poster"
            :tags="doc.tag"
            :made-by="doc.madeBy"
            root-type="li"
            :key="doc.name"
          >
            <template #ani-name>{{ doc.name }}</template>
          </AnimeListCard>
        </ul>
        <RouterLink to="#" class="ViewMoreBtn">
          더보기
          <i class="ViewMoreBtn__Icon">
            <IconBase icon-name="화살표">
              <IconArrowNext />
            </IconBase>
          </i>
        </RouterLink>
      </template>
    </VueflixSection>
  </div>
</template>

<style lang="scss" scoped>
.Dashboard {
  .Animes {
    display: flex;
    flex-direction: column;
    .AnimeListCard {
      &:not(:last-child) {
        border-bottom: 1px solid var(--bg-200);
      }
    }
    border-bottom: 1px solid var(--bg-300);
  }
  .ViewMoreBtn {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    &__Icon {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
}
</style>
