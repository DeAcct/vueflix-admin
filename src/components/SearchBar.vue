<script lang="ts" setup>
import { Ref, ref, computed } from "vue";
import IconBase from "./IconBase.vue";
import IconSearch from "./icons/IconSearch.vue";

const searchKeyword: Ref<string> = ref("");
function setSearchKeyword(e: Event) {
  searchKeyword.value = (e.target as HTMLInputElement).value;
}

const inputFocused: Ref<boolean> = ref(false);
function onFocusIn() {
  inputFocused.value = true;
}
function onFocusOut() {
  inputFocused.value = false;
}
const searchbarClasses = computed(() => [
  "SearchBar",
  { "SearchBar--Focused": inputFocused.value },
]);

const placeholderVisible = computed<boolean>(
  () => searchKeyword.value.length === 0
);
const placeholderClasses = computed(() => [
  "SearchBar__Placeholder",
  { "SearchBar__Placeholder--Visible": placeholderVisible.value },
]);
</script>

<template>
  <label :class="[...searchbarClasses, 'inner']">
    <i class="SearchBar__Icon">
      <IconBase icon-name="검색 아이콘">
        <IconSearch />
      </IconBase>
    </i>
    <input
      class="SearchBar__Input"
      @input="setSearchKeyword"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
      :value="searchKeyword"
      autofocus
    />
    <span :class="placeholderClasses">
      검색할 애니메이션, 추천목록 등을 입력하세요
    </span>
  </label>
</template>

<style lang="scss" scoped>
.SearchBar {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--bg-100);
  box-shadow: var(--box-shadow);
  border-radius: 9999px;
  border: 1px solid transparent;
  padding: {
    top: 1rem;
    bottom: 1rem;
  }
  cursor: text;

  &__Icon {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    margin-right: 1rem;
  }

  &__Input {
    flex: 1;
    font-weight: 500;
  }

  &__Placeholder {
    position: absolute;
    left: calc(var(--inner-padding) + 3.4rem);
    font-size: 1.3rem;
    color: var(--bg-500);
    visibility: hidden;

    &--Visible {
      visibility: visible;
    }
  }

  transition: border-color 150ms ease-out;
  &--Focused {
    border-color: var(--theme-300);
  }
}
</style>
