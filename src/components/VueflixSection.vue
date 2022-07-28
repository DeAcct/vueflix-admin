<template>
  <section class="VueflixCard">
    <h2 class="VueflixCard__Title">
      <slot name="title" />
    </h2>
    <div class="VueflixCard__Contents">
      <slot name="content" />
    </div>
  </section>
</template>
