<script lang="ts" setup>
import { Ref, ref, computed, watch, onMounted, shallowRef } from "vue";
import VueflixLogo from "./VueflixLogo.vue";
import { RouteRecordName, useRoute, useRouter } from "vue-router";
import IconBase from "./IconBase.vue";
import IconDashboard from "./icons/IconDashboard.vue";
import IconAnime from "./icons/IconAnime.vue";
import IconRecommendList from "./icons/IconRecommendList.vue";
import NewProjectIcon from "./icons/NewProjectIcon.vue";
import { useEventListener } from "../composables/event";
import IconArrowNext from "./icons/IconArrowNext.vue";
import { OptionalClassItem } from "../types/Classes";
import { useNav } from "../store/nav";
import { useA11y } from "../store/accessibility";
import { storeToRefs } from "pinia";

interface SiteLinkItem {
  name: string;
  to: string;
  icon: string;
}
const siteLinks: Ref<Array<SiteLinkItem>> = ref([
  {
    name: "대시보드",
    to: "/",
    icon: shallowRef(IconDashboard),
  },
  {
    name: "애니메이션",
    to: "/anime",
    icon: shallowRef(IconAnime),
  },
  {
    name: "추천 목록",
    to: "/recommend-list",
    icon: shallowRef(IconRecommendList),
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
  navStore.closeNav();
}

const viewHeight: Ref<string> = ref("");
onMounted(() => {
  viewHeight.value = `${window.innerHeight}px`;
});
useEventListener(window, "resize", () => {
  viewHeight.value = `${window.innerHeight}px`;
});

const navStore = useNav();
const { isNavOpen, navWidth } = storeToRefs(navStore);
function navToggle() {
  navStore.toggleNav();
}
const vueflixNavClasses = computed<Array<OptionalClassItem>>(() => [
  "VueflixNav",
  { "VueflixNav--Shrinked": !isNavOpen.value },
]);
const expandButtonClasses = computed<Array<OptionalClassItem>>(() => [
  "VueflixNav__ExpandButton",
  { "VueflixNav__ExpandButton--Shrinked": isNavOpen.value },
]);
const adminTextClasses = computed<Array<OptionalClassItem>>(() => [
  "AdminText",
  { blind: !isNavOpen.value },
]);
const siteLinkClasses = computed<Array<OptionalClassItem>>(() => [
  "SiteLink",
  { "SiteLink--Shrinked": !isNavOpen.value },
]);
const siteLinkTextClasses = computed<Array<OptionalClassItem>>(() => [
  "SiteLink__Text",
  { blind: !isNavOpen.value },
]);
const newProjectButtonText = computed<Array<OptionalClassItem>>(() => [
  "NewProjectButton__Text",
  { blind: !isNavOpen.value },
]);

const a11yStore = useA11y();
const { reduceMotion } = storeToRefs(a11yStore);
const transition = computed<{ time: string; easing: string }>(() =>
  reduceMotion.value
    ? { time: "none", easing: "" }
    : { time: "150ms", easing: "cubic-bezier(0.85, 0, 0.15, 1)" }
);
</script>

<template>
  <nav :class="vueflixNavClasses">
    <div class="row-top">
      <h1 class="VueflixNav__Logo">
        <RouterLink to="/">
          <VueflixLogo />
          <span :class="adminTextClasses">어드민</span>
        </RouterLink>
      </h1>
      <h2 class="VueflixNav__Title inner">사이트 메뉴</h2>
      <ul class="VueflixNav__SiteMenu">
        <li
          :class="[
            ...siteLinkClasses,
            { 'SiteLink--Current': siteLink.name === currentAddress },
          ]"
          v-for="siteLink in siteLinks"
          :key="siteLink.name"
        >
          <button @click="routeTo(siteLink.to)" role="link">
            <i class="SiteLink__Icon">
              <IconBase :icon-name="siteLink.name">
                <component :is="siteLink.icon" />
              </IconBase>
            </i>
            <span :class="siteLinkTextClasses">
              {{ siteLink.name }}
            </span>
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
        <span :class="newProjectButtonText"> 새 프로젝트 만들기 </span>
      </button>
    </div>
    <button :class="expandButtonClasses" @click="navToggle">
      <i class="icon">
        <IconBase :icon-name="`사이트 메뉴 ${isNavOpen ? '닫기' : '열기'}버튼`">
          <IconArrowNext />
        </IconBase>
        <span class="blind">
          {{ `사이트 메뉴 ${isNavOpen ? "닫기" : "열기"}버튼` }}
        </span>
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
    .SiteLink {
      display: flex;
      width: calc(100% - var(--card-padding));
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
      button {
        display: flex;
        align-items: center;
        width: 100%;
        padding: var(--card-padding);
      }
      transition: v-bind("transition.time") v-bind("transition.easing");
      &__Text {
        font-size: 1.7rem;
        font-weight: 700;
      }
      &__Icon {
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 1rem;
      }

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
    background-color: var(--theme-500);
    transition: v-bind("transition.time") v-bind("transition.easing");
    &__Icon {
      width: 1.8rem;
      height: 1.8rem;
      color: #fff;
    }
    &__Text {
      font-size: 1.5rem;
      font-weight: 500;
      color: #fff;
    }
  }
}

@media screen and (min-width: 1024px) {
  .VueflixNav {
    width: v-bind(navWidth);

    &__Logo {
      display: block;
      margin: 0 auto;
      width: calc(100% - var(--card-padding) * 2);
      height: 14rem;
      padding-top: 2rem;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .VueflixLogo {
        width: 3.6rem;
        height: 3.6rem;
        color: var(--text-900);
      }
      .AdminText {
        font-size: 2rem;
        font-weight: 900;
      }
    }
    &__Title {
      display: none;
    }

    .SiteLink {
      height: 6.6rem;
      button {
        align-items: center;
        justify-content: space-between;
      }
      &__Icon{
        margin: 0;
      }
      &--Shrinked {
        button {
          justify-content: center;
          padding: 0;
        }
        padding: 0;
        width: calc(100% - 0.5rem);
      }
    }

    .NewProjectButton {
      width: calc(v-bind(navWidth) - var(--card-padding) * 2);
      height: 6.6rem;
      padding: {
        left: 2rem;
        right: 2rem;
      }
      &__Icon{
        width: 2.4rem;
        height: 2.4rem;
      }
      &__Text {
        white-space: nowrap;
        opacity: 1;
        transition: v-bind("transition.time") v-bind("transition.easing");
      }
    }

    &__ExpandButton {
      position: fixed;
      width: 4.8rem;
      height: 4.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      left: calc(v-bind(navWidth) - 2.4rem);
      top: calc(50% - 2.4rem);
      background-color: var(--bg-100);
      box-shadow: var(--box-shadow);
      border-radius: 50%;
      transition: left v-bind("transition.time") v-bind("transition.easing");
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        transition: v-bind("transition.time") v-bind("transition.easing");
        transform: rotateY(0);
      }
      &--Shrinked .icon {
        transform: rotateY(180deg);
      }
    }

    &--Shrinked {
      .NewProjectButton {
        width: calc(v-bind(navWidth) - 1rem);
        height: calc(v-bind(navWidth) - 1rem);
        justify-content: center;
        padding: 0;
        &__Icon {
          margin-right: 0;
        }
        &__Text {
          opacity: 0;
        }
      }
      .VueflixNav__Logo {
        width: 100%;
        a {
          justify-content: center;
        }
      }
    }
  }
}
</style>
