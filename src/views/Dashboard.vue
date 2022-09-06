<script setup lang="ts">
import { orderBy, limit } from "firebase/firestore";
import {
  useFirestoreDocs,
  useFirestoreSingleDoc,
} from "../composables/firebase";
import { useOverflow } from "../utility/number";
import VueflixSection from "@/components/VueflixSection.vue";
import AnimeListCard from "@/components/AnimeListCard.vue";
import IconBase from "@/components/IconBase.vue";
import IconArrowNext from "@/components/icons/IconArrowNext.vue";
import RecommendListCard from "@/components/RecommendListCard.vue";
import type { AnimeDoc } from "../types/AnimeDoc";
import type { Statistic } from "../types/Statistics";
import type { RecommendListDoc } from "../types/RecommendListDoc";
import StyledButton from "../components/StyledButton.vue";

const { docs: animes } = useFirestoreDocs<AnimeDoc>(
  "anime",
  orderBy("idNumber"),
  limit(3)
);
const { singleDoc: statistics } = useFirestoreSingleDoc<Statistic>(
  "statistics",
  "statistics"
);

const { docs: recommendLists } = useFirestoreDocs<RecommendListDoc>(
  "recommend",
  orderBy("idNumber"),
  limit(3)
);
</script>

<template>
  <div class="Dashboard">
    <div class="flex-wrap">
      <VueflixSection :title-center="false">
        <template #title>
          <h2 class="VueflixSection__Title">애니메이션</h2>
        </template>
        <template #counter>
          <p class="VueflixSection__Counter">
            {{ useOverflow(statistics?.numbersofAnime) }}
          </p>
        </template>
        <template #description>
          <p class="VueflixSection__Description">
            가장 최근 등록된 3개의 애니메이션입니다.
          </p>
        </template>
        <template #content>
          <ul class="VueflixSection__Contents Contents--Animes">
            <AnimeListCard
              v-for="doc in animes"
              :anime-name="doc.name"
              :poster="doc.poster"
              :tags="doc.tag"
              :made-by="doc.madeBy"
              root="li"
              type="link"
              :key="doc.name"
            >
              <template #ani-name>{{ doc.name }}</template>
            </AnimeListCard>
          </ul>
          <StyledButton
            icon
            icon-position="right"
            root="RouterLink"
            to="/anime"
            class="ViewMoreBtn"
          >
            <template #Icon>
              <IconBase icon-name="화살표">
                <IconArrowNext />
              </IconBase>
            </template>
            <template #Text>더보기</template>
          </StyledButton>
        </template>
      </VueflixSection>
      <VueflixSection :title-center="false">
        <template #title>
          <h2 class="VueflixSection__Title">추천 목록</h2>
        </template>
        <template #counter>
          <p class="VueflixSection__Counter">
            {{ useOverflow(statistics?.numbersofRecommend) }}
          </p></template
        >
        <template #description>
          <p class="VueflixSection__Description">
            가장 최근 등록된 3개의 추천 목록입니다.
          </p>
        </template>
        <template #content>
          <ul class="VueflixSection__Contents Contents--Recommend">
            <RecommendListCard
              v-for="recommendList in recommendLists"
              root="li"
              :recommend-list="recommendList"
            />
          </ul>
          <StyledButton
            icon
            icon-position="right"
            root="RouterLink"
            to="/recommend-list"
            class="ViewMoreBtn"
          >
            <template #Icon>
              <IconBase icon-name="화살표">
                <IconArrowNext />
              </IconBase>
            </template>
            <template #Text>더보기</template>
          </StyledButton>
        </template>
      </VueflixSection>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Dashboard {
  .flex-wrap {
    display: flex;
    flex-direction: column;
    .VueflixSection {
      margin-bottom: 2.5rem;
      &__Title {
        font-size: 1.7rem;
      }
      &__Counter {
        font-size: 1.5rem;
      }
      &__Description {
        font-size: 1.4rem;
        margin-top: 0.7rem;
      }
      &__Contents {
        width: 100%;
        display: flex;
        flex-direction: column;
        .AnimeListCard {
          border-bottom: 1px solid var(--bg-200);
        }
      }
    }

    .ViewMoreBtn {
      background-color: var(--bg-200);
      margin: 1.5rem 0;
      align-self: center;
    }
  }
}

@media screen and (min-width: 768px) {
  .Dashboard {
    .flex-wrap {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      .VueflixSection {
        width: 48%;
        padding: 0;
        margin: 0;
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .Dashboard {
    .flex-wrap {
      width: min(1024px, 100%);
    }
  }
}
</style>
