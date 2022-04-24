import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { mentorInfoService } from "@/services/profile-mentor/mentorInfo.service";
import { MentorInfo } from "@/types/profile-mentor/mentorInfo";
import { format } from "date-fns";

@Module({
  namespaced: true,
  name: "mentorInfo"
})
export default class MentorInfoModule extends VuexModule {
  // State
  mentorInfo: MentorInfo = null;

  // Getters

  get getMentorInfo(): MentorInfo {
    if (!this.mentorInfo) {
      return null;
    }
    const totalRating: number =
      this.mentorInfo.totalRating1 +
      this.mentorInfo.totalRating2 +
      this.mentorInfo.totalRating3 +
      this.mentorInfo.totalRating4 +
      this.mentorInfo.totalRating5;
    return {
      fullName: this.mentorInfo.fullName,
      username: this.mentorInfo.username,
      avatar: this.mentorInfo.avatar,
      gender: this.mentorInfo.gender,
      status: this.mentorInfo.status,
      following: this.mentorInfo.following,
      createdDate: format(parseInt(this.mentorInfo?.createdDate), "dd/MM/yyyy"),
      job: this.mentorInfo.job,
      averageRating: this.mentorInfo.averageRating,
      price: this.mentorInfo.price,
      anestMentor: this.mentorInfo.anestMentor,
      totalRating: totalRating,
      totalRating1: (this.mentorInfo.totalRating1 / totalRating) * 100,
      totalRating2: (this.mentorInfo.totalRating2 / totalRating) * 100,
      totalRating3: (this.mentorInfo.totalRating3 / totalRating) * 100,
      totalRating4: (this.mentorInfo.totalRating4 / totalRating) * 100,
      totalRating5: (this.mentorInfo.totalRating5 / totalRating) * 100,
      totalRequestFinish: this.mentorInfo.totalRequestFinish,
      totalRequestReceive: this.mentorInfo.totalRequestReceive,
      totalHoursBeHired: this.mentorInfo.totalHoursBeHired,
      introduction: this.mentorInfo.introduction,
      skillDescription: this.mentorInfo.skillDescription,
      mentorSkillResponses: this.mentorInfo.mentorSkillResponses,
      service: this.mentorInfo.service
    };
  }

  // Mutations
  @Mutation
  setMentorInfo(data: MentorInfo): void {
    this.mentorInfo = data;
  }

  // Actions
  @Action({ commit: "setMentorInfo", rawError: true })
  async getMentorInfoByUserId(id: string) {
    const response = await mentorInfoService.getMentorInfo(id);
    return response.data;
  }
}
