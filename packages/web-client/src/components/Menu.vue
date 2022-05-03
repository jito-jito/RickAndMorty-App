<script setup>
import IconMenu from '@/components/icons/IconMenu.vue'
</script>

<template>
  <div class="dropdown">
    <div 
      class="dropdown-toggle" 
      id="dropdownMenu2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <IconMenu />
    </div>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/signIn">
          <button type="button" class="dropdown-item">Sign in</button>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/signUp">
          <button type="button" class="dropdown-item">Sign up</button>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
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