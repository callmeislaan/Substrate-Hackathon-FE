import { anestAxios } from "@/libs/axios";
import { MentorIncomeReport } from "@/types/profile/mentorIncomeReport";

const api = "api/mentor/income-report";

class MentorIncomeReportService {
  constructor() {
    console.log("creating new instance of MentorIncomeReport.service");
  }

  getMentorIncomeReport() {
    return anestAxios.get<MentorIncomeReport>(`${api}`);
  }
}

// Export a singleton instance in the global namespace
export const mentorIncomeReportService = new MentorIncomeReportService();
