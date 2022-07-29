<script lang="ts" setup>
import { Ref, ref, computed } from "vue";
import { useClassNames } from "../composables/classNames";
import IconBase from "./IconBase.vue";
import IconSearch from "./icons/IconSearch.vue";

const searchKeyword: Ref<string> = ref("");
function setSearchKeyword(e: Event) {
  searchKeyword.value = (e.target as HTMLInputElement).value;
}

const placeholderVisible = computed<boolean>(
  () => searchKeyword.value.length === 0
);
const placeholderClasses = useClassNames(
  "SearchBar__Placeholder",
  "Visible",
  placeholderVisible
);
</script>

<template>
  <label class="SearchBar inner">
    <i class="SearchBar__Icon">
      <IconBase icon-name="검색 아이콘">
        <IconSearch />
      </IconBase>
    </i>
    <input
      class="SearchBar__Input"
      @input="setSearchKeyword"
      :value="searchKeyword"
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
  padding: {
    top: 1rem;
    bottom: 1rem;
  }

  &__Icon {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    margin-right: 1rem;
  }

  &__Input {
    font-weight: 500;
  }

  &__Placeholder {
    position: absolute;
    left: calc(var(--inner-padding) + 3.4rem);
    font-size: 1.3rem;
    color: var(--bg-500);
    display: none;

    &--Visible {
      display: block;
    }
  }
}
</style>
