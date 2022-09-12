<template>
  <code class="CodeBlock">
    <slot name="default" />
  </code>
</template>

<style lang="scss" scoped>
.CodeBlock {
  background-color: var(--bg-200);
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-1);
}
</style>
