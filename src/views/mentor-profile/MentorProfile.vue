<template>
  <div class="container clearfix">
    <!-- Left Side -->
    <left-side>
      <div class="profile bg-dark-ui border-ui mb-3" v-if="mentorInfo">
        <div class="price" v-if="mentorInfo.anestMentor">
          <span>anest</span>
        </div>
        <div class="profile-name">
          <p class="name">{{ mentorInfo.fullName }}</p>
          <p class="username">@{{ mentorInfo.username }}</p>
        </div>
        <figure class="profile-image">
          <img
            class="avatar"
            v-if="mentorInfo && mentorInfo.avatar"
            :src="mentorInfo.avatar"
            alt="avatar"
            width="50"
          />
          <img
            v-else-if="mentorInfo && mentorInfo.gender"
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
        </figure>
        <ul class="profile-information">
          <li />
          <li>
            <p><span>Ngày tham gia:</span> {{ mentorInfo.createdDate }}</p>
          </li>
          <li>
            <p>
              <span class="d-inline-block mb-2 mr-1">Nghề nghiệp: </span>
              <span class="d-inline-block text-common">{{
                mentorInfo.job
              }}</span>
            </p>
          </li>
          <li>
            <p>
              <span>Giá thuê:</span>
              {{ mentorInfo.price.toLocaleString("vi-VI") }}<sup>UNIT</sup>/h
            </p>
          </li>
        </ul>
      </div>

      <div
        class="action bg-dark-ui border-ui mb-3"
        v-if="
          mentorInfo &&
            AuthInstance.isAuthenticated &&
            !isOwnerThisPage() &&
            mentorInfo.anestMentor &&
            this.mentorIdOwner !== ''
        "
      >
        <div class="action-btn cursor-pointer">
          <a class="nav-link" @click.prevent="toggleConfirm(mentorId)">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="text-violet fa-lg mr-1"
              fixed-width
            />Thuê offline
          </a>
        </div>
      </div>

      <div
        class="action bg-dark-ui border-ui mb-3"
        v-if="
          AuthInstance.isAuthenticated &&
            mentorInfo &&
            !isOwnerThisPage() &&
            this.mentorIdOwner !== ''
        "
      >
        <div class="action-btn cursor-pointer">
          <a class="nav-link" @click.prevent="followOrUnfollow">
            <font-awesome-icon
              class="text-warning fa-lg mr-1"
              :icon="[mentorInfo.following ? 'fas' : 'far', 'bookmark']"
              fixed-width
            />{{ mentorInfo.following ? "Bỏ theo dõi" : "Theo dõi" }}
          </a>
        </div>
      </div>

      <div class="rate bg-dark-ui border-ui mb-3" v-if="mentorInfo">
        <div class="w-100">
          <h1>{{ mentorInfo.averageRating.toFixed(1) }}</h1>
          <rating-star
            :rating="mentorInfo.averageRating"
            class="text-warning"
          ></rating-star>
          <div class="reviews">{{ mentorInfo.totalRating }} đánh giá</div>
        </div>
        <div class="w-100">
          <div class="d-flex mt-progress">
            <div class="number">5</div>
            <div class="w-100">
              <div class="progress" style="height: 4px">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="'width: ' + mentorInfo.totalRating5 + '%'"
                  :aria-valuenow="mentorInfo.totalRating5"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>
          <div class="d-flex mt-progress">
            <div class="number">4</div>
            <div class="w-100">
              <div class="progress" style="height: 4px">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="'width: ' + mentorInfo.totalRating4 + '%'"
                  :aria-valuenow="mentorInfo.totalRating4"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>
          <div class="d-flex mt-progress">
            <div class="number">3</div>
            <div class="w-100">
              <div class="progress" style="height: 4px">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="'width: ' + mentorInfo.totalRating3 + '%'"
                  :aria-valuenow="mentorInfo.totalRating3"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>
          <div class="d-flex mt-progress">
            <div class="number">2</div>
            <div class="w-100">
              <div class="progress" style="height: 4px">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="'width: ' + mentorInfo.totalRating2 + '%'"
                  :aria-valuenow="mentorInfo.totalRating2"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>
          <div class="d-flex mt-progress">
            <div class="number">1</div>
            <div class="w-100">
              <div class="progress" style="height: 4px">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="'width: ' + mentorInfo.totalRating1 + '%'"
                  :aria-valuenow="mentorInfo.totalRating1"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </left-side>

    <!-- Right Side -->
    <right-side>
      <div class="overview" v-if="mentorInfo">
        <div class="row">
          <div class="col-6 col-md-6 col-lg-4 mb-3">
            <div class="label-info bg-dark-ui border-ui">
              <div class="flex">
                <div class="icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-question-circle text-danger"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                    />
                  </svg>
                </div>
                <div class="number">
                  <h4>{{ mentorInfo.totalRequestReceive }}</h4>
                </div>
              </div>
              <div class="description">
                <span>Yêu cầu thuê</span>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-4 mb-3">
            <div class="label-info bg-dark-ui border-ui">
              <div class="flex">
                <div class="icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-clock text-warning"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </div>
                <div class="number">
                  <h4>{{ mentorInfo.totalHoursBeHired }}h</h4>
                </div>
              </div>
              <div class="description">
                <span>Số giờ được thuê</span>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-4 mb-3">
            <div class="label-info bg-dark-ui border-ui">
              <div class="flex">
                <div class="icon">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-percent text-success"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                    />
                  </svg>
                </div>
                <div class="number">
                  <h4 v-if="mentorInfo.totalRequestReceive">
                    {{
                      (
                        (mentorInfo.totalRequestFinish /
                          mentorInfo.totalRequestReceive) *
                        100
                      ).toFixed(0)
                    }}%
                  </h4>
                  <h4 v-else>
                    ---%
                  </h4>
                </div>
              </div>
              <div class="description">
                <span>Tỷ lệ hoàn thành</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="menu">
        <ul class="row nav nav-pills" id="pills-tab" role="tablist">
          <li
            class="col-6 col-md-4 mb-3 nav-item text-center"
            role="presentation"
          >
            <a
              class="nav-link active"
              id="pills-info-tab"
              data-toggle="pill"
              href="#pills-info"
              role="tab"
              aria-controls="pills-info"
              aria-selected="true"
            >
              <font-awesome-icon class="mr-1" :icon="['far', 'address-card']" />
              Thông tin
            </a>
          </li>
          <li
            class="col-6 col-md-4 mb-3 nav-item text-center"
            role="presentation"
          >
            <a
              class="nav-link"
              id="pills-achievements-tab"
              data-toggle="pill"
              href="#pills-achievements"
              role="tab"
              aria-controls="pills-achievements"
              aria-selected="false"
            >
              <font-awesome-icon class="mr-1" :icon="['fas', 'award']" />
              Thành tích
            </a>
          </li>
          <li
            class="col-6 col-md-4 mb-3 nav-item text-center"
            role="presentation"
          >
            <a
              class="nav-link"
              id="pills-comment-tab"
              data-toggle="pill"
              href="#pills-comment"
              role="tab"
              aria-controls="pills-comment"
              aria-selected="false"
            >
              <font-awesome-icon class="mr-1" :icon="['far', 'comment']" />
              Bình luận
            </a>
          </li>
        </ul>
      </div>

      <div class="tab-content" id="pills-tabContent" v-if="mentorInfo">
        <div
          class="tab-pane fade show active"
          id="pills-info"
          role="tabpanel"
          aria-labelledby="pills-info-tab"
        >
          <fieldset class="bg-dark-ui">
            <legend>Giới thiệu</legend>
            <div class="row">
              <div class="col-md-12">
                <p>
                  {{ mentorInfo.introduction }}
                </p>
              </div>
            </div>
          </fieldset>
          <fieldset class="bg-dark-ui">
            <legend>Kỹ năng</legend>
            <div class="row">
              <div class="col-md-12">
                <p>
                  {{ mentorInfo.skillDescription }}
                </p>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-6"
                v-for="(skill, index) in mentorInfo.mentorSkillResponses"
                :key="index"
              >
                <div class="skills">
                  <h6>{{ skill.name }}</h6>
                  <div class="progress" style="height: 4px">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      :style="'width: ' + skill.value * 10 + '%'"
                      :aria-valuenow="skill.value"
                      aria-valuemin="0"
                      aria-valuemax="10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset class="bg-dark-ui">
            <legend>Dịch vụ</legend>
            <div class="row">
              <div class="col-md-12">
                <p>
                  {{ mentorInfo.service }}
                </p>
              </div>
            </div>
          </fieldset>
        </div>

        <div
          class="tab-pane fade"
          id="pills-achievements"
          role="tabpanel"
          aria-labelledby="pills-achievements-tab"
          v-if="this.achievements.length"
        >
          <!-- <div class="row">
            <div class="col-md-12">
              <div class="content bg-dark-ui border-ui">Thành tích</div>
            </div>
          </div> -->
          <fieldset
            class="bg-dark-ui"
            v-for="(achievement, index) in this.achievements"
            :key="index"
          >
            <legend>{{ achievement.title }}</legend>
            <div class="row">
              <div class="col-md-12">
                <p>
                  {{ achievement.content }}
                </p>
              </div>
            </div>
          </fieldset>
        </div>
        <div
          class="tab-pane fade"
          id="pills-achievements"
          role="tabpanel"
          aria-labelledby="pills-achievements-tab"
          v-else
        >
          <div class="row">
            <div class="col-md-12">
              <div class="content bg-dark-ui border-ui">
                Danh sách thành tích trống
              </div>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="pills-achievements"
          role="tabpanel"
          aria-labelledby="pills-achievements-tab"
          v-if="this.achievements"
        >
          <!-- <div class="row">
            <div class="col-md-12">
              <div class="content bg-dark-ui border-ui">Thành tích</div>
            </div>
          </div> -->
          <fieldset
            class="bg-dark-ui"
            v-for="(achievement, index) in this.achievements"
            :key="index"
          >
            <legend>{{ achievement.title }}</legend>
            <div class="row">
              <div class="col-md-12">
                <p>
                  {{ achievement.content }}
                </p>
              </div>
            </div>
          </fieldset>
        </div>
        <div
          class="tab-pane fade"
          id="pills-comment"
          role="tabpanel"
          aria-labelledby="pills-comment-tab"
        >
          <div class="row">
            <div class="col-md-12" v-if="comments">
              <div class="content bg-dark-ui border-ui" v-if="comments.length">
                <div
                  class="media"
                  v-for="(comment, index) in this.comments"
                  :key="index"
                >
                  <div>
                    <img
                      v-if="comment.gender"
                      src="../../assets/images/system/v.png"
                      class="rounded-circle mr-3"
                      alt="..."
                      width="55"
                    />
                    <img
                      v-else
                      src="../../assets/images/system/v2.png"
                      class="rounded-circle mr-3"
                      alt="..."
                      width="55"
                    />
                    <!-- <p class="rent-time">Thuê 2h</p> -->
                  </div>
                  <div class="media-body border-ui">
                    <h6 class="text-tan mt-0">{{ comment.fullName }}</h6>
                    <p>
                      {{ comment.content }}
                    </p>
                    <hr />
                    <div class="comment-info">
                      <div class="time">
                        {{
                          formatTime(
                            comment.createdDate,
                            "hh:mm:ss - dd/MM/yyyy"
                          )
                        }}
                      </div>
                      <div class="rate">
                        <!-- <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star-half-alt']" /> -->
                        <rating-star
                          :rating="comment.rating"
                          class="text-warning"
                        ></rating-star>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content bg-dark-ui border-ui" v-else>
                Không tìm thấy bình luận
              </div>
            </div>
          </div>
          <paginate
            v-if="pageCount > 1"
            :page-count="pageCount"
            :page-range="3"
            :click-handler="getComments"
            :prev-text="'Trước'"
            :next-text="'Sau'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          >
          </paginate>
        </div>
        <div
          class="tab-pane fade"
          id="pills-comment"
          role="tabpanel"
          aria-labelledby="pills-comment-tab"
        ></div>
      </div>
    </right-side>
    <rent-mentor-modal :trigger="confirmTrigger" :params="mentorId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import RatingStar from "@/components/utils/RatingStar.vue";
