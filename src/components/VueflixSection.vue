<template>
  <section class="VueflixSection inner">
    <div class="row-top">
      <h2 class="VueflixSection__Title">
        <slot name="title" />
      </h2>
      <slot name="counter" />
    </div>
    <div class="VueflixSection__Contents">
      <slot name="content" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.VueflixSection {
  .row-top {
    width: 100%;
    display: flex;
    margin-bottom: 1.5rem;
  }
  &__Title {
    font-size: 1.7rem;
  }
  &__Contents {
    border-radius: var(--radius-3);
    background-color: var(--bg-100);
    box-shadow: var(--box-shadow);
    padding: 1.5rem var(--inner-padding);
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
