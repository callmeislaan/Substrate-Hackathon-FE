/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";

const api = "api/request/following-requests";
class RequestFollowingService {
  constructor() {
    console.log("creating new instance of following-requests.service");
  }

  getRequestFollowings(perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`${api}`, {
      params: {
        page: pageIndex,
        size: perPage
      }
    });
  }

  postFollowingAndUnfollowing(requestId: string) {
    return anestAxios.post<any>(
      `api/request/following-or-unfollowing/${requestId}`
    );
  }

  postUnfollowingAllRequest() {
    return anestAxios.post<any>(`api/request/unfollowing-all`);
  }
}

// Export a singleton instance in the global namespace
export const requestFollowingService = new RequestFollowingService();
