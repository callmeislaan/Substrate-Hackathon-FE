<template>
  <div class="container">
    <!-- Left Side -->
    <left-side>
      <sidebar />
    </left-side>

    <!-- Right Side -->
    <right-side>
      <!-- Views -->
      <router-view />
    </right-side>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import Sidebar from "./Sidebar.vue";

@Component({
  components: {
    LeftSide,
    RightSide,
    Sidebar
  }
})
export default class Index extends Vue {}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index.scss";
</style>
