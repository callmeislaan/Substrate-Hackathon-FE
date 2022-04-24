<template>
  <div class="home">
    <section id="cover" class="cover">
      <div class="container bg-dark-ui border-ui text-left">
        <div class="row">
          <div class="col-lg-9">
            <h1>ANEST <span class="text-main">LEARNING.</span></h1>
            <p>
              TIẾT KIỆM THỜI GIAN VÀ TIỀN BẠC CỦA BẠN BẰNG SỰ LỰA CHỌN ĐÚNG ĐẮN_
            </p>
          </div>
          <div class="col-lg-3 text-left">
            <animated-circles></animated-circles>
          </div>
        </div>
      </div>
    </section>

    <!-- List Skills -->
    <section id="list-skill" class="recommend-tags-wrapper">
      <list-skill class="home" />
    </section>

    <!-- List Anest Mentors -->
    <section class="section" id="anest-mentors" v-if="anestMentors.length">
      <div class="section__title">
        <h5>
          <font-awesome-icon
            :icon="['fas', 'wifi']"
            class="text-success"
            fixed-width
          />
          ANEST MENTOR
        </h5>
        <div class="float-right">
          <button class="btn-anest" @click="goToListMentor">
            <font-awesome-icon :icon="['fas', 'eye']" fixed-width />
            Xem tất cả
          </button>
        </div>
      </div>
      <div class="container-fluid">
        <div class="label-card">
          <div class="card">
            <a class="card__heading" href="">Online</a>
          </div>
        </div>
        <list-card
          type="mentor-card"
          :list-data="anestMentors"
          class="list-card-online"
        />
      </div>
    </section>

    <!-- List Normal Mentors -->
    <section class="section" id="normal-mentors">
      <div class="section__title">
        <h5>
          <font-awesome-icon
            :icon="['fas', 'wifi']"
            class="text-success"
            fixed-width
          />
          MENTOR KHÁC
        </h5>
        <div class="float-right">
          <button class="btn-anest" @click="goToListMentor">
            <font-awesome-icon :icon="['fas', 'eye']" fixed-width />
            Xem tất cả
          </button>
        </div>
      </div>
      <div class="container-fluid">
        <div class="label-card">
          <div class="card">
            <a class="card__heading" href="">Online</a>
          </div>
        </div>
        <list-card
          type="mentor-card"
          :list-data="normalMentors"
          class="list-card-online"
        />
      </div>
    </section>

    <!-- List Request -->
    <section class="section" id="normal-mentors">
      <div class="section__title">
        <h5>
          <font-awesome-icon
            :icon="['fas', 'question']"
            class="text-warning"
            fixed-width
          />
          YÊU CẦU
          <button class="btn btn-anest-light btn-reload" @click="getRequests">
            <div
              class="circle-btn-wrap"
              :class="{ 'rotate-360': loadingRequest }"
            >
              <font-awesome-icon :icon="['fas', 'sync-alt']" />
            </div>
          </button>
        </h5>
        <div class="float-right">
          <button class="btn-anest" @click="goToListRequest">
            <font-awesome-icon :icon="['fas', 'eye']" fixed-width />
            Xem tất cả
          </button>
        </div>
      </div>
      <div class="container-fluid">
        <div class="label-card">
          <div class="card" id="request">
            <a class="card__heading" href="">Yêu cầu</a>
          </div>
        </div>
        <list-card
          type="request-card"
          :list-data="requests"
          class="list-card-online"
        />
      </div>
    </section>
    <request-item></request-item>
    <footer-common></footer-common>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import MentorModule from "../store/mentor/mentor.module";
import RequestModule from "../store/request/request.module";

import { Mentors } from "@/types/mentor";
import { Requests } from "@/types/request";

import ListSkill from "@/components/ListSkill.vue";
import ListCard from "@/components/card/ListCard.vue";
import AnimatedCircles from "@/components/animated/AnimatedCircles.vue";
import AuthModule from "../store/auth/auth.module";
import FooterCommon from "@/components/common/FooterCommon.vue";
import RequestItem from "@/components/request/RequestItem.vue";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    ListSkill,
    ListCard,
    AnimatedCircles,
    RequestItem,
    FooterCommon
  }
})
export default class Home extends Vue {
  /** data */
  private isActive = true;

