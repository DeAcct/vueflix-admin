<script lang="ts" setup>
import { useRouter } from "vue-router";
import NotFoundAqua from "../assets/NotFoundAqua.a487baa1.svg";
import StyledButton from "../components/StyledButton.vue";
import { useAuth } from "../store/auth";
import Immersive from "../Layout/Immersive.vue";

const auth = useAuth();
const router = useRouter();
function goBack() {
  router.back();
}
</script>

<template>
  <Immersive body-root="div" class="NotFound">
    <template #Header>
      <h1 class="Title">뷰플릭스</h1>
    </template>
    <template #Body>
      <div class="row-top">
        <img
          :src="NotFoundAqua"
          alt="길을 잃어 슬픈 코노스바 아쿠아"
          class="NotFoundImage"
        />
        <h2 class="GuideText">찾을 수 없는 메뉴입니다.</h2>
      </div>
      <div class="row-bottom">
        <StyledButton
          class="back"
          root="button"
          type="button"
          role="link"
          @click="goBack"
          :icon="false"
        >
          <template #Text>뒤로가기</template>
        </StyledButton>
        <StyledButton
          root="RouterLink"
          :to="auth.user ? '/' : '/login'"
          :icon="false"
        >
          <template #Text>{{ auth.user ? "홈" : "로그인" }}</template>
        </StyledButton>
      </div>
    </template>
  </Immersive>
</template>

<style lang="scss" scoped>
.NotFound {
  .Title {
    font-size: 3rem;
    color: #fff;
  }
  .row-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .NotFoundImage {
    width: 9.6rem;
    border-radius: var(--radius-3);
    margin-bottom: 1rem;
  }
  .GuideText {
    font-size: 2rem;
  }

  .row-bottom {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .StyledButton {
      color: #fff;
      &.back {
        background-color: transparent;
        color: inherit;
      }
    }
  }
}
</style>
