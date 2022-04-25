<template>
  <div class="card bg-dark-ui" @click="goRequestDetail(data.id)">
    <div class="card__header d-flex justify-content-between">
      <div>
        <font-awesome-icon :icon="['far', 'clock']" />
        <span>{{
          data ? formatTime(data.deadline, "dd/MM/yyyy") : "--/--/----"
        }}</span>
      </div>
      <div>
        <span :class="status.class">{{ status.text }}</span>
      </div>
    </div>
    <div class="card__body">
      <div class="request">
        <div class="request__title">{{ data.title }}</div>
        <list-skill class="small" :list-skill="data.skills"></list-skill>
      </div>
      <div class="card__footer">
        <div class="price">
          <span>{{ data.price.toLocaleString("vi-VI") }}<sup>UNIT</sup></span>
        </div>
        <div class="media">
          <a href="" class="circle">
            <img
              class="avatar"
              v-if="data.userInfoResponse.avatar"
              :src="data.userInfoResponse.avatar"
              alt="avatar"
            />
            <img
              v-else-if="data.userInfoResponse.gender"
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
            <a href="">{{ data.userInfoResponse.fullName }}</a>
            <a href="" class="username"
              >@{{ data.userInfoResponse.username }}</a
            >
            <p>{{ data.job }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

import { Request, RequestStatus } from "@/types/request";
import ListSkill from "@/components/ListSkill.vue";

@Component({
  components: {
    ListSkill
  }
})
export default class RequestCard extends Vue {
  @Prop() readonly data: Request | undefined;

  get status() {
    if (!this.data)
      return {
        text: "",
        class: ""
      };
    return RequestStatus[this.data.status];
  }

  goRequestDetail(id: string) {
    if (!id) return;
    this.$router.push({ name: "RequestDetail", params: { id: id } });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/config/color";
@import "~@/assets/scss/config/variables";
@import "~@/assets/scss/components/card";
.card {
  &__header {
    color: $color-online;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #c7af8b;

    span {
      margin-left: 0.5rem;
    }
  }

  &__body {
    padding: 0.5rem 1.75rem;
    width: 100%;
  }

  &__footer {
    .price {
      position: absolute;
      bottom: 7.5rem;
      padding: 5px 15px;
      font-weight: 400;
      font-size: 1.25rem;
      border-radius: 0.55rem;
      width: calc(100% - 3.5rem);
      text-align: center;
      background-color: #3a3b3c;
      background-image: linear-gradient(to right, #242526, #3a3b3c, #242526);
    }
  }
}

.request {
  &__title {
    font-size: 1.125rem;
    font-weight: 400;
    color: #e4e6eb;
    line-height: 1.25;
    margin-bottom: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    &:hover {
      color: #c7af8b;
    }
  }

  &__content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.media {
  position: absolute;
  bottom: 1.5rem;

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
    border: 3px solid #28a745;
    border-radius: 50%;
    margin-right: 1rem;
    padding: 0.35rem;

    &:hover {
      border: 3px solid #18d844;
    }

    .avatar {
      width: 3.25rem;
      border-radius: 50%;
    }
  }
}
</style>
