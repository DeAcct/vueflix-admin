<template>
  <section class="VueflixSection inner">
    <div class="headtext">
      <div class="row-top">
        <h2 class="VueflixSection__Title">
          <slot name="title" />
        </h2>
        <slot name="counter" />
      </div>
      <slot name="description" />
    </div>
    <div class="VueflixSection__Contents">
      <slot name="content" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.VueflixSection {
  .headtext {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    .row-top {
      width: 100%;
      display: flex;
      align-items: center;
      :not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
  &__Title {
    font-size: 1.7rem;
  }
  &__Contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: var(--radius-3);
    background-color: var(--bg-100);
    box-shadow: var(--box-shadow);
  }

  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
}
</style>