  private anestMentors: Mentors = [];
  private normalMentors: Mentors = [];
  private requests: Requests = [];

  private MentorInstance = getModule(MentorModule, this.$store);
  private RequestInstance = getModule(RequestModule, this.$store);

  private AuthInstance = getModule(AuthModule, this.$store);

  loadingRequest = false;

  created() {
    document.title = "Anest Learning";
    const loader = this.$loading.show();
    this.firstLoad().then(() => {
      loader.hide();
    });
  }

  toastError = Swal.mixin(ToastError);

  async firstLoad() {
    await this.getAnestMentors();
    await this.getNormalMentors();
    await this.getRequests();
  }

  async getAnestMentors() {
    try {
      await this.MentorInstance.fetchAnestMentors();
      this.anestMentors = this.MentorInstance.getAnestMentors;
    } catch (e) {
      this.anestMentors = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getNormalMentors() {
    try {
      await this.MentorInstance.fetchNormalMentors();
      this.normalMentors = this.MentorInstance.getNormalMentors;
      if (this.AuthInstance.currentUser && this.normalMentors) {
        this.normalMentors = this.filterMentors(
          this.MentorInstance.getNormalMentors,
          this.AuthInstance.currentUser.id
        );
      }
    } catch (e) {
      this.normalMentors = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getRequests() {
    this.loadingRequest = true;
    try {
      await this.RequestInstance.fetchRequests();
      this.requests = this.RequestInstance.getRequests;
    } catch (e) {
      this.requests = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      this.loadingRequest = false;
    }
  }

  filterMentors(mentors: Mentors, id: number): Mentors {
    if (mentors) {
      for (let i = 0; i < mentors.length; i++) {
        if (mentors[i]?.id == id) {
          mentors.splice(i, 1);
          break;
        }
      }
      return mentors;
    }
    return [];
  }

  goToListRequest() {
    this.$router.push({ name: "ListRequest" });
  }

  goToListMentor() {
    this.$router.push({ name: "ListMentor" });
  }
}
</script>

<style lang="scss" scoped>
.recommend-tags-wrapper {
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  border-top: 2px solid #3a3b3c;
  border-bottom: 2px solid #3a3b3c;
  padding: 0.85rem 0;
}

.section {
  width: 100%;
  padding: 2.5rem 0;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

#request {
  background-image: linear-gradient(0deg, #e52e71, #ffc107);
}

.label-card {
  position: absolute;
  padding: 1.5rem 0;

  .card {
    width: 15rem;
    height: 25rem;
    padding: 1.75rem;
    border: none;
    background-image: linear-gradient(0deg, #28a745, #ffc107);
    border-radius: 0.55rem;

    &__heading {
      font-size: 3.125rem;
      position: absolute;
      bottom: 1.35rem;
      line-height: 1.2;
      font-weight: 600;
      color: #e4e6eb;

      &:hover {
        color: #ffc107;
        text-decoration: none;
      }
    }
  }

  // .card-request {
  //   width: 15rem;
  //   height: 25rem;
  //   padding: 1.75rem;
  //   border: none;
  //   background-image: linear-gradient(0deg, #e52e71, #ffc107);

  //   &__heading {
  //     font-size: 3.125rem;
  //     position: absolute;
  //     bottom: 1.35rem;
  //     line-height: 1.2;
  //     font-weight: 600;
  //     color: #e4e6eb;

  //     &:hover {
  //       color: #ffc107;
  //       text-decoration: none;
  //     }
  //   }
  // }
}

.cover {
  padding-top: 1.25rem;
  padding-bottom: 2.5rem;

  .container {
    overflow: hidden;
    margin-right: auto;
    margin-left: auto;
    padding: 6.25rem 5rem !important;
    max-width: 100%;
  }

  h1 {
    font-size: 4rem;
    margin-top: 0.75rem;
    letter-spacing: 1px;
    font-style: normal;
    text-transform: uppercase;
    color: #c7af8b;
  }

  p {
    margin: 2rem 0;
    letter-spacing: 1px;
    font-style: normal;
    text-transform: uppercase;
    color: #c7af8b;
    font-size: 1rem;
  }
}

.list-card-online {
  margin-left: 18rem;
}

.text-tan {
  color: #ffc107;
}

.btn-reload {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  padding: 0;
}

.circle-btn-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotate-360 {
  animation: spinner 0.5s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
