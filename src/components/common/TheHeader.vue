<template>
  <header class="site-header">
    <top-header />
    <navbar />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopHeader from "./TopHeader.vue";
import Navbar from "./Navbar.vue";

@Component({
  components: {
    TopHeader,
    Navbar
  }
})
export default class TheHeader extends Vue {}
</script>

<style scoped lang="scss">
/*----- Site header -----*/
@import "~@/assets/scss/config/color";

.site-header {
  width: calc(100% - 3rem);
  padding-top: 1.5rem;
  z-index: 6;
  position: fixed;
  background-color: $color-bg-dark;
}

@media (max-width: 575.98px) {
  .site-header {
    position: relative;
    width: 100%;
  }
}
</style>
