<template>
  <footer class="footer">
    <p class="m-0">develop by jito-jito</p>
  </footer>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/Variables.scss';

  .footer {
    @include display-flex-center;
    height: $footer-height;
    margin: 0;
    background-color: $bg-color;
    background-size: cover;
    color: opacity($font-color, 0.7);
  }
</style>