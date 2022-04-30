<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" class="btn btn-success">Bootstrap button</button>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & > button {
      margin-top: 20px
    }
  }
}
</style>
