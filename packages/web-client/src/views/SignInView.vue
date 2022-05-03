<script setup>
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import { reactive } from '@vue/reactivity';

const userData = reactive({
  email: '',
  password: ''
})

function signIn(e) {
  e.preventDefault();
  console.log(e, userData)
}
function updateProp() {

}

</script>

<template>
  <main class="view">
    <div class="form-container p-4 rounded-3">
      <h2 class="text-center mb-4">Rick & Morty App</h2>
      <form>
        <div class="mb-3">
          <Input 
            :modelValue="userData.email"
            @update:modelValue="newValue => userData.email = newValue"
            title="Email address"
            type="email"
          />
        </div>
        <div class="mb-3">
          <Input 
            :modelValue="userData.password"
            @update:modelValue="newValue => userData.password = newValue"
            title="Password"
            type="password"
          />
        </div>
        <Button
          :onClick="signIn"
          type="submit"
          id="signIn-button"
        >
          Submit
        </Button>
      </form>
    </div>
  </main>
</template>

// <script>
// export default {
  
//   props: {

//   }
//   setup(props) {

//   }
// }
// </script>

<style lang="scss">
   @import '@/assets/styles/Variables.scss';
  
  .view {
    @include display-flex-center;
    flex-direction: column;
    height: 100vh;
    padding-top: 15px;
    background-color: $bg-color;
  }

  .form-container {
    background-color: $bg-color;

    form {
      @include display-flex-center;
      align-items: stretch;
      flex-direction: column;

      button {
        align-self: center;
      }
    }
  }

</style>