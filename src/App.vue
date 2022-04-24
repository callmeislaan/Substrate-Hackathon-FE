<template>
  <div id="app">
    <!-- The Header -->
    <the-header v-if="showNav" />

    <div :class="{ 'nav-space': showNav }">
      <router-view />
    </div>
    <!-- <footer-common></footer-common> -->
  </div>
  <!-- End wrapper -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/common/TheHeader.vue";
import { getModule } from "vuex-module-decorators";
import AuthModule from "@/store/auth/auth.module";
import FooterCommon from "@/components/common/FooterCommon.vue";

// import $ from "jquery";

@Component({
  components: {
    TheHeader,
    FooterCommon
  }
})
export default class App extends Vue {
  private AuthInstance = getModule(AuthModule, this.$store);

  get showNav() {
    return (
      this.$route.name &&
      !["LogIn", "SignUp", "NotFound", "ActiveUserSuccess"].includes(
        this.$route.name + ""
      )
    );
  }

  mounted() {
    //document.body.classList.add("bg-dark");
  }
}
</script>
<style lang="scss">
@import "~@/assets/scss/main.scss";
@import "./assets/scss/common.scss";
@import "./assets/scss/color.scss";
@import "./assets/scss/grid.scss";

.nav-space {
  padding-top: 9.875rem;
}
</style>
