<script lang="ts" setup>
import { Ref, ref, watch, onMounted, shallowRef } from "vue";
import { RouteRecordName, useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import VueflixLogo from "./VueflixLogo.vue";
import IconBase from "./IconBase.vue";
import IconDashboard from "./icons/IconDashboard.vue";
import IconAnime from "./icons/IconAnime.vue";
import IconRecommendList from "./icons/IconRecommendList.vue";
import NewProjectIcon from "./icons/NewProjectIcon.vue";
import IconArrowNext from "./icons/IconArrowNext.vue";
import { useNav } from "../store/nav";
import { useEventListener } from "../composables/event";
import { useBEMClass, useOptionClass } from "../composables/classNames";
import { useCSSMotion } from "../composables/motions";
import StyledButton from "./StyledButton.vue";
import { firebaseLogout } from "../composables/firebase";

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
onMounted(() => {
  currentAddress.value = route.name ? route.name : "";
  setViewHeight();
});
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
function setViewHeight() {
  viewHeight.value = `${window.innerHeight}px`;
}
useEventListener(window, "resize", setViewHeight);

const navStore = useNav();
const { isNavOpen, navWidth } = storeToRefs(navStore);
function navToggle() {
  navStore.toggleNav();
}
const vueflixNavClasses = useBEMClass("VueflixNav", "Expanded", isNavOpen);
const optionalBlind = useOptionClass("blind", isNavOpen, true);
const motion = useCSSMotion("300ms", "cubic-bezier(0.85, 0, 0.15, 1)");

async function onLogout() {
  await firebaseLogout();
  navStore.closeNav();
  router.push("/login");
}
</script>

<template>
  <nav :class="vueflixNavClasses">
    <div class="row-top">
      <h1 class="VueflixNav__Logo">
        <RouterLink to="/">
          <VueflixLogo />
          <span :class="['AdminText', optionalBlind]">어드민</span>
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
          <button @click="routeTo(siteLink.to)" role="link">
            <i class="SiteLink__Icon">
              <IconBase :icon-name="siteLink.name">
                <component :is="siteLink.icon" />
              </IconBase>
            </i>
            <span :class="['SiteLink__Text', optionalBlind]">
              {{ siteLink.name }}
            </span>
          </button>
        </li>
      </ul>
      <div class="VueflixNav__LogoutArea inner">
        <StyledButton
          root="button"
          role="link"
          :icon="false"
          type="button"
          @click="onLogout"
        >
          <template #Text>로그아웃</template>
        </StyledButton>
      </div>
    </div>
    <div class="row-bottom">
      <button class="NewProjectButton" @click="routeTo('#')">
        <i class="NewProjectButton__Icon">
          <IconBase icon-name="새 프로젝트 아이콘">
            <NewProjectIcon />
          </IconBase>
        </i>
        <span :class="['NewProjectButton__Text', optionalBlind]">
          새 프로젝트 만들기
        </span>
      </button>
    </div>
    <button class="VueflixNav__ExpandButton" @click="navToggle">
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
  background-color: var(--text-200);
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
    padding-top: 7.6rem;
    font-weight: 900;
    padding-bottom: 1.5rem;
    background-color: var(--text-100);
  }
  .row-bottom {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  &__SiteMenu {
    padding-bottom: calc(var(--card-padding));
    background-color: var(--text-100);
    border-bottom-right-radius: 2.3rem;
    transition: v-bind("motion.duration") v-bind("motion.easing");
    .SiteLink {
      display: flex;
      width: calc(100% - var(--card-padding) * 2);
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
      transition: v-bind("motion.duration") v-bind("motion.easing");
      button {
        display: flex;
        align-items: center;
        width: 100%;
        padding: var(--card-padding);
      }
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
  &__LogoutArea {
    padding: {
      top: 1rem;
      bottom: 1rem;
    }
    .StyledButton {
      background: var(--text-100);
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
    transition: v-bind("motion.duration") v-bind("motion.easing");
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
      width: 100%;
      height: 14rem;
      padding-top: 2rem;
      a {
        display: flex;
        justify-content: center;
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

    &__SiteMenu {
      width: calc(100% - 0.5rem);
      .SiteLink {
        transition: v-bind("motion.duration") v-bind("motion.easing");
        height: 6.6rem;
        button {
          justify-content: center;
          padding: 0;
        }
        &__Icon {
          margin-right: 0;
        }
      }
    }

    .NewProjectButton {
      width: calc(v-bind(navWidth) - 1rem);
      height: calc(v-bind(navWidth) - 1rem);
      justify-content: center;

      &__Icon {
        width: 2.4rem;
        height: 2.4rem;
      }
      &__Text {
        white-space: nowrap;
        opacity: 0;
        transition: v-bind("motion.duration") v-bind("motion.easing");
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
      transition: left v-bind("motion.duration") v-bind("motion.easing");
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        transition: v-bind("motion.duration") v-bind("motion.easing");
        transform: rotateY(0);
      }
    }

    &--Expanded {
      .VueflixNav__Logo {
        width: calc(100% - var(--card-padding) * 2);
        a {
          justify-content: space-between;
        }
      }
      .VueflixNav__SiteMenu {
        width: calc(v-bind(navWidth) - var(--card-padding));
        .SiteLink {
          padding: 0 var(--card-padding);
          button {
            align-items: center;
            justify-content: space-between;
          }
          .SiteLink__Icon {
            margin: 0;
          }
        }
      }
      .NewProjectButton {
        width: calc(v-bind(navWidth) - var(--card-padding) * 2);
        height: 6.6rem;
        justify-content: space-between;
        &__Text {
          opacity: 1;
        }
        &__icon {
          margin-right: 1rem;
        }
      }
      .VueflixNav__ExpandButton {
        .icon {
          transform: rotateY(180deg);
        }
      }
    }
  }
}
</style>
