<template>
  <div class="about">
    <h6 class="title">Tạo yêu cầu</h6>
    <div class="about-info bg-dark-ui border-ui mb-4">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <div class="form-row">
            <div class="form-group col-md-12">
              <validation-provider
                rules="required|limitTitleOfRequest"
                v-slot="{ errors }"
              >
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide',
                  }"
                >
                  <legend>Tiêu đề</legend>
                  <input
                    v-model="request.title"
                    placeholder="Nhập tiêu đề"
                    name="tiêu đề"
                    type="text"
                    class="form-control"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-4">
              <validation-provider
                name="ngày hết hạn"
                rules="required"
                v-slot="{ errors }"
              >
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide',
                  }"
                >
                  <legend>Ngày hết hạn</legend>
                  <date-picker
                    v-model="deadlineDate"
                    format="DD-MM-YYYY"
                    prefix-class="anest"
                    placeholder="Chọn ngày"
                    :disabled-date="disablePastDate"
                    @change="deadlineTime = null"
                  ></date-picker>
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-4">
              <validation-provider
                name="giờ hết hạn"
                rules="required"
                v-slot="{ errors }"
              >
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide',
                  }"
                >
                  <legend>Giờ hết hạn</legend>
                  <date-picker
                    v-model="deadlineTime"
                    type="time"
                    format="HH:mm"
                    :show-second="false"
                    prefix-class="anest"
                    placeholder="Chọn giờ"
                  ></date-picker>
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-4">
              <validation-provider
                rules="required|amountOfCreateRequest|limitAmountPaid"
                v-slot="{ errors }"
              >
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide',
                  }"
                >
                  <legend>Số tiền trả</legend>
                  <input
                    v-model="request.price"
                    name="số tiền trả"
                    type="text"
                    class="form-control"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12">
              <validation-provider rules="required" v-slot="{ errors }">
                <fieldset
                  v-bind:class="errors.length !== 0 ? 'is-invalid' : ''"
                  v-tooltip.bottom="{
                    content: errors[0],
                    class:
                      errors.length !== 0 ? 'anest-tooltip' : 'tooltip-hide',
                  }"
                >
                  <legend>Nội dung yêu cầu</legend>
                  <textarea
                    v-model="request.content"
                    name="nội dung yêu cầu"
                    placeholder="Nhập chi tiết nội dung yêu cầu"
                    type="text"
                    class="form-control"
                    value="22 / 08 / 2020"
                    rows="10"
                  />
                </fieldset>
              </validation-provider>
            </div>
            <div class="form-group col-md-12">
              <fieldset class="bg-dark-ui p-3">
                <legend>Lựa chọn 3 thẻ liên quan về yêu cầu</legend>
                <list-skill :selectable="3" @selected="setListSkill" />
              </fieldset>
            </div>
            <div class="form-group col-md-12 text-right">
              <button
                class="btn-anest"
                :disabled="invalid"
                @click.prevent="createRequest"
              >
                <font-awesome-icon
                  :icon="['fas', 'check']"
                  class="text-tan"
                  fixed-width
                />
                Xác nhận
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { PostRequest, Request } from "@/types/request";
import { Skills } from "@/types/skill";

import ListSkill from "@/components/ListSkill.vue";

import { requestService } from "@/services/request/requests.service";

import DatePicker from "vue2-datepicker";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import api from "../../connection.js";

@Component({
  components: {
    ListSkill,
    DatePicker,
  },
})
export default class CreateRequestForm extends Vue {
  deadlineDate: string | null = null;
  deadlineTime: string | null = null;

  get deadlineTimestamp() {
    if (this.deadlineDate != null && this.deadlineTime != null) {
      const date = new Date(this.deadlineDate);
      const time = new Date(this.deadlineTime);
      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      return date.getTime();
    }
    return 0;
  }

  toastError = Swal.mixin(ToastError);

  request: Request = {
    id: 0,
    status: "",
    title: "",
    content: "",
    price: 50000,
    deadline: 0,
    time: 0,
    createdBy: "",
    createdDate: 0,
    skills: [],
    bookmarked: false,
    userInfoResponse: null,
    mentorInfoResponse: null,
    confirmStatus: null,
    startDoingTime: null,
  };

  setDeadlineDate(dateTxt: string) {
    if (this.request) {
      this.request.deadline = new Date(dateTxt).setHours(0);
    }
  }

  setDeadlineTime(timeTxt: string) {
    if (this.request) {
      const deadline = new Date(this.request.deadline);
      const [hour, minute] = timeTxt.split(":");
      deadline.setHours(+hour);
      deadline.setMinutes(+minute);
      this.request.deadline = deadline.getTime();
    }
  }

  setListSkill(skills: Skills) {
    if (this.request === null) return;
    this.request.skills = skills;
  }

  async createRequest() {
    const loader = this.$loading.show();
    if (!this.request) return;
    const params: PostRequest = {
      deadline: this.deadlineTimestamp,
      title: this.request.title,
      content: this.request.content,
      price: this.request.price,
      skillIds: this.request.skills
        ? this.request.skills.map((skill) => (skill ? skill.id : 0))
        : [],
    };
    try {
      const myapi = await api;
      console.log("myapi", myapi);
      const response = await requestService.createRequest(params);
      if (response.status == 200) {
        this.$router.push({
          name: "RequestDetail",
          params: { id: response.data.id },
        });
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  disablePastDate(date: Date) {
    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);
    return date <= curDate;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/components/datepicker.scss";
</style>

<style lang="scss" scoped>
@import "~@/assets/scss/form.scss";

.about .about-info {
  padding: 1rem 1rem 0.25rem 1rem;
}
.btn-anest {
  border: 2px solid #3a3b3c;
}

$default-color: red;
$primary-color: blue;
</style>

<style scoped>
.skills >>> .tag {
  margin-bottom: 0.5rem;
}
.form-group .is-invalid {
  border-color: #f18072 !important;
}
</style>
