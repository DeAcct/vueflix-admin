<script lang="ts" setup>
import { computed, ref, Ref } from "vue";
import { useFirebaseEmailLogin } from "../composables/firebase";
import StyledButton from "@/components/StyledButton.vue";
import TextInput from "@/components/TextInput.vue";
import VueflixLogo from "@/components/VueflixLogo.vue";
import { useRouter } from "vue-router";
import Immersive from "../layouts/Immersive.vue";

const id: Ref<string> = ref("");
const pw: Ref<string> = ref("");
const isIDBlank = computed<boolean>(() => id.value.length === 0);
const isPWBlank = computed<boolean>(() => pw.value.length === 0);
const router = useRouter();
async function onLogin() {
  const { isFailed } = await useFirebaseEmailLogin(id, pw);
  if (isFailed.value) {
    return;
  }
  router.push("/");
}
</script>

<template>
  <Immersive body-root="form" class="Login" :event-callback="onLogin">
    <template #Header>
      <h1 class="Logo">
        <VueflixLogo class="Logo__Img" />
        <span class="Logo__Text">관리자</span>
      </h1>
    </template>
    <template #Body>
      <h2 class="Login__Title">로그인</h2>
      <div class="Input">
        <TextInput type="text" v-model:input-value="id">
          <template #label>이메일</template>
        </TextInput>
        <TextInput type="password" v-model:input-value="pw">
          <template #label>패스워드</template>
        </TextInput>
      </div>
      <StyledButton
        root="button"
        type="submit"
        :icon="false"
        :disabled="isIDBlank || isPWBlank"
        class="Login__Button"
      >
        <template #Text>로그인</template>
      </StyledButton>
    </template>
  </Immersive>
</template>

<style lang="scss" scoped>
.Login {
  display: flex;
  flex-direction: column;
  margin-left: 0;
  width: 100%;
  padding: 0;
  background-color: var(--theme-500);
  height: 100vh;
  &__Title {
    align-self: center;
    font-size: 2rem;
  }
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

  .Input {
    margin-bottom: 2rem;
  }
  .TextInput {
    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }

  &__Button {
    color: #fff;
  }
}
</style>
