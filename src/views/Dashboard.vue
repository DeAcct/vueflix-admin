<script setup lang="ts">
import { orderBy, limit } from "firebase/firestore";
import {
  useFirestoreDocs,
  useFirestoreSingleDoc,
} from "../composables/firebase";
import VueflixSection from "@/components/VueflixSection.vue";
import AnimeListCard from "@/components/AnimeListCard.vue";
import IconBase from "@/components/IconBase.vue";
import IconArrowNext from "@/components/icons/IconArrowNext.vue";
import type { AnimeDoc } from "../types/AnimeDoc";
import type { Statistic } from "../types/Statistics";
import { computed } from "vue";
import RecommendListCard from "../components/RecommendListCard.vue";

const { docs: animes } = useFirestoreDocs<AnimeDoc>(
  "anime",
  orderBy("idNumber"),
  limit(3)
);
const { _doc: statistics } = useFirestoreSingleDoc<Statistic>(
  "statistics",
  "statistics"
);
const numbersofAnime = computed<number | string>(() => {
  if (statistics.value) {
    if (statistics.value.numbersofAnime > 999) {
      return "999+";
    }
    return statistics.value.numbersofAnime;
  } else {
    return 0;
  }
});
</script>

<template>
  <div class="Dashboard">
    <VueflixSection>
      <template #title>애니메이션</template>
      <template #counter>
        <p class="Counter">{{ numbersofAnime }}</p>
      </template>
      <template #description>
        <p class="Description">가장 최근 등록된 3개의 애니메이션입니다.</p>
      </template>
      <template #content>
        <ul class="Contents Contents--Animes">
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
    <VueflixSection>
      <template #title>추천 목록</template>
      <template #description>
        <p class="Description">가장 최근 등록된 3개의 추천 목록입니다.</p>
      </template>
      <template #content>
        <ul class="Contents Contents--Recommend">
          <RecommendListCard
            root-type="li"
            recommend-title="너를 위해서라면 몇 번이라도! 타임루프물"
          />
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
  .Counter {
    font-size: 1.5rem;
  }
  .Description {
    font-size: 1.4rem;
    margin-top: 0.7rem;
  }
  .Contents {
    width: 100%;
    display: flex;
    flex-direction: column;
    .AnimeListCard {
      border-bottom: 1px solid var(--bg-200);
    }
  }
  .ViewMoreBtn {
    width: 12rem;
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 9999px;
    background-color: var(--bg-200);
    font-size: 1.5rem;
    font-weight: 500;
    &__Icon {
      width: 1.8rem;
      height: 1.8rem;
    }
    margin: 1.5rem 0;
  }
}
</style>
