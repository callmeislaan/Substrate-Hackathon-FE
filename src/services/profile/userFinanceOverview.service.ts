import { anestAxios } from "@/libs/axios";
import { UserFinanceOverview } from "@/types/profile/userFinanceOverview";

const api = "api/user/finance-overview";

class UserFinanceOverviewService {
  constructor() {
    console.log("creating new instance of userFinanceOverview.service");
  }

  getUserFinanceOverview() {
    return anestAxios.get<UserFinanceOverview>(`${api}`);
  }
}

// Export a singleton instance in the global namespace
export const userFinanceOverviewService = new UserFinanceOverviewService();
