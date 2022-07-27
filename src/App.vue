<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.path"></component>
  </router-view>
</template>

<style lang="scss" scoped></style>
