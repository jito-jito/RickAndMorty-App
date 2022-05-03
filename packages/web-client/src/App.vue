<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="body-container">
    <RouterView />
  </div>
</template>

<style lang="scss">
  @import '@/assets/styles/Variables.scss';

  body {
    background-image: url('@/assets/images/background.png');
    background-size: cover;
    color: $font-color;
  }
  .body-container {
    background-color: $bg-color;
  }

</style>
