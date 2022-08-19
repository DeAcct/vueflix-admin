<script lang="ts" setup>
import { Ref, ref, computed, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import IconBase from "./IconBase.vue";
import IconSearch from "./icons/IconSearch.vue";
import { useBEMClass } from "../composables/classNames";
import { useCSSMotion } from "../composables/motions";
import TagOveray from "./TagOveray.vue";
import type { TagType } from "../types/SearchTagType";

const rawTag: Ref<string> = ref("");
const router = useRouter();
function setRawTag(e: Event) {
  rawTag.value = (e.target as HTMLInputElement).value;
}
watch(rawTag, () => {
  if (rawTag.value.length !== 0) {
    tagOverayOpen();
  }
});

const inputFocused: Ref<boolean> = ref(false);
function onFocusIn() {
  tagOverayOpen();
  inputFocused.value = true;
}
function onFocusOut() {
  inputFocused.value = false;
}
const searchbarClasses = useBEMClass("SearchBar", "Focused", inputFocused);

const placeholderVisible = computed<boolean>(() => rawTag.value.length === 0);
const placeholderClasses = useBEMClass(
  "SearchBar__Placeholder",
  "Visible",
  placeholderVisible
);

const tagType = new RegExp("^(keyword|company|title|director)");
const isValidTagType = computed<boolean>(() => tagType.test(rawTag.value));
const currentTyping = computed<string>(() => rawTag.value.split(":")[0]);
const $Input: Ref<HTMLInputElement | null> = ref(null);
function clickLabel() {
  if ($Input.value) {
    $Input.value.focus();
  }
}

const splitTags = reactive<Record<TagType, Array<string>>>({
  keyword: [],
  company: [],
  title: [],
  director: [],
});
const searchAble = computed<boolean>(
  () =>
    splitTags.keyword.length !== 0 ||
    splitTags.company.length !== 0 ||
    splitTags.title.length !== 0 ||
    splitTags.director.length !== 0
);
function tagSplit() {
  const [type, value] = rawTag.value.split(":") as [TagType, string];
  if (!value || !isValidTagType.value) {
    return;
  }
  const underbarReplacedValue = value.replace("_", " ");
  if (splitTags[type].includes(underbarReplacedValue)) {
    return;
  }
  splitTags[type].push(underbarReplacedValue);
  rawTag.value = "";
}
function deleteTag(tagName: TagType, value: string) {
  splitTags[tagName] = splitTags[tagName].filter((item) => value !== item);
}
function search() {
  if (searchAble.value) {
    router.push({ name: "검색", query: splitTags });
    splitTags.keyword = [];
    splitTags.company = [];
    splitTags.title = [];
    splitTags.director = [];
    inputFocused.value = false;
    tagOverayClose();
  } else {
    inputFocused.value = true;
  }
}

const tagOverayVisible: Ref<boolean> = ref(false);
function tagOverayOpen() {
  tagOverayVisible.value = true;
}
function tagOverayClose() {
  tagOverayVisible.value = false;
}
const tagOverayClasses = useBEMClass("TagOveray", "Visible", tagOverayVisible);
const backdropCloseButtonClasses = useBEMClass(
  "SearchBar__BackdropCloseButton",
  "Visible",
  tagOverayVisible
);
const motion = useCSSMotion("150ms", "cubic-bezier(0.85, 0, 0.15, 1)");
</script>

<template>
  <form :class="searchbarClasses" @submit.prevent="search">
    <div class="Body" @click.stop="clickLabel">
      <button
        class="SearchBar__SubmitButton"
        type="submit"
        @click.stop="search"
      >
        <IconBase icon-name="검색 아이콘">
          <IconSearch />
        </IconBase>
      </button>
      <input
        class="SearchBar__Input"
        @input="setRawTag"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @keydown.prevent.space="tagSplit"
        @keydown.prevent.tab
        :value="rawTag"
        ref="$Input"
      />
      <span :class="placeholderClasses">
        검색할 태그를 입력하세요 [태그종류:검색어]
      </span>
    </div>

    <TagOveray
      :class="tagOverayClasses"
      :current-typing="currentTyping"
      :split-tags="splitTags"
      @delete-tag="deleteTag"
      @tag-overay-close="tagOverayClose"
    >
      <template #title> 입력된 태그 </template>
      <template #guide-text>
        <ul class="TagOveray__GuideText">
          <li class="guide">SpaceBar를 누르면 여기에 나타납니다.</li>
          <li class="guide">Enter를 누르면 검색합니다.</li>
          <li class="guide">_(언더바)는 띄어쓰기로 변환됩니다.</li>
          <li class="guide">탭키는 사용할 수 없습니다.</li>
        </ul>
      </template>
    </TagOveray>

    <button
      :class="backdropCloseButtonClasses"
      type="button"
      @click="tagOverayClose"
    >
      <span class="blind">태그 오버레이 창 닫기</span>
    </button>
  </form>
</template>

<style lang="scss" scoped>
.SearchBar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .Body {
    position: absolute;
    z-index: var(--search-bar-body-z-index);
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
    &__GuideText {
      border-top: 1px solid var(--bg-200);
      padding-top: calc(var(--card-padding) - 0.5rem);
      margin-top: calc(var(--card-padding) - 0.5rem);
      .guide {
        line-height: 1.5rem;
        font-size: 1.4rem;
        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
        &::before {
          content: "\b7\a0";
          font-weight: 500;
        }
      }
    }
  }

  &__BackdropCloseButton {
    position: fixed;
    z-index: var(--search-bar-backdrop-close-button-z-index);
    visibility: hidden;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    transition: v-bind("motion.duration") v-bind("motion.easing");
    &--Visible {
      visibility: visible;
      opacity: 1;
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
