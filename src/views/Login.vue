<script lang="ts" setup>
import { computed, onBeforeMount, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { sendResetEmail, useFirebaseEmailLogin } from "../composables/firebase";
import Immersive from "../layouts/Immersive.vue";
import StyledButton from "@/components/StyledButton.vue";
import TextInput from "@/components/TextInput.vue";
import VueflixLogo from "@/components/VueflixLogo.vue";
import { getLocalstorage } from "../composables/localstorage";
import { User } from "@firebase/auth";
import { useOptionClass } from "../composables/classNames";

const email: Ref<string> = ref("");
const pw: Ref<string> = ref("");
const isEmailBlank = computed<boolean>(() => email.value.length === 0);
const isEmailValid = computed<boolean>(() => email.value.indexOf("@") !== -1);
const isPWBlank = computed<boolean>(() => pw.value.length === 0);
const router = useRouter();
const errorCode: Ref<unknown> = ref("");
const isError = computed<boolean>(() => !!errorCode.value);
async function onLogin() {
  errorCode.value = (await useFirebaseEmailLogin(email, pw)).value;
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

async function resetPW() {
  await sendResetEmail(email);
}

const errorCodeClasses = useOptionClass("show", isError);
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
        <TextInput type="text" v-model:input-value="email">
          <template #label>이메일</template>
        </TextInput>
        <TextInput type="password" v-model:input-value="pw">
          <template #label>패스워드</template>
        </TextInput>
        <span :class="['Login__ErrorCode', errorCodeClasses]">
          {{ errorCode }}
        </span>
      </div>
      <div class="btn-area">
        <StyledButton
          root="button"
          type="button"
          :icon="false"
          :disabled="isEmailBlank || !isEmailValid"
          class="Login__Button Login__Button--ResetPassword"
          @click="resetPW"
        >
          <template #Text>패스워드 초기화</template>
        </StyledButton>
        <StyledButton
          root="button"
          type="submit"
          :icon="false"
          :disabled="isEmailBlank || isPWBlank"
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

  &__ErrorCode {
    display: flex;
    align-items: center;
    height: 2rem;
    font-size: 1.2rem;
    padding: 0 var(--card-padding);
  }

  .btn-area {
    display: flex;
    justify-content: flex-end;
  }
  &__Button {
    color: #fff;
    &:disabled {
      background-color: var(--theme-300);
    }
    &--ResetPassword {
      background-color: transparent;
      color: inherit;
      &:disabled {
        background-color: transparent;
        color: var(--text-100);
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .Login__Title {
    margin-bottom: 2rem;
  }
}
</style>