import Paginate from "vuejs-paginate";

import { MentorInfo } from "@/types/profile-mentor/mentorInfo";
import { Comments } from "@/types/profile-mentor/comment";
import { Achievements } from "@/types/achievement";
import { mentorService } from "@/services/mentor/mentors.service";
import MentorModule from "../../store/mentor/mentor.module";
import CommentModule from "../../store/profile-mentor/comment.module";
import MentorInfoModule from "../../store/profile-mentor/mentorInfo.module";
import AuthModule from "../../store/auth/auth.module";
import AchievementModule from "@/store/profile-mentor/achievement.module";

import RentMentorModal from "@/components/modal/RentMentorModal.vue";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    LeftSide,
    RightSide,
    RatingStar,
    Paginate,
    RentMentorModal
  }
})
export default class MentorProfile extends Vue {
  private mentorInfo: MentorInfo = null;
  private comments: Comments = null;
  private MentorInfoInstance = getModule(MentorInfoModule, this.$store);
  private MentorInstance = getModule(MentorModule, this.$store);
  private AchievementInstance = getModule(AchievementModule, this.$store);
  private AuthInstance = getModule(AuthModule, this.$store);
  private CommentInstance = getModule(CommentModule, this.$store);
  private followingStatus = "";

  private achievements: Achievements = [];

