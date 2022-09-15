<script lang="ts" setup>
import { computed, onBeforeMount, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseEmailLogin } from "../composables/firebase";
import Immersive from "../layouts/Immersive.vue";
import StyledButton from "@/components/StyledButton.vue";
import TextInput from "@/components/TextInput.vue";
import VueflixLogo from "@/components/VueflixLogo.vue";
import { getLocalstorage } from "../composables/localstorage";
import { User } from "@firebase/auth";

const id: Ref<string> = ref("");
const pw: Ref<string> = ref("");
const isIDBlank = computed<boolean>(() => id.value.length === 0);
const isPWBlank = computed<boolean>(() => pw.value.length === 0);
const router = useRouter();
const errorCode: Ref<string> = ref("");
async function onLogin() {
  errorCode.value = (await useFirebaseEmailLogin(id, pw)).value;
  if (errorCode.value) {
    return;
  }
  router.push("/");
}

onBeforeMount(() => {
  //로컬스토리지가 사용자에 의해 오염되었을 때를 대비.
  //예) auth에 임의로 true가 입력되었을 때
  const isLoggedIn = getLocalstorage("auth") as User;
  if (isLoggedIn?.uid) {
    router.back();
  }
});
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
        <span v-if="errorCode">{{ errorCode }}</span>
      </div>
      <div class="btn-area">
        <StyledButton
          root="button"
          type="submit"
          :icon="false"
          :disabled="isIDBlank || isPWBlank"
          class="Login__Button"
        >
          <template #Text>로그인</template>
        </StyledButton>
      </div>
    </template>
  </Immersive>
</template>

<style lang="scss" scoped>
.Login {
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

@media screen and (min-width: 1024px) {
  .Login__Title {
    margin-bottom: 2rem;
  }
}
</style>
