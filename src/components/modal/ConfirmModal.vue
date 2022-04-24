<template>
  <div class="wrapper" :class="{ show: modalShown }">
    <div
      ref="confirm-modal"
      class="modal"
      :class="{ show: modalShown }"
      id="confirmModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmModal"
      aria-hidden="true"
      @click.self="xxx"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body p-4">
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="hideModal"
              v-if="flag !== true"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="text-center">
              <div class="mb-4">
                <slot></slot>
              </div>
              <h4 class="mt-0">{{ title }}</h4>
            </div>
          </div>
          <div class="modal-footer p-3">
            <div class="text-center w-100">
              <button
                type="button"
                class="btn btn-lg btn-anest-light mr-2"
                @click="hideModal"
                v-if="flag !== true"
              >
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  class="text-danger mr-2"
                ></font-awesome-icon>
                <span class="btn-text">Huỷ bỏ</span>
              </button>
              <button
                type="button"
                class="btn btn-lg btn-anest-light"
                @click="emitConfirm"
              >
                <font-awesome-icon
                  :icon="['fas', 'check']"
                  class="text-sea-green mr-2"
                ></font-awesome-icon>
                <span class="btn-text">Xác nhận</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" :class="{ show: modalShown }"></div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";

@Component
export default class ConfirmModal extends Vue {
  @Prop({ type: String, default: "Xác nhận thực hiện tác vụ" })
  readonly title!: string;

  @Prop(Boolean) trigger!: boolean;
  @Prop(Boolean) flag!: boolean;
  modalShown = false;

  async created() {
    console.log(this.flag);
  }

  xxx() {
    this.flag !== true ? this.hideModal() : "";
  }

  emitConfirm() {
    this.$emit("confirm");
    this.hideModal();
  }

  @Watch("trigger")
  toogleModal() {
    this.modalShown = true;
  }

  hideModal() {
    this.modalShown = false;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: none;
  &.show {
    display: block !important;
  }
}

.modal-content {
  margin: auto;
  width: 30%;
  min-width: 330px;
}
.btn {
  min-width: 8.2rem;
  font-size: 1.05rem !important;
}

.close {
  padding: 0.5rem !important;
  margin: -1.25rem -1.25rem !important;
  cursor: pointer;
  color: #a9b2b9;
  z-index: 1;

  &:hover {
    color: #a9b2b9;
  }
}
</style>
