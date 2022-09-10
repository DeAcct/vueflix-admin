<script lang="ts" setup>
import { useCSSMotion } from "../composables/motions";
defineProps<{
  bodyRoot: string;
  eventCallback?: () => void;
}>();

const motion = useCSSMotion("1s", "cubic-bezier(0.85, 0, 0.15, 1)");
</script>

<template>
  <div class="Immersive">
    <header class="Immersive__Header">
      <slot name="Header" />
    </header>
    <component
      :is="bodyRoot"
      class="Immersive__Form"
      @submit.prevent="eventCallback"
    >
      <slot name="Body" />
    </component>
  </div>
</template>

<style lang="scss" scoped>
.Immersive {
  display: flex;
  flex-direction: column;
  margin-left: 0;
  width: 100%;
  padding: 0;
  background-color: var(--theme-500);
  height: 100vh;

  &__Header {
    width: 100%;
    height: min(100vw, 50vh);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: HeaderExpand v-bind("motion.duration") v-bind("motion.easing")
      forwards;
  }
  &__Form {
    flex-grow: 1;
    background-color: var(--bg-100);
    border-top-left-radius: 2.3rem;
    animation: FormRadius v-bind("motion.duration") v-bind("motion.easing")
      forwards;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--card-padding);
    .Input {
      margin-bottom: 2rem;
    }
    .TextInput {
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }
  }
  &__Button {
    color: #fff;
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

@media screen and (min-width: 1024px) {
  .Login {
    flex-direction: row;
    &__Title {
      margin-bottom: 2rem;
    }
    &__Header {
      width: calc(100vw - 50rem);
      height: auto;
    }
    &__Form {
      justify-content: center;
    }
  }
  @keyframes HeaderExpand {
    from {
      width: 0;
    }
  }
}
</style>
