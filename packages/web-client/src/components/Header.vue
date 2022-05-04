<script setup>
import Menu from '@/components/Menu.vue'

</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="navbar navbar-light">
      <div class="container-fluid">
        <RouterLink class="nav-link navbar-brand" to="/">
          Rick&Morty APP 
        </RouterLink>
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
      color:  opacity($font-color, .8);
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