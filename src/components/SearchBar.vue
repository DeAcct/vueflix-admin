<script lang="ts" setup>
import { Ref, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { OptionalClassItem } from "../types/Classes";
import IconBase from "./IconBase.vue";
import IconSearch from "./icons/IconSearch.vue";
import HorizontalList from "./HorizontalList.vue";
import { storeToRefs } from "pinia";
import { useA11y } from "../store/accessibility";

const rawTag: Ref<string> = ref("");
const router = useRouter();
function setRawTag(e: Event) {
  rawTag.value = (e.target as HTMLInputElement).value;
}

const inputFocused: Ref<boolean> = ref(false);
function onFocusIn() {
  inputFocused.value = true;
}
function onFocusOut() {
  inputFocused.value = false;
}
const searchbarClasses = computed<[string, OptionalClassItem]>(() => [
  "SearchBar",
  { "SearchBar--Focused": inputFocused.value },
]);

const placeholderVisible = computed<boolean>(() => rawTag.value.length === 0);
const placeholderClasses = computed<[string, OptionalClassItem]>(() => [
  "SearchBar__Placeholder",
  { "SearchBar__Placeholder--Visible": placeholderVisible.value },
]);

type TagType = "keyword" | "company" | "title" | "director";
const tagType = new RegExp("^(keyword|company|title|director)");
const isValidTagType = computed<boolean>(() => tagType.test(rawTag.value));
const $Input: Ref<HTMLInputElement | null> = ref(null);
interface Tag {
  type: TagType;
  value: Array<string>;
}
const splitTags: Ref<Array<Tag | null>> = ref([]);
function clickLabel() {
  if ($Input.value) {
    $Input.value.focus();
  }
}
function tagSplit() {
  console.log("분리");
  const [type, value] = rawTag.value.split(":") as [TagType, string];
  if (!value || !isValidTagType) {
    return;
  }
  const isTagExists = splitTags.value.find((tag) => tag?.type === type);
  if (isTagExists) {
    if (!isTagExists.value.includes(value)) {
      isTagExists.value.push(value);
    }
  } else {
    splitTags.value.push({ type, value: [value] });
  }
  rawTag.value = "";
  console.log(rawTag.value);
}
function search() {
  if (rawTag.value.length !== 0) {
    router.push({ name: "검색", query: { tag: rawTag.value } });
  }
}

const tagOverayClasses = computed<[string, OptionalClassItem]>(() => [
  "TagOveray",
  { "TagOveray--Visible": inputFocused.value },
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
  <div :class="searchbarClasses">
    <div class="Body" @click="clickLabel">
      <button @click.stop="search" class="SearchBar__SubmitButton">
        <IconBase icon-name="검색 아이콘">
          <IconSearch />
        </IconBase>
      </button>
      <input
        class="SearchBar__Input"
        @input="setRawTag"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @keydown.prevent.tab="tagSplit"
        @keydown.prevent.space
        :value="rawTag"
        ref="$Input"
        autofocus
      />
      <span :class="placeholderClasses">
        검색할 태그를 입력하세요 [태그종류:검색어]
      </span>
    </div>

    <div :class="tagOverayClasses" v-if="true">
      <div class="row-top">
        <h2 class="TagOveray__Title">입력된 태그</h2>
        <ul class="TagOveray__GuideText">
          <li class="guide">탭키를 누르면 여기에 나타납니다.</li>
          <li class="guide">스페이스바는 사용할 수 없습니다.</li>
        </ul>
        <ul class="TagOveray__List" v-if="splitTags.length !== 0">
          <li v-for="tag in splitTags" class="TagItem">
            {{ tag?.type }}
            <span v-for="value in tag?.value" class="TagItem__Sub">
              {{ value }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SearchBar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .Body {
    position: absolute;
    z-index: 10;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--bg-100);
    box-shadow: var(--box-shadow);
    border-radius: 9999px;
    border: 1px solid transparent;
    padding: 1rem var(--card-padding);
    cursor: text;
  }

  &__SubmitButton {
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 1rem;
  }

  &__Placeholder {
    position: absolute;
    z-index: 25;
    left: calc(var(--card-padding) + 3.4rem);
    font-size: 1.3rem;
    color: var(--bg-500);
    visibility: hidden;

    &--Visible {
      visibility: visible;
    }
  }

  &__Input {
    width: calc(100% - 3.4rem);
    font-weight: 500;
  }

  .TagOveray {
    z-index: 5;
    position: absolute;
    top: 5.6rem;
    z-index: -1;
    opacity: 0;
    transform: translateY(-1rem);
    width: 100%;
    min-height: 4.6rem;
    border-radius: 2.3rem;
    padding: var(--card-padding);
    background-color: var(--bg-100);
    box-shadow: var(--box-shadow);
    &__Title {
      font-size: 1.7rem;
      margin-bottom: 1rem;
    }
    &__GuideText {
      line-height: 1.5rem;
      .guide {
        font-size: 1.2rem;
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
        &::before {
          content: "\b7\a0";
          font-weight: 500;
        }
      }
    }
    &__List {
      margin-top: 0.7rem;
      display: flex;
      flex-direction: column;
    }
    .TagItem {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      width: fit-content;
      font-size: 1.2rem;
      font-weight: 500;
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
      &__Sub {
        padding: 0.5rem 0.75rem;
        font-weight: 500;
        background-color: var(--bg-200);
        border-radius: 9999px;
        margin-left: 0.3rem;
      }
    }

    transition: v-bind("transition.time") v-bind("transition.easing");
    &--Visible {
      opacity: 1;
      z-index: 10;
      transform: translateY(0);
    }
  }

  transition: border-color 150ms ease-out;
  &--Focused {
    .Body {
      border-color: var(--theme-500);
    }
  }
}
</style>
