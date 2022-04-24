/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";
import { AnestCard } from "@/types/profile/anestCard";

const api = "api/user/anest-card";
class PayInService {
  requestUsingAnestCard(anestCard: AnestCard) {
    return anestAxios.post<any>(`${api}`, anestCard);
  }
}

// Export a singleton instance in the global namespace
export const payInService = new PayInService();
