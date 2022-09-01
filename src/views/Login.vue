<script lang="ts" setup>
import VueflixLogo from "@/components/VueflixLogo.vue";
import { useCSSMotion } from "../composables/motions";
import TextInput from "../components/TextInput.vue";

const motion = useCSSMotion("1s", "cubic-bezier(0.85, 0, 0.15, 1)");
</script>

<template>
  <div class="Login">
    <header class="Login__Header">
      <h1 class="Logo">
        <VueflixLogo class="Logo__Img"></VueflixLogo>
        <span class="Logo__Text">관리자</span>
      </h1>
    </header>
    <form class="Login__Form">
      <TextInput type="text">
        <template #label>아이디</template>
      </TextInput>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.Login {
  display: flex;
  flex-direction: column;
  margin-left: 0;
  padding: 0;
  background-color: var(--theme-500);
  height: 100vh;
  &__Header {
    width: 100%;
    height: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: HeaderExpand v-bind("motion.duration") v-bind("motion.easing")
      forwards;
    .Logo {
      display: flex;
      align-items: center;
      height: 6rem;
      &__Img {
        color: #fff;
        width: 6rem;
        height: 6rem;
      }
      &__Text {
        color: #fff;
        font-weight: 700;
      }
    }
  }
  &__Form {
    flex-grow: 1;
    background-color: var(--bg-100);
    border-top-left-radius: 2.3rem;
    animation: FormRadius v-bind("motion.duration") v-bind("motion.easing")
      forwards;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .TextInput {
      width: calc(100% - var(--card-padding));
      height: 4.6rem;
    }
  }
}
@keyframes HeaderExpand {
  from {
    height: 0;
  }
}
@keyframes FormRadius {
  from {
    border-top-left-radius: 0;
  }
}
</style>
