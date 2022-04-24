<template>
  <div
    class="bg-dark-ui border-ui bookmarked-request-content mb-3 card-focus"
    @click="gotoMentorProfile"
    v-if="rentMentor"
  >
    <div class="price">
      {{ rentMentor.price ? rentMentor.price.toLocaleString("vi-VI") : 0 }}
      VND
    </div>

    <div class="media">
      <ul>
        <li>
          <router-link :to="{ name: 'ProfileInfo' }" class="circle">
            <img
              class="avatar"
              v-if="rentMentor && rentMentor.avatar"
              :src="rentMentor.avatar"
              alt="avatar"
              width="50"
            />
            <img
              v-else-if="rentMentor && rentMentor.gender"
              class="avatar"
              src="../../assets/images/system/v.png"
              alt="avatar"
              width="50"
            />
            <img
              v-else
              class="avatar"
              src="../../assets/images/system/v2.png"
              alt="avatar"
              width="50"
            />
            <p class="ribbon" v-if="rentMentor.anestMentor">Anest</p>
          </router-link>
        </li>
        <li>
          <rating-star
            :rating="rentMentor.rating"
            class="text-warning"
          ></rating-star>
        </li>
      </ul>
      <div class="media-body">
        <a href="#" class="mt-0 request-title">{{ rentMentor.fullName }} </a>
        <p class="username">@{{ rentMentor.username }}</p>
        <p class="mentor-job">{{ rentMentor.job }}</p>
        <list-skill
          class="small"
          :class="displayType === 'small-card' ? 'x-small' : ''"
          :list-skill="rentMentor ? rentMentor.listSkill : []"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

import { RentMentor } from "@/types/mentor/rentMentor";

import ListSkill from "@/components/ListSkill.vue";

import InfoPanel from "@/components/utils/InfoPanel.vue";

import RatingStar from "@/components/utils/RatingStar.vue";

import ConfirmModal from "@/components/modal/ConfirmModal.vue";

@Component({
  components: {
    ListSkill,
    InfoPanel,
    RatingStar,
    ConfirmModal
  }
})
export default class MentorItem extends Vue {
  @Prop() rentMentor: RentMentor | undefined;

  @Prop({ type: String, default: "detail" }) readonly displayType!: string;

  gotoMentorProfile() {
    if (!this.rentMentor) return;
    this.$router.push({
      name: "MentorProfile",
      params: { id: "" + this.rentMentor.id }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mentor-profiles/mentor-profiles.scss";
@import "../../assets/scss/info-panel.scss";

.bookmarked-request-content {
  padding: 1.25rem;
  position: relative;
  padding-bottom: 0;
}

.btn-success {
  padding: 0.14rem 0.75rem;
}

.bookmarked-request-content .media {
  align-items: flex-start !important;
  padding-right: 10rem;
  padding-top: 0px !important;
}

.bookmarked-request-content .media .media-body > a {
  font-size: 1.125rem;
  font-weight: 400;
  color: #e4e6eb;
  margin-bottom: 0.25rem;
  width: 12rem;
}

#star {
  padding-top: 5px;
}

.bookmarked-request-content .media .media-body a:hover {
  color: #c7af8b;
  text-decoration: none;
}

.bookmarked-request-content .media .media-body .time {
  color: #b0b3b8;
  letter-spacing: 1px;
}

.bookmarked-request-content .media .media-body .time i {
  font-size: 0.85rem;
}

.bookmarked-request-content .media .media-body span {
  font-size: 0.85rem;
  font-weight: 500;
}

.bookmarked-request-content .media .media-body .tags {
  margin-top: 0.25rem;
}

.bookmarked-request-content .media .media-body .tags .tag {
  display: inline-block;
  margin-top: 0.35rem;
  margin-right: 0.15rem;
  padding: 0.2rem 0.75rem;
  border-radius: 0.75rem;
  text-transform: uppercase;
  color: #b0b3b8;
  border: 2px solid #3a3b3c;
  font-style: normal;
  font-weight: 700;
  font-size: 0.6rem;
  transition: 0.3s;
}

.bookmarked-request-content .media .media-body .tags .tag:hover {
  text-decoration: none;
  color: #e4e6eb;
  border: 2px solid #3a3b3c;
  background-color: #3a3b3c;
  cursor: pointer;
}

.bookmarked-request-content .price {
  position: absolute;
  right: 1.75rem;
  background-color: #3a3b3c;
  border-radius: 0.35rem;
  padding: 0.25rem 0.65rem;
  font-weight: 500;
}

.bookmarked-request-content .mentor-anest {
  position: absolute;
  right: 8.75rem;
  top: 1rem;
  border-radius: 0.35rem;
  padding: 0.25rem 0.65rem;
  font-weight: 400;
}

.bookmarked-request-content .media .media-body .action {
  margin-top: 0.8rem;
}

@media (max-width: 767.98px) {
  .bookmarked-request-content .media {
    padding-right: 0;
  }
  .bookmarked-request-content .price {
    display: none;
  }
}

.text-status {
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  letter-spacing: 0;
}

.request-title {
  font-size: 1.25rem !important;
}

.request-content {
  margin-top: 1.5rem;
  p {
    min-height: 40vh;
  }
}

.small-card {
  padding: 1rem !important;
  min-height: fit-content !important;

  svg.bi-question-circle {
    display: none;
  }

  .request-title {
    font-size: 1rem !important;
  }

  .request-content {
    display: none;
  }

  .request-deadline,
  .request-status {
    font-size: 0.75rem !important;
  }

  .price {
    display: none;
  }

  .media {
    padding-right: 0;
  }
}
.mentor-job {
  margin-bottom: 0.5rem;
}
.media-body .username {
  margin-bottom: 0.3rem;
}
.small {
  margin-bottom: 0.5rem;
}

.media {
  padding: 0.635rem;
  border-radius: 0.45rem;
  transition: 0.3s;

  .circle {
    position: relative;
    border: 3px solid #28a745;
    border-radius: 50%;
    margin-right: 0.75rem;
    padding: 0.25rem;
    overflow: hidden;

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

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      list-style: none;

      a {
        color: #b0b3b8;
        padding: 0.5rem 0.65rem;
        border-radius: 0.45rem;
        display: block;

        &:hover {
          background-color: #3a3b3c;
          text-decoration: none;
        }
      }
    }
  }

  .avatar {
    border-radius: 50%;
    pointer-events: auto;
  }
}
</style>
