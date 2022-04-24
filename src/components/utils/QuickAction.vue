<template>
  <div class="quick-action">
    <h6 class="title">Tìm kiếm cái gì khác</h6>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.quick-action {
  a {
    color: #b0b3b8;
    font-weight: 500;
    display: block;
    text-align: center;
    background-color: #242526;
    padding: 0.65rem 1rem;

    &:hover {
      text-decoration: none;
      background-color: #3a3b3c;
    }
  }

  .title {
    font-size: 1.05rem;
    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
}
</style>
