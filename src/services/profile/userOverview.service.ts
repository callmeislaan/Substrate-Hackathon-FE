import { anestAxios } from "@/libs/axios";
import { UserOverview } from "@/types/profile/userOverview";

const api = "api/user/overview";

class UserOverviewService {
  constructor() {
    console.log("creating new instance of profile.service");
  }

  getUserOverview() {
    return anestAxios.get<UserOverview>(`${api}`);
  }
}

// Export a singleton instance in the global namespace
export const userOverviewService = new UserOverviewService();
