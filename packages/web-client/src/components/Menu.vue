<template>
  <div class="dropdown">
    <div 
      class="dropdown-toggle" 
      id="dropdownMenu2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >

      <div 
        v-if="userStore.hasUser"
        class="userIcon d-flex align-items-center justify-content-center "
      >
        <IconUser />
        <p class="userName m-0 ms-2">{{userStore.userName}}</p>
      </div> 
      <IconMenu v-else />

    </div>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <template v-if="userStore.hasUser">
        <li class="nav-item" v-show="currentRoute !== 'favorites'">
          <RouterLink class="nav-link" to="/favorites">
            <button type="button" class="dropdown-item p-0">Favorites</button>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/">
            <button 
              @click="signOut"
              type="button" 
              class="dropdown-item p-0"
            >
              Sign out
            </button>
          </RouterLink>
        </li>
      </template>
       <template v-else>
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
      </template>
    </ul>
  </div>
</template>

<script>
import IconMenu from '@/components/icons/IconMenu.vue'
import IconUser from '@/components/icons/IconUser.vue'
import { useUserStore } from '@/stores/userStore.js'
import { useRouter, useRoute } from 'vue-router'
import { deleteCookie } from '@/utils/auth/cookie'

export default {
  components: {
    IconMenu,
    IconUser
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()

    function signOut(e) {
      deleteCookie('cookie')
      router.go('/')
    }
    return {
      userStore,
      signOut,
      currentRoute: route.name
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdown {
    &-toggle {
      content: none;

      &::after {
        content: inherit;
      }
    }
    &-menu[data-bs-popper] {
      left: unset;
      right: 0;
    }
    &-item:active {
      background-color: #f5f5f5;
      color: rgb(33, 37, 41);
    }
  }
  .userIcon:hover {
    cursor: pointer;
  }
</style>