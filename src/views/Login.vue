<script lang="ts" setup>
import { computed, ref, Ref, onMounted } from "vue";
import { useCSSMotion } from "../composables/motions";
import { useFirebaseEmailLogin, firebaseLogout } from "../composables/firebase";
import StyledButton from "@/components/StyledButton.vue";
import TextInput from "@/components/TextInput.vue";
import VueflixLogo from "@/components/VueflixLogo.vue";
import { useRouter } from "vue-router";

const motion = useCSSMotion("1s", "cubic-bezier(0.85, 0, 0.15, 1)");

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
  <div class="Login">
    <header class="Login__Header">
      <h1 class="Logo">
        <VueflixLogo class="Logo__Img" />
        <span class="Logo__Text">관리자 {{}}</span>
      </h1>
    </header>
    <form class="Login__Form" @submit.prevent="onLogin">
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
    </form>
  </div>
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
  &__Header {
    width: 100%;
    height: min(100vw, 50vh);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: HeaderExpand v-bind("motion.duration") v-bind("motion.easing")
      forwards;
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
  }
  &__Form {
    flex-grow: 1;
    background-color: var(--bg-100);
    border-top-left-radius: 2.3rem;
    animation: FormRadius v-bind("motion.duration") v-bind("motion.easing")
      forwards;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--card-padding);
    .Input {
      margin-bottom: 2rem;
    }
    .TextInput {
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }
  }
  &__Button {
    color: #fff;
  }
}
@keyframes HeaderExpand {
  from {
    height: 0;
  }
}
@keyframes FormRadius {
  from {
    border-top-left-radius: 0;
  }
}

@media screen and (min-width: 1024px) {
  .Login {
    flex-direction: row;
    &__Title {
      margin-bottom: 2rem;
    }
    &__Header {
      width: calc(100vw - 50rem);
      height: auto;
    }
    &__Form {
      justify-content: center;
    }
  }
  @keyframes HeaderExpand {
    from {
      width: 0;
    }
  }
}
</style>
