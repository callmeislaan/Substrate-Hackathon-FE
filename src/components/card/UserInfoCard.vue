<template>
  <div>
    <div v-if="profile" class="card p-3 bg-dark-ui border-ui mb-3">
      <div class="role-info text-center">
        {{ role === "mentor" ? "MENTOR" : "NGƯỜI TẠO" }}
      </div>
      <figure class="profile-image">
        <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar" />
        <img
          v-else-if="profile.gender"
          src="../../assets/images/system/v.png"
          alt="Default-Avatar"
        />
        <img
          v-else
          src="../../assets/images/system/v2.png"
          alt="Default-Avatar"
        />
      </figure>
      <div
        class="user-info text-center"
        :class="{ 'mentor-info': role === 'mentor' }"
        @click="goToMentorProfile"
      >
        <p class="user-info__name">{{ profile.fullName }}</p>
        <p class="user-info__username">@{{ profile.username }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

import { Profile } from "@/types/profile/profile";

import { requestFollowingService } from "@/services/request/request-following.service";

import Swal from "sweetalert2";
import { ToastSucess } from "@/mixins/sweetalert.mixin";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component
export default class UserInfoCard extends Vue {
  @Prop() readonly request!: Request;

  @Prop() readonly profile!: Profile;

  @Prop({ type: String, default: "" }) readonly role!: string;

  toastSucess = Swal.mixin(ToastSucess);

  toastError = Swal.mixin(ToastError);
  async submit() {
    if (!this.$route.params.id) return;
    try {
      const response = await requestFollowingService.postFollowingAndUnfollowing(
        this.$route.params.id
      );
      if (response.status == 200) {
        this.$router.push({ name: "BookmarkRequest" });
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  goToMentorProfile() {
    if (this.role !== "mentor" || !this.profile) return;
    this.$router.push({
      name: "MentorProfile",
      params: { id: this.profile.id }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/config/color.scss";
figure {
  margin: 0 0 0.5rem;
}
a {
  font-size: 1.125rem;
  color: #e4e6eb;
  pointer-events: auto;
}

.card {
  border-radius: 0.55rem;
  background-color: $color-dark;
  border-radius: 0.55rem;
  padding-bottom: 1.5rem;
}

.user-info {
  cursor: pointer;
  color: #c7af8b;

  &:hover {
    color: #e4e6eb !important;
  }
  padding: 0.5rem;

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 0.125rem;
  }

  &__username {
    display: none;
    font-size: 0.85rem;
    margin-bottom: 0;
  }
}

.profile-image {
  img {
    border-radius: 15px;
    width: 100%;
  }
}

.action {
  padding: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &__btn {
    text-align: center;
    width: 100%;
    transition: 0.3s;
    display: block;
    padding: 0.5rem 1rem;
    color: #e4e6eb;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: #3a3b3c;
      border-radius: 0.45rem;
    }
  }
}

.mentor-info {
  color: #c7af8b;
}

.role-info {
  color: #b0b3b8;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
</style>
