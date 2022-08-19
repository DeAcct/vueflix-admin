<script lang="ts" setup>
import { ref, Ref } from "vue";
import IconBase from "./IconBase.vue";

const uploadedFile: Ref<File | undefined> = ref(undefined);
</script>

<template>
  <div class="FileDrop">
    <p>애니메이션 정보를 업로드하려면 여기로 파일을 끌어놓거나</p>
  </div>
</template>

<style lang="scss" scoped></style>
