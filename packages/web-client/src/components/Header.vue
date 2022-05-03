<script setup>
import Menu from '@/components/Menu.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

console.log(user.userCredentials)



</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="navbar navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Rick&Morty APP</a>
        <Menu/>
      </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @import '@/assets/styles/Variables.scss';

  .header {
    @include display-flex-center;
    height: $header-height;
    background: $bg-color;
  }

  .navbar-brand {
    color: $font-color;

    &:hover {
      color: inherit;
    }
  }

  .dropdown-toggle {
    content: none;

    &::after {
      content: inherit;
    }
  }
  .dropdown-menu[data-bs-popper] {
    left: unset;
    right: 0;
  }
</style>