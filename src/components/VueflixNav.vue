<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
import VueflixLogo from "./VueflixLogo.vue";
import { RouteRecordName, useRoute, useRouter } from "vue-router";
const navProps = defineProps<{
  isOpen: boolean;
}>();

const navEmits = defineEmits(["address-move"]);

interface SiteLinkItem {
  name: string;
  to: string;
}
const siteLinks: Ref<Array<SiteLinkItem>> = ref([
  {
    name: "대시보드",
    to: "/",
  },
  {
    name: "애니메이션",
    to: "/anime",
  },
  {
    name: "추천 목록",
    to: "/recommend-list",
  },
]);

const route = useRoute();
const router = useRouter();
const currentAddress: Ref<RouteRecordName> = ref("");
watch(
  () => route.name,
  () => {
    if (route.name) {
      currentAddress.value = route.name;
    }
  }
);
function routeTo(address: string) {
  router.push(address);
  navEmits("address-move");
}
</script>

<template>
  <nav class="VueflixNav">
    <h1 class="VueflixNav__Logo">
      <RouterLink to="/">
        <VueflixLogo />
        <span>관리자</span>
      </RouterLink>
    </h1>
    <h2 class="VueflixNav__Title inner">사이트 메뉴</h2>
    <ul class="VueflixNav__SiteMenu">
      <li
        :class="[
          'SiteLink',
          { 'SiteLink--Current': siteLink.name === currentAddress },
        ]"
        v-for="siteLink in siteLinks"
        :key="siteLink.name"
      >
        <button class="inner" @click="routeTo(siteLink.to)" role="link">
          {{ siteLink.name }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.VueflixNav {
  background-color: var(--text-100);
  width: 100vw;
  height: 100vh;
  &__Logo {
    display: none;
  }
  &__Title {
    font-size: 2rem;
    margin-top: 7.6rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
  }
  &__SiteMenu {
    padding-right: var(--inner-padding);
    .SiteLink {
      display: flex;
      button {
        display: flex;
        font-size: 1.7rem;
        font-weight: 700;
        width: 100%;
        padding: {
          top: var(--card-padding);
          bottom: var(--card-padding);
        }
      }
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
      &--Current {
        background-color: var(--text-300);
      }
    }
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
