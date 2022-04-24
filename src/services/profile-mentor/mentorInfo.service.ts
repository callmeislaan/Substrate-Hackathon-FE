import { anestAxios } from "@/libs/axios";
import { MentorInfo } from "@/types/profile-mentor/mentorInfo";

const api = "api/public/mentor/resume";
class MentorInfoService {
  constructor() {
    console.log("creating new instance of MentorInfo.service");
  }

  getMentorInfo(mentorId: string) {
    return anestAxios.get<MentorInfo>(`${api}/${mentorId}`);
  }
}

// Export a singleton instance in the global namespace
export const mentorInfoService = new MentorInfoService();
