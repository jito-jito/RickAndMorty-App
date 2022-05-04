<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

</script>

<template>
  <Header />
    <main class="view"> 
      <slot/>
    </main>
  <Footer/>
</template>

<style lang="scss" scoped>
 @import '@/assets/styles/Variables.scss';

  .view {
    @include display-flex-center;
    justify-content: flex-start;
    flex-direction: column;
    height: $main-height;
    padding-top: 15px;
    background-color: $bg-color;
  }
</style>