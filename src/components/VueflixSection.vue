<script lang="ts" setup>
import { toRef } from "vue";
import { useOptionClass } from "../composables/classNames";

const vueflixSectionProps = defineProps<{
  titleCenter: boolean;
}>();

const centered = useOptionClass(
  "centered",
  toRef(vueflixSectionProps, "titleCenter")
);
</script>

<template>
  <section class="VueflixSection">
    <div class="headtext">
      <div :class="['row-top', centered]">
        <slot name="title" />
        <slot name="counter" />
      </div>
      <slot name="description" />
    </div>
    <div class="VueflixSection__Contents">
      <slot name="content" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.VueflixSection {
  .headtext {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    .row-top {
      width: 100%;
      display: flex;
      align-items: center;
      :not(:last-child) {
        margin-right: 1rem;
      }
      &.centered {
        justify-content: center;
      }
    }
  }

  &__Contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--radius-3);
    background-color: var(--bg-100);
    box-shadow: var(--box-shadow);
  }
}
</style>
