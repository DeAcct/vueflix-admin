<script lang="ts" setup>
import IconBase from "./IconBase.vue";
import IconClose from "./icons/IconClose.vue";
import type { TagType } from "../types/SearchTagType";
import { useCSSMotion } from "../composables/motions";

defineProps<{
  splitTags: Record<TagType, Array<string>>;
  currentTyping?: string;
}>();

const tagOverayEmits = defineEmits(["delete-tag", "tag-overay-close"]);

function deleteTag(tagName: TagType, value: string) {
  tagOverayEmits("delete-tag", tagName, value);
}
function tagOverayClose() {
  tagOverayEmits("tag-overay-close");
}

const motion = useCSSMotion("150ms", "cubic-bezier(0.85, 0, 0.15, 1)");
</script>

<template>
  <div class="TagOveray">
    <h2 class="TagOveray__Title">
      <slot name="title" />
    </h2>
    <ul class="TagOveray__List">
      <li
        v-for="(searchValue, tagName) in splitTags"
        :class="[
          'TagRecord',
          { 'TagRecord--CurrentTyping': currentTyping === tagName },
        ]"
      >
        <span class="TagRecord__Name">
          {{ tagName }}
        </span>
        <ul class="TagRecord__List">
          <li v-for="value in searchValue" class="TagRecord__Item">
            {{ value }}
            <button
              class="DeleteButton"
              type="button"
              @click="deleteTag(tagName, value)"
            >
              <IconBase icon-name="태그 삭제">
                <IconClose />
              </IconBase>
            </button>
          </li>
        </ul>
      </li>
    </ul>
    <slot name="guide-text" />

    <button
      class="TagOveray__CloseButton"
      type="button"
      @click="tagOverayClose"
    >
      <i class="icon">
        <IconBase icon-name="태그 오버레이 창 닫기">
          <IconClose />
        </IconBase>
      </i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.TagOveray {
  position: absolute;
  top: 5.6rem;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-1rem);
  width: 100%;
  min-height: 4.6rem;
  border-radius: 2.3rem;
  padding: var(--card-padding) var(--card-padding)
    calc(var(--card-padding) + 0.5rem);
  background-color: var(--bg-100);
  box-shadow: var(--box-shadow);

  & > *:not(:first-child, .TagOveray__CloseButton) {
    border-top: 1px solid var(--bg-200);
    padding-top: calc(var(--card-padding) - 0.5rem);
    margin-top: calc(var(--card-padding) - 0.5rem);
  }

  &__Title {
    font-size: 1.7rem;
  }
  &__List {
    margin-top: 0.7rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .TagRecord {
    display: flex;
    justify-content: space-between;
    width: 100%;

    &__Name {
      display: flex;
      padding: 0.8rem 0;
      font-size: 1.4rem;
      font-weight: 500;
      transition: v-bind("motion.duration") v-bind("motion.easing");
    }
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    &__List {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 2rem);
      margin-left: 0.5rem;
    }
    &__Item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      font-size: 1.2rem;
      font-weight: 500;
      background-color: var(--bg-200);
      border-radius: 9999px;
      margin: 0.3rem;
      .DeleteButton {
        width: 1.2rem;
        height: 1.2rem;
        margin-left: 0.5rem;
      }
    }
    &--CurrentTyping {
      .TagRecord__Name {
        color: var(--theme-500);
      }
    }
  }

  &__CloseButton {
    position: absolute;
    left: calc(50% - 2.4rem);
    bottom: -1.8rem;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    background-color: var(--theme-500);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--box-shadow);
    .icon {
      display: flex;
      width: 1.8rem;
      height: 1.8rem;
      color: #fff;
    }
  }

  transition: v-bind("motion.duration") v-bind("motion.easing");
  &--Visible {
    visibility: visible;
    opacity: 1;
    z-index: var(--tag-overay-z-index);
    transform: translateY(0);
  }
}
</style>
