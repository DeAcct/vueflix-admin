<script lang="ts" setup>
import { Ref, ref, watch, onMounted } from "vue";
import VueflixLogo from "./VueflixLogo.vue";
import { RouteRecordName, useRoute, useRouter } from "vue-router";
import IconBase from "./IconBase.vue";
import NewProjectIcon from "./icons/NewProjectIcon.vue";
import { useEventListener } from "../composables/event";
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

const viewHeight: Ref<string> = ref("");
onMounted(() => {
  viewHeight.value = `${window.innerHeight}px`;
});
useEventListener(window, "scroll", () => {
  viewHeight.value = `${window.innerHeight}px`;
});
</script>

<template>
  <nav class="VueflixNav">
    <div class="row-top">
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
    </div>
    <div class="row-bottom">
      <button class="NewProjectButton" @click="routeTo('#')">
        <i class="NewProjectButton__Icon">
          <IconBase icon-name="새 프로젝트 아이콘">
            <NewProjectIcon />
          </IconBase>
        </i>
        새 프로젝트 만들기
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.VueflixNav {
  background-color: var(--text-100);
  width: 100vw;
  height: v-bind(viewHeight);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  &__Logo {
    display: none;
  }
  &__Title {
    font-size: 2rem;
    margin-top: 7.6rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
  }
  .row-bottom {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
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
        border-top-right-radius: 9999px;
        border-bottom-right-radius: 9999px;
      }
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
      &--Current {
        background-color: var(--text-300);
      }
    }
  }
  .NewProjectButton {
    width: 20rem;
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