  mentorId = "";
  mentorIdOwner = "";

  // paginate
  pageCount = 1;
  perPage = 3;

  //confirm modal data
  confirmTrigger = false;
  callbackParams = "";

  toggleConfirm(title: string, callback: Function, params: string) {
    this.callbackParams = params;
    this.confirmTrigger = !this.confirmTrigger;
  }

  toastError = Swal.mixin(ToastError);

  async created() {
    document.title = "Trang hồ sơ mentor";
    if (this.$route.params.id) {
      this.mentorId = this.$route.params.id.toString();
    } else if (this.AuthInstance.currentUser) {
      this.mentorId = this.AuthInstance.currentUser.id.toString();
    }
    if (!this.mentorId) {
      this.$router.push({ name: "Home" });
      return;
    }
    this.getMentorInfo(this.mentorId);
    this.getComments();
    this.getAchievements(this.mentorId);

    this.mentorIdOwner = this.$route.params.id
      ? (this.mentorIdOwner = this.$route.params.id)
      : "";
  }

  async getMentorInfo(mentorId: string) {
    const loader = this.$loading.show();
    try {
      await this.MentorInfoInstance.getMentorInfoByUserId(mentorId);
      this.mentorInfo = this.MentorInfoInstance.getMentorInfo;
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
    loader.hide();
  }

  async getComments(pageIndex = 1) {
    this.mentorId = this.$route.params.id
      ? this.$route.params.id
      : this.AuthInstance.currentUser
      ? this.AuthInstance.currentUser.id.toString()
      : "";
    try {
      await this.CommentInstance.getCommentByMentorId([
        this.mentorId,
        this.perPage,
        pageIndex
      ]);
      this.comments = this.CommentInstance.getComments.comments;
      if (this.comments !== null) {
        this.pageCount = Math.ceil(
          this.CommentInstance.getComments.totalRecord / this.perPage
        );
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getAchievements(mentorId: string) {
    try {
      await this.AchievementInstance.fetchAchievements(mentorId);
      this.achievements = this.AchievementInstance.getAchievements;
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async followOrUnfollow() {
    if (!this.$route.params.id) return;
    try {
      const response = await mentorService.followOrUnFollowMentor(
        this.$route.params.id
      );
      this.followingStatus = response.data.followingStatus;
      if (response.status == 200) {
        if (this.mentorInfo) {
          this.mentorInfo.following = !this.mentorInfo.following;
        }
      }
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  isOwnerThisPage() {
    if (this.AuthInstance.currentUser && this.$route.params.id) {
      return (
        this.$route.params.id.toString() ===
        this.AuthInstance.currentUser.id.toString()
      );
    }
    return false;
  }

  isHalfStar(star: number) {
    return Number(star) == star && star % 1 !== 0 && star <= 5;
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/index.scss";
@import "../../assets/scss/grid.scss";
@import "../../assets/scss/label-info-panel.scss";
@import "../../assets/scss/nav-pills.scss";
@import "../../assets/scss/mentor-profiles/mentor-profiles.scss";

.text-common {
  color: #e4e6eb !important;
}

.price {
  padding: 5px 25px;
  font-weight: 500;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 0.55rem;
  width: 100%;
  text-align: center;
  background-color: #3a3b3c;
  background-image: linear-gradient(to right, #242526, #47db47c0, #242526);
}
</style>

<style lang="scss">
@import "../../assets/scss/paginate.scss";
</style>
