<template>
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
            />Thông tin cá nhân
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li>
          <router-link :to="{ name: '' }">
            <font-awesome-icon
              class="text-info mr-2"
              :icon="['fas', 'history']"
              fixed-width
            />Lịch sử được thuê
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: '' }">
            <font-awesome-icon
              class="text-sea-green mr-2"
              :icon="['fas', 'chart-line']"
              fixed-width
            />Thống kê thu nhập
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li>
          <router-link :to="{ name: 'ManagerPostHistory' }">
            <font-awesome-icon
              class="text-yellow mr-2"
              :icon="['fas', 'history']"
              fixed-width
            />Lịch sử đăng bài
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: '' }">
            <font-awesome-icon
              class="text-violet mr-2"
              :icon="['fas', 'history']"
              fixed-width
            />Lịch sử thuê
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li>
          <router-link :to="{ name: '' }">
            <font-awesome-icon
              class="text-pink mr-2"
              :icon="['fas', 'history']"
              fixed-width
            />Lịch sử giao dịch
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li>
          <router-link :to="{ name: 'SettingUpdateInfo' }">
            <font-awesome-icon
              class="text-warning mr-2"
              :icon="['fas', 'cog']"
              fixed-width
            />Cài đặt tài khoản
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-menu bg-dark-ui border-ui mb-3">
      <ul>
        <li>
          <a href="">
            <font-awesome-icon
              class="text-tomato mr-2"
              :icon="['fas', 'sign-out-alt']"
              fixed-width
            />Đăng xuất
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoPanel from "@/components/utils/InfoPanel.vue";

@Component({
  components: {
    InfoPanel
  }
})
export default class Sidebar extends Vue {}
</script>

<style scoped lang="scss">
@import "../../assets/scss/sidebar.scss";
</style>
