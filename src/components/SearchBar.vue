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
  rawTag.value = (e.target as HTMLInputElement).value.toLowerCase();
}
watch(rawTag, () => {
  //입력이 시작되었을 때
  if (rawTag.value.length === 1) {
    //태그오버레이를 활성화한다
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
const currentTyping = computed<Array<string>>(() => rawTag.value.split(":"));
const $Input: Ref<HTMLInputElement | null> = ref(null);
function clickLabel() {
  if ($Input.value) {
    $Input.value.focus();
  }
}

const splittedTags = reactive<Record<TagType, Array<string>>>({
  keyword: [],
  company: [],
  title: [],
  director: [],
});
const searchAble = computed<boolean>(
  () =>
    splittedTags.keyword.length !== 0 ||
    splittedTags.company.length !== 0 ||
    splittedTags.title.length !== 0 ||
    splittedTags.director.length !== 0
);
function setSplittedTags() {
  const [type, value] = rawTag.value.split(":") as [TagType, string];
  if (!value || !isValidTagType.value) {
    return;
  }
  const underbarReplacedValue = value.replace("_", " ");
  if (splittedTags[type].includes(underbarReplacedValue)) {
    return;
  }
  splittedTags[type].push(underbarReplacedValue);
  rawTag.value = "";
}
function deleteTag(tagName: TagType, value: string) {
  splittedTags[tagName] = splittedTags[tagName].filter(
    (item) => value !== item
  );
}
function search() {
  router.push({ name: "검색", query: splittedTags });
  splittedTags.keyword = [];
  splittedTags.company = [];
  splittedTags.title = [];
  splittedTags.director = [];
  inputFocused.value = false;
  $Input.value?.blur();
  tagOverayClose();
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
    <div class="Body" @click="clickLabel">
      <button
        class="SearchBar__SubmitButton"
        type="submit"
        :disabled="!searchAble"
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
        @keydown.prevent.space="setSplittedTags"
        @keydown.prevent.tab
        :value="rawTag"
        ref="$Input"
      />
      <button
        class="SearchBar__TagAddButton touch-device"
        type="button"
        @click="setSplittedTags"
        v-if="tagOverayVisible"
        :disabled="!currentTyping[1] || !isValidTagType"
      >
        태그 추가
      </button>
      <span :class="placeholderClasses"> 검색할 태그를 입력하세요 </span>
    </div>

    <TagOveray
      :class="tagOverayClasses"
      :current-typing="currentTyping[0]"
      :split-tags="splittedTags"
      @delete-tag="deleteTag"
      @tag-overay-close="tagOverayClose"
    >
      <template #title> 입력된 태그 </template>
      <template #guide-text>
        <ul class="TagOveray__GuideText">
          <li class="guide pointer-device">
            <span>SpaceBar를 누르면 여기에 나타납니다.</span>
          </li>
          <li class="guide pointer-device">
            <span>Enter를 누르면 검색합니다.</span>
          </li>
          <li class="guide pointer-device">
            <span> Tab은 사용할 수 없습니다.</span>
          </li>
          <li class="guide"><span>_(언더바)는 띄어쓰기로 변환됩니다.</span></li>
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
    height: 100%;
    display: flex;
    align-items: center;
    background-color: var(--bg-100);
    box-shadow: var(--box-shadow);
    border-radius: 9999px;
    border: 1px solid transparent;
    padding: 0.5rem var(--card-padding);
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
  &__TagAddButton {
    position: absolute;
    right: 0.5rem;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 3.6rem;
    padding: 0 1.5rem;
    border-radius: 9999px;
    background-color: var(--theme-500);
    color: #fff;
    font-weight: 500;
    &:disabled {
      background-color: var(--bg-700);
    }
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
    z-index: var(--backdrop-close-button-z-index);
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
