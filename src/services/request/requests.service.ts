/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";
import { PostRequest, RequestRating } from "@/types/request";

const api = "api/public/request";
const apiGetCreatedRequestByUser = "api/user/requests";
const apiGetInvitationRequest = "api/request/invitation-requests";
const apiGetReceiveRequest = "api/request/mentor/receive-request";

class RequestService {
  constructor() {
    console.log("creating new instance of request.service");
  }

  getRequests() {
    return anestAxios.get<any>(`${api}s`);
  }

  getListRequests(params: any) {
    return anestAxios.post<any>(`${api}s/filter`, params);
  }

  getSuggestRequests(requestId: number) {
    return anestAxios.get<any>(`${api}/other-requests/${requestId}`);
  }

  getCreatedRequestByUser(perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`${apiGetCreatedRequestByUser}`, {
      params: {
        page: pageIndex,
        size: perPage
      }
    });
  }

  getRequest(id: string) {
    return anestAxios.get<any>(`${api}/${id}`);
  }

  getInvitationRequests(perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`${apiGetInvitationRequest}`, {
      params: {
        page: pageIndex,
        size: perPage
      }
    });
  }

  getReceiveRequest(perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`${apiGetReceiveRequest}`, {
      params: {
        page: pageIndex,
        size: perPage
      }
    });
  }

  createRequest(params: PostRequest) {
    return anestAxios.post<any>(`api/user/request`, params);
  }

  updateRequest(params: PostRequest, requestId: number) {
    return anestAxios.put<any>(`api/user/request/${requestId}`, params);
  }

  // REQUEST OWNER'S RIGHTS
  closeRequest(requestId: number) {
    return anestAxios.delete<any>(`api/user/request/${requestId}`);
  }

  reopenRequest(requestId: number) {
    return anestAxios.post<any>(`api/user/reopen-request/${requestId}`);
  }

  markAsComplete(params: RequestRating) {
    return anestAxios.post<any>(
      `api/request/user/confirm-finish-request`,
      params
    );
  }

  markAsFailed(params: RequestRating) {
    return anestAxios.post<any>(
      "api/request/user/confirm-not-finish-request",
      params
    );
  }

  mentorAcceptReject(requestId: number) {
    return anestAxios.post<any>(
      `api/request/mentor/confirm-not-finish-request/${requestId}`
    );
  }

  mentorAcceptConfict(requestId: number) {
    return anestAxios.post<any>(
      `api/request/mentor/confirm-finish-request/${requestId}`
    );
  }

  hireMentor(requestId: number, mentorId: number) {
    return anestAxios.post<any>("api/request/rent-mentor", {
      requestId,
      mentorId
    });
  }

  deletePendingMentor(requestId: number, mentorId: number) {
    return anestAxios.delete<any>(
      `api/request/${requestId}/mentor/${mentorId}`
    );
  }

  inviteMentor(requestId: number, mentorId: number) {
    return anestAxios.post<any>(`api/request/invite-mentor`, {
      requestId,
      mentorId
    });
  }

  // MENTOR'S RIGHTS
  receiveRequest(requestId: number) {
    return anestAxios.post<any>(`api/request/reserve-request/${requestId}`);
  }

  unReceiveRequest(requestId: number) {
    return anestAxios.delete<any>(
      `api/request/undo-reserve-request/${requestId}`
    );
  }
}

// Export a singleton instance in the global namespace
export const requestService = new RequestService();
