<template>
  <div class="container">
    <!-- Left Side -->
    <left-side>
      <div>
        <info-panel />
        <div class="sidebar-menu bg-dark-ui border-ui mb-3">
          <ul>
            <li>
              <router-link :to="{ name: 'ProfileInfo' }">
                <font-awesome-icon
                  class="text-success mr-2"
                  :icon="['fas', 'user-edit']"
                  fixed-width
                />Trang cá nhân
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </left-side>

    <!-- Right Side -->
    <right-side>
      <!-- Views -->
      <update-mentor-form />
    </right-side>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import InfoPanel from "@/components/utils/InfoPanel.vue";
import UpdateMentorForm from "@/views/mentor/UpdateMentorForm.vue";

@Component({
  components: {
    LeftSide,
    RightSide,
    InfoPanel,
    UpdateMentorForm
  }
})
export default class UpdateMentor extends Vue {
  async mounted() {
    document.title = "Cập nhật trang hồ sơ";
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/label-info-panel.scss";
@import "../../assets/scss/sidebar.scss";
</style>
