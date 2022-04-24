<template>
  <div class="container">
    <div id="intro">
      <div class="middle error">
        <div class="error-panel">
          <div class="text-center">
            <div class="mb-4">
              <i>
                <font-awesome-icon
                  class="success mr-2"
                  :icon="['fas', 'check-circle']"
                  fixed-width
                  size="8x"
                />
              </i>
            </div>
            <h4 id="congra">Chúc mừng!</h4>
            <br />
            <h4>Bạn đã đăng ký tài khoản thành công</h4>
            <router-link :to="{ name: 'LogIn' }" class="btn btn-back">
              <font-awesome-icon
                class="mr-1"
                :icon="['fas', 'home']"
                fixed-width
              />Đăng nhập
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ActiveUserSuccess extends Vue {
  async mounted() {
    document.title = "Xác nhận tài khoản";
  }
}
</script>

<style scoped lang="scss">
/*
 * ---------- Intro ----------
 */

.container {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}

#intro .middle {
  display: table-cell;
  vertical-align: middle;
  position: relative;
  z-index: 1000;
}

#intro .middle .error-panel {
  min-width: 320px;
  max-width: 600px;
  padding: 2.5rem 2.25rem 2rem;
  margin-bottom: 5rem;
  border-radius: 0.5rem;
  background-color: #333;
  width: 40rem;
}

.error h4 {
  margin-bottom: 1.5rem;
}

.error a {
  color: #d0d0d0;
  font-size: 1rem;
}

#congra {
  margin-bottom: 0px !important;
}

.error .btn-back {
  padding: 0.45rem 1rem;
  border-radius: 0.35rem;
  background-color: #444;
}

.error .btn-back:hover {
  color: #ffc107;
  border: 1px solid #6d6d6d;
}
.success {
  color: #00ff00;
}
</style>
