import { anestAxios } from "@/libs/axios";
import { MentorOverview } from "@/types/profile/mentorOverview";

const api = "api/mentor/overview";

class MentorOverviewService {
  constructor() {
    console.log("creating new instance of mentorOverview.service");
  }

  getMentorOverview() {
    return anestAxios.get<MentorOverview>(`${api}`);
  }
}

// Export a singleton instance in the global namespace
export const mentorOverviewService = new MentorOverviewService();
