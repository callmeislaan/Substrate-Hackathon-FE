<template>
  <div class="row">
    <div class="col-md-12" v-if="mentors.length">
      <div
        v-for="(data, index) in mentors"
        class="wrapper-mentor bg-dark-ui border-ui"
        :key="index"
      >
        <div class="media">
          <a href="" class="circle">
            <img
              class="avatar"
              v-if="data.profileImgPath"
              :src="data.profileImgPath"
              alt="avatar"
            />
            <img
              v-else-if="data.gender"
              class="avatar"
              src="../../assets/images/system/v.png"
              alt="avatar"
            />
            <img
              v-else
              class="avatar"
              src="../../assets/images/system/v2.png"
              alt="avatar"
            />
          </a>
          <div class="media__body">
            <router-link :to="`/mentor-profiles/${data.id}`">
              {{ data.fullName }}
            </router-link>
            <router-link
              :to="`/mentor-profiles/${data.id}`"
              class="username mb-0"
            >
              @{{ data.username }}
            </router-link>
          </div>
        </div>
        <div class="actions">
          <button class="btn-anest" @click="triggerModalConfirm(data)">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="mr-2 text-violet"
              size="lg"
            />
            Thuê
          </button>
          <button class="btn-anest" @click="hideMentor(data)">
            <font-awesome-icon
              :icon="['fas', 'times']"
              class="mr-2 text-danger"
              size="lg"
            />
            Xóa
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12" v-else>
      <h6 class="text-center">Hiện không có mentor nhận yêu cầu này</h6>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import MentorModule from "@/store/mentor/mentor.module";

import { Mentor, Mentors } from "@/types/mentor";
import { Request } from "@/types/request";

import { requestService } from "@/services/request/requests.service";

import Swal from "sweetalert2";
import { ConfirmMixin, ToastError } from "@/mixins/sweetalert.mixin";

@Component
export default class PendingMentor extends Vue {
  @Prop({ type: Number, default: () => null })
  readonly request!: Request;

  MentorInstance = getModule(MentorModule, this.$store);

  mentors: Mentors = [];
  currentMentor: Mentor = null;

  confirm = Swal.mixin(ConfirmMixin);
  toastError = Swal.mixin(ToastError);

  @Watch("request", { immediate: true })
  async getPendingMentors(request: Request) {
    if (!request || !request.id) return;
    await this.MentorInstance.fetchPendingMentors(request.id);
    this.mentors = this.MentorInstance.getPendingMentors;
  }

  triggerModalConfirm(mentor: Mentor) {
    this.currentMentor = mentor;
    if (!this.request) return;
    this.confirm
      .fire({
        title: `<span>Bạn sẽ bị trừ ${this.request.price.toLocaleString(
          "vi-VN"
        )}<sup>UNIT</sup> khi xác nhận thuê mentor</span>`
      })
      .then(result => {
        if (result.isConfirmed) {
          this.hireMentor();
        }
      });
  }

  async hireMentor() {
    if (!this.currentMentor || !this.request || !this.request.id) return;
    try {
      const response = await requestService.hireMentor(
        this.request.id,
        this.currentMentor.id
      );
      if (response && response.status == 200)
        this.$emit("hired", this.currentMentor);
    } catch (e) {
      this.toastError.fire({
        icon: "error",
        title: e.response.data.message
      });
    }
  }

  async hideMentor(mentor: Mentor) {
    if (!mentor || !this.request || !this.request.id) return;
    try {
      const response = await requestService.deletePendingMentor(
        this.request.id,
        mentor.id
      );
      if (response && response.status == 200) this.$emit("hided", mentor);
    } catch (e) {
      this.toastError.fire({
        icon: "error",
        title: e.response.data.message
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-anest {
  width: 7rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  background-color: #3a3b3c;
  margin: 0.25rem;
  &:hover {
    background-color: #4d4f50;
  }
}

.wrapper-mentor {
  padding: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.media {
  display: flex;
  align-items: center !important;
  justify-content: center;
  margin-bottom: 0.5rem;

  &__body {
    a {
      font-size: 1rem;
      color: #c7af8b;
      display: block;

      &.username {
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
      }

      &:hover {
        text-decoration: none;
        color: #ffc107;
      }
    }

    p {
      font-size: 0.895rem;
      color: #b0b3b8;
    }
  }

  .circle {
    border: 2px solid #28a745;
    border-radius: 50%;
    margin-right: 1rem;
    padding: 0.2rem;

    &:hover {
      border: 2px solid #18d844;
    }

    .avatar {
      width: 2.75rem;
      border-radius: 50%;
    }
  }
}
</style>
