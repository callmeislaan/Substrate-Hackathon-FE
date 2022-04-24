import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { mentorService } from "@/services/mentor/mentors.service";
import { Mentors, MentorSuggest, MentorSuggests } from "@/types/mentor";
import { MentorFollowings } from "@/types/mentor";
import { Skills } from "@/types/skill";
import { RentMentors } from "@/types/mentor/rentMentor";

type MentorFollowingsDataResponse = {
  data: MentorFollowings;
  totalRecords: number;
};

type MentorFollowingsData = {
  mentorFollowings: MentorFollowings;
  totalRecord: number;
};

type RentMentorData = {
  rentMentors: RentMentors;
  totalRecordOfRentMentor: number;
};

type RentMentorsDataResponse = {
  data: RentMentors;
  totalRecords: number;
};

@Module({
  namespaced: true,
  name: "mentor"
})
export default class MentorModule extends VuexModule {
  // State
  normalMentors: Mentors = null;
  anestMentors: Mentors = null;
  pendingMentors: Mentors = null;

  totalRecord = 0;
  totalRecordOfRentMentor = 0;

  mentorFollowings: MentorFollowings = null;

  suggestAnestMentors: Mentors = null;
  suggestFollowingMentors: Mentors = null;
  suggestHiredMentors: Mentors = null;
  suggestBestMentors: MentorSuggests = [];
  //rent mentor
  rentMentors: RentMentors = null;

  // Getters
  get getNormalMentors(): Mentors {
    return this.normalMentors;
  }

  get getAnestMentors(): Mentors {
    return this.anestMentors;
  }

  get getPendingMentors(): Mentors {
    return this.pendingMentors;
  }

  get getSuggestAnestMentors(): Mentors {
    return this.suggestAnestMentors;
  }

  get getMentorFollowings(): MentorFollowingsData {
    return {
      mentorFollowings: this.mentorFollowings,
      totalRecord: this.totalRecord
    };
  }

  get getSuggestFollowingMentors(): Mentors {
    return this.suggestFollowingMentors;
  }

  get getSuggestHiredMentors(): Mentors {
    return this.suggestHiredMentors;
  }

  get getSuggestBestMentors(): MentorSuggests {
    return this.suggestBestMentors;
  }
  //get Rent Mentor
  get getRentMentors(): RentMentorData {
    return {
      rentMentors: this.rentMentors,
      totalRecordOfRentMentor: this.totalRecord
    };
  }

  // Mutations
  @Mutation
  setNormalMentors(data: Mentors): void {
    this.normalMentors = data;
  }

  @Mutation
  setAnestMentors(data: Mentors): void {
    this.anestMentors = data;
  }

  @Mutation
  setPendingMentors(data: Mentors): void {
    this.pendingMentors = data;
  }

  @Mutation
  setSuggestMentorsAnest(data: Mentors): void {
    this.suggestAnestMentors = data;
  }

  @Mutation
  setSuggestMentorsFollowing(data: Mentors): void {
    this.suggestFollowingMentors = data;
  }

  @Mutation
  setSuggestMentorsHired(data: Mentors): void {
    this.suggestHiredMentors = data;
  }

  @Mutation
  setSuggestMentorsBest(data: MentorSuggests): void {
    this.suggestBestMentors = data;
  }

  @Mutation
  setMentorsFollowings(data: MentorFollowingsDataResponse): void {
    this.mentorFollowings = data.data;
    this.totalRecord = data.totalRecords;
  }

  @Mutation
  setRentMentors(data: RentMentorsDataResponse): void {
    this.rentMentors = data.data;
    this.totalRecord = data.totalRecords;
  }

  // Actions
  @Action({ commit: "setNormalMentors", rawError: true })
  async fetchNormalMentors() {
    const response = await mentorService.getNormalMentors();
    return response.data.data;
  }

  @Action({ commit: "setAnestMentors", rawError: true })
  async fetchAnestMentors() {
    const response = await mentorService.getAnestMentors();
    return response.data.data;
  }

  @Action({ commit: "setPendingMentors", rawError: true })
  async fetchPendingMentors(requestId: number) {
    const response = await mentorService.getPendingMentorsByRequestId(
      requestId
    );
    return response.data.data;
  }

  @Action({ commit: "setSuggestMentorsAnest", rawError: true })
  async fetchMentorSuggestAnest(skills: Skills) {
    const response = await mentorService.getMentorSuggestAnest(skills);
    return response.data.data;
  }

  @Action({ commit: "setSuggestMentorsFollowing", rawError: true })
  async fetchMentorSuggestFollowing(skills: Skills) {
    const response = await mentorService.getMentorSuggestFollowing(skills);
    return response.data.data;
  }

  @Action({ commit: "setSuggestMentorsHired", rawError: true })
  async fetchMentorSuggestHired(skills: Skills) {
    const response = await mentorService.getMentorSuggestHired(skills);
    return response.data.data;
  }

  @Action({ commit: "setSuggestMentorsBest", rawError: true })
  async fetchMentorSuggestBest(skills: Skills) {
    const response = await mentorService.getMentorSuggestBest(skills);
    return response.data.data.map(
      (item: { mentorInfo: MentorSuggest }) => item.mentorInfo
    );
  }

  @Action({ commit: "setMentorsFollowings", rawError: true })
  async fetchMentorsFollowings(params: Array<number>) {
    const response = await mentorService.getMentorFollowing(
      params[0],
      params[1]
    );
    return response.data;
  }

  @Action
  async followOrUnFollowMentor(mentorId: string) {
    await mentorService.followOrUnFollowMentor(mentorId);
  }

  //rentMentor
  @Action({ commit: "setRentMentors", rawError: true })
  async fetchRentMentors(params: Array<number>) {
    const response = await mentorService.getRentMentors(params[0], params[1]);
    return response.data;
  }
}
