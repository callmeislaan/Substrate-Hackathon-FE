/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";
import { SignUpMentor } from "@/types/mentor";
import { Skills } from "@/types/skill";
import { Amount } from "@/types/withdrawal/amount";

const api = "api/public/home";
const apiRentMentors = "api/hiring/rent-mentors";
class MentorService {
  constructor() {
    console.log("creating new instance of skill.service");
  }

  getListMentors(params: any) {
    return anestAxios.post<any>("api/public/mentors/filter", params);
  }

  getAnestMentors() {
    return anestAxios.get<any>(`${api}/anest-mentor`);
  }

  getNormalMentors() {
    return anestAxios.get<any>(`${api}/other-mentor`);
  }

  requestRentMentor(params: any) {
    return anestAxios.post<any>(`api/hiring/hire-mentor`, params);
  }

  getRentMentors(perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`${apiRentMentors}`, {
      params: {
        page: pageIndex,
        size: perPage
      }
    });
  }

  getPendingMentorsByRequestId(requestId: number) {
    return anestAxios.get<any>(`api/request/pending-mentors/${requestId}`);
  }

  getMentorSuggestAnest(params: Skills) {
    return anestAxios.post<any>(`api/anest-mentor-suggestion`, {
      skillIds: this.skillsToSkillIds(params)
    });
  }

  getMentorSuggestFollowing(params: Skills) {
    return anestAxios.post<any>(`api/following-mentor-suggestion`, {
      skillIds: this.skillsToSkillIds(params)
    });
  }

  getMentorSuggestHired(params: Skills) {
    return anestAxios.post<any>(`api/hired-mentor-suggestion`, {
      skillIds: this.skillsToSkillIds(params)
    });
  }

  getMentorSuggestBest(params: Skills) {
    return anestAxios.post<any>(`api/best-mentor-suggestion`, {
      skillIds: this.skillsToSkillIds(params)
    });
  }

  getMentorFollowing(perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`api/mentor/following-mentors`, {
      params: {
        page: pageIndex,
        size: perPage
      }
    });
  }

  followOrUnFollowMentor(mentorId: string) {
    return anestAxios.post<any>(
      `api/mentor/following-or-unfollowing/${mentorId}`
    );
  }

  postUnFollowMentorAll() {
    return anestAxios.post<any>(`api/mentor/unfollowing-all`);
  }

  withdrawWithBankCard(cardId: string, amount: Amount) {
    return anestAxios.post<any>(
      `api/mentor/withdrawal/bank-card/${cardId}`,
      amount
    );
  }

  withdrawWithEwallet(ewalletId: string, amount: Amount) {
    return anestAxios.post<any>(
      `api/mentor/withdrawal/e-wallet/${ewalletId}`,
      amount
    );
  }

  private skillsToSkillIds(skills: Skills) {
    return skills?.map(item => (item ? item.id : null));
  }

  register(params: SignUpMentor) {
    return anestAxios.post<any>("api/user/register-mentor", params);
  }

  unRegisterMentor() {
    return anestAxios.put<any>("api/mentor/unregister-mentor");
  }

  updateMentor(params: SignUpMentor) {
    return anestAxios.put<any>("api/mentor", params);
  }

  getAchievements(mentorId: string) {
    return anestAxios.get<any>(`/api/public/mentor/achievements/${mentorId}`);
  }
}

// Export a singleton instance in the global namespace
export const mentorService = new MentorService();
