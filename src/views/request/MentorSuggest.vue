<template>
  <div>
    <template v-for="(mentor, index) in mentorsRender">
      <div
        class="wrapper bg-dark-ui border-ui card-focus"
        :key="index + '.' + renderKey"
        v-if="index < displayCount"
      >
        <div class="mentor-info-wrapper">
          <div class="media">
            <a href="" class="circle">
              <img
                class="avatar"
                v-if="mentor.profileImgPath"
                :src="mentor.profileImgPath"
                alt="avatar"
              />
              <img
                v-else-if="mentor.gender"
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
              <p class="ribbon" v-if="mentor.anestMentor">Anest</p>
            </a>
            <div class="media__body">
              <router-link :to="`/mentor-profiles/${mentor.id}`">
                {{ mentor.fullName }}
              </router-link>
              <router-link
                :to="`/mentor-profiles/${mentor.id}`"
                class="username mb-0"
              >
                @{{ mentor.username }}
              </router-link>
              <span class="rating">
                {{ mentor.rating }}
                <font-awesome-icon
                  class="text-warning"
                  :icon="['fas', 'star']"
                  size="xs"
                />
                / {{ mentor.totalRequestFinish }} yêu cầu
              </span>
            </div>
          </div>
        </div>
        <template v-if="request">
          <span class="text-sub-info" v-if="request.status === 'DELETE'"
            >Request đã đóng</span
          >
          <span class="text-sub-info" v-else-if="mentor.invited"
            >Đã gửi yêu cầu</span
          >
          <button v-else class="btn-anest" @click="inviteMentor(mentor)">
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="mr-2 text-violet"
            />
            Mời
          </button>
        </template>
      </div>
    </template>
    <p
      class="p-0 text-muted text-center"
      v-if="!mentorsRender || !mentorsRender.length"
    >
      Không tìm thấy mentor phù hợp
    </p>
    <p
      class="p-0 text-muted text-center text-violet cursor-pointer"
      v-else-if="displayCount < mentorsRender.length"
      @click="displayCount += 10"
    >
      Xem thêm
    </p>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Watch, Component, Prop, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import MentorModule from "@/store/mentor/mentor.module";

import {
  MentorSuggest as MentorSuggestType,
  MentorSuggests,
  SuggestType
} from "@/types/mentor";
import { Skills } from "@/types/skill";
import { Request } from "@/types/request";

import { requestService } from "@/services/request/requests.service";

type InvitableMentor = MentorSuggestType & {
  invited: boolean;
};

type InvitableMentors = InvitableMentor[];

@Component
export default class MentorSuggest extends Vue {
  @Prop({ default: SuggestType.ANEST })
  readonly type!: SuggestType;

  @Prop({ type: Array, default: () => null })
  readonly skills!: Skills;

  @Prop() readonly request: Request | undefined;

  MentorInstance = getModule(MentorModule, this.$store);

  mentors: MentorSuggests = [];
  mentorsRender: InvitableMentors = [];

  renderKey = 0;

  displayCount = 10;

  created() {
    this.getMentors();
  }

  async getMentors() {
    this.mentors = [];
    await this.MentorInstance.fetchMentorSuggestBest(this.skills);
    this.mentors = this.MentorInstance.getSuggestBestMentors;
    this.filter(this.type);
  }

  async inviteMentor(mentor: InvitableMentor) {
    if (!this.request || !this.request.id || !mentor || !mentor.id) return;
    await requestService.inviteMentor(this.request.id, mentor.id);
    mentor.invited = true;
    this.renderKey++;
    // const index = this.mentorsRender.findIndex(item => item === mentor);
    // if (index > -1) {
    //   this.mentorsRender.splice(index, 1);
    //   this.mentorsRender.push(mentor);
    // }
  }

  @Watch("type")
  filter(type: SuggestType) {
    this.displayCount = 10;
    switch (type) {
      case SuggestType.ANEST:
        this.mentorsRender = this.mentors.filter(
          mentor => mentor.anestMentor === true
        ) as InvitableMentors;
        break;
      case SuggestType.FOLLOWING:
        this.mentorsRender = this.mentors.filter(
          mentor => mentor.followed === true
        ) as InvitableMentors;
        break;
      case SuggestType.HIRED:
        this.mentorsRender = this.mentors.filter(
          mentor => mentor.hired === true
        ) as InvitableMentors;
        break;
      case SuggestType.BEST:
        this.mentorsRender = this.mentors
          .filter(mentor => {
            if (!mentor.listSkill) return false;
            const s1 = this.skills?.map(skill => skill?.id) || [];
            const s2 = mentor.listSkill.map(skill => skill?.id) || [];
            return s2?.some(item => s1.includes(item));
          })
          .sort((mentor1, mentor2) => {
            const skillIds = this.skills?.map(skill => skill?.id) || [];
            const count1 = mentor1.listSkill
              ? mentor1.listSkill.reduce(
                  (acc, skill) => acc + (skillIds.includes(skill?.id) ? 1 : 0),
                  0
                )
              : 0;
            const count2 = mentor2.listSkill
              ? mentor2.listSkill.reduce(
                  (acc, skill) => acc + (skillIds.includes(skill?.id) ? 1 : 0),
                  0
                )
              : 0;
            return count2 - count1;
          }) as InvitableMentors;
        break;
      default:
        this.mentorsRender = this.mentors as InvitableMentors;
    }
    this.mentorsRender.forEach(mentor => (mentor.invited = false));
  }
}
</script>

<style lang="scss" scoped>
.mentor-info-wrapper {
  width: 100%;
  padding: 0 1rem;
  .media {
    justify-content: flex-start;
  }
}

.wrapper {
  padding: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-anest {
  padding: 0.35rem;
  width: 75%;
  font-weight: 500;
  background-color: #3a3b3c;
  &:hover {
    background-color: #4d4f50;
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background: #3a3b3c;
    }
  }
}

.media {
  display: flex;
  align-items: center !important;
  justify-content: center;
  margin-bottom: 0.5rem;

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

    span.rating {
      font-size: 0.8rem;
    }
  }

  .circle {
    position: relative;
    border: 2px solid #28a745;
    border-radius: 50%;
    padding: 0.2rem;
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

    &:hover {
      border: 2px solid #18d844;
    }

    .avatar {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
    }
  }
}

.text-sub-info {
  color: #b0b3b8;
  font-size: 0.85rem;
}

.card-focus:hover {
  transform: translateY(-2px);
}
</style>
