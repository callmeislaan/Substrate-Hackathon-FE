<template>
  <div
    :class="{
      'detail card-focus': displayType === 'detail'
    }"
    class="card bg-dark-ui"
    @click="goMentorDetail(data.id)"
  >
    <div
      v-if="displayType !== 'detail'"
      class="card__header d-flex justify-content-between"
    >
      <div>
        <font-awesome-icon :icon="['fas', 'circle']" fixed-width />
        <span> ONLINE </span>
      </div>
      <rating-star class="text-rating-star" :rating="data.rating"></rating-star>
    </div>
    <div v-else class="card__header d-flex justify-content-between">
      <span>
        {{ data.rating }}
        <font-awesome-icon
          class="text-warning"
          :icon="['fas', 'star']"
          size="xs"
        />
        / {{ data.totalRequestFinish }} yêu cầu
      </span>
      <span class="price">
        {{ data.price.toLocaleString("vi-VI") }}<sup>đ</sup>/h
      </span>
    </div>
    <div class="card__body">
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
          <p class="ribbon" v-if="data.anestMentor">Anest</p>
        </a>
        <div class="media__body">
          <a href=""> {{ data.fullName }}</a>
          <a href="" class="username">@{{ data.username }}</a>
          <p>{{ data.job }}</p>
        </div>
      </div>
      <div class="card__footer">
        <list-skill class="small" :list-skill="data.listSkill"></list-skill>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Mentor } from "@/types/mentor";
import ListSkill from "@/components/ListSkill.vue";
import RatingStar from "@/components/utils/RatingStar.vue";

@Component({
  components: {
    ListSkill,
    RatingStar
  }
})
export default class MentorCard extends Vue {
  @Prop() readonly data: Mentor | undefined;

  @Prop({ type: String, default: "" }) readonly displayType!: string;

  goMentorDetail(id: string) {
    if (!id) return;
    this.$router.push({ name: "MentorProfile", params: { id: id } });
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

    span {
      margin-left: 0.5rem;
    }
  }

  &__body {
    padding: 1.75rem;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  &__footer {
    .skills {
      .tag {
        margin-top: 0.35rem;
        padding: 0.2rem 0.5rem;
        color: #b0b3b8;
        border: 2px solid #464646;
        font-weight: 700;
        font-size: 0.6rem;
      }
    }
  }
}

.detail.card {
  width: 16.7rem;
  height: 20rem;
  box-shadow: unset;

  .card__header {
    align-items: center;
    color: #e1e4eb !important;
    text-transform: unset;
    span {
      margin: 0;
    }
    .price {
      background-color: #3a3b3c;
      border-radius: 0.35rem;
      padding: 0.25rem 0.65rem;
      font-weight: 500;
    }
  }

  .card__body {
    padding: 1.75rem;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  &__footer {
    .skills {
      .tag {
        margin-top: 0.35rem;
        padding: 0.2rem 0.5rem;
        color: #b0b3b8;
        border: 2px solid #464646;
        font-weight: 700;
        font-size: 0.6rem;
      }
    }
  }
}

.media {
  margin-bottom: 1rem;

  &__body {
    padding-left: 1rem;
    max-width: calc(100% - 4.3rem);
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
    position: relative;
    border: 3px solid #28a745;
    border-radius: 50%;
    padding: 0.35rem;
    overflow: hidden;

    &:hover {
      border: 3px solid #18d844;
    }

    .avatar {
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
    }

    .ribbon {
      margin: 0;
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: 0.25rem;
      left: 50%;
      transform: translateX(-50%);
      background: #308b1a;
      color: white;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 0.55rem;
    }
  }
}

.text-rating-star {
  color: #cdbb15;
}
</style>
