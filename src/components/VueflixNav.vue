<script lang="ts" setup>
import { Ref, ref, watch, onMounted } from "vue";
import VueflixLogo from "./VueflixLogo.vue";
import { RouteRecordName, useRoute, useRouter } from "vue-router";
import IconBase from "./IconBase.vue";
import NewProjectIcon from "./icons/NewProjectIcon.vue";
import { useEventListener } from "../composables/event";
import IconArrowNext from "./icons/IconArrowNext.vue";
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
      <h1 class="VueflixNav__Logo inner">
        <RouterLink to="/">
          <VueflixLogo />
          <span class="AdminText">어드민</span>
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
    <button class="VueflixNav__ExpandButton">
      <i class="icon">
        <IconBase icon-name="사이트 메뉴 닫기버튼">
          <IconArrowNext />
        </IconBase>
      </i>
    </button>
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
    padding-right: var(--card-padding);
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

  &__ExpandButton {
    display: none;
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

@media screen and (min-width: 1024px) {
  .VueflixNav {
    width: var(--nav-width);
    &__Logo {
      display: block;
      height: 14rem;
      padding-top: 2rem;
      a {
        display: flex;
        align-items: center;
        .AdminText {
          margin-left: 1rem;
          font-weight: 700;
        }
      }
    }
    &__Title {
      display: none;
    }
    &__ExpandButton {
      position: fixed;
      width: 4.8rem;
      height: 4.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      left: calc(var(--nav-width) - 2.4rem);
      top: calc(50% - 2.4rem);
      background-color: var(--bg-100);
      box-shadow: var(--box-shadow);
      border-radius: 50%;
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        transform: rotateY(180deg);
        transition: 150ms ease-out;
      }
      &--Shrinked .icon {
        transform: rotateY(0);
      }
    }
  }
}
</style>
