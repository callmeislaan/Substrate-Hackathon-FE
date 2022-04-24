import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { requestService } from "@/services/request/requests.service";
import { Request, Requests } from "@/types/request";
import { requestFollowingService } from "@/services/request/request-following.service";

type BookmarkedRequestResponse = {
  data: Requests;
  totalRecords: number;
};

type BookmarkedRequest = {
  requests: Requests;
  totalRecord: number;
};

@Module({
  namespaced: true,
  name: "request"
})
export default class RequestModule extends VuexModule {
  // State
  requests: Requests = null;
  request: Request = null;

  totalRecord = 0;

  get getBookmarkRequests(): BookmarkedRequest {
    return {
      requests: this.requests,
      totalRecord: this.totalRecord
    };
  }

  //get request created
  get getRequestCreated(): BookmarkedRequest {
    return {
      requests: this.requests,
      totalRecord: this.totalRecord
    };
  }

  //get request created
  get getRequestInvitation(): BookmarkedRequest {
    return {
      requests: this.requests,
      totalRecord: this.totalRecord
    };
  }

  // Getters
  get getRequests(): Requests {
    return this.requests;
  }

  get getReceiveRequest(): BookmarkedRequest {
    return {
      requests: this.requests,
      totalRecord: this.totalRecord
    };
  }

  get getRequest(): Request {
    return this.request;
  }

  // Mutations
  @Mutation
  setRequests(data: Requests): void {
    this.requests = data;
  }

  // Mutations
  @Mutation
  setReceiveRequests(data: BookmarkedRequestResponse): void {
    this.requests = data.data;
    this.totalRecord = data.totalRecords;
  }

  // Mutations
  @Mutation
  setBookmarkRequests(data: BookmarkedRequestResponse): void {
    this.requests = data.data;
    this.totalRecord = data.totalRecords;
  }

  //set request created
  @Mutation
  setRequestCreated(data: BookmarkedRequestResponse): void {
    this.requests = data.data;
    this.totalRecord = data.totalRecords;
  }

  //set request invitation
  @Mutation
  setRequestInvitation(data: BookmarkedRequestResponse): void {
    this.requests = data.data;
    this.totalRecord = data.totalRecords;
  }

  @Mutation
  setRequest(data: Request): void {
    this.request = data;
  }

  // Actions
  @Action({ commit: "setRequests", rawError: true })
  async fetchRequests() {
    const response = await requestService.getRequests();
    return response.data.data;
  }

  @Action({ commit: "setRequest", rawError: true })
  async getRequestById(id: string) {
    const response = await requestService.getRequest(id);
    return response.data;
  }

  @Action({ commit: "setBookmarkRequests", rawError: true })
  async fetchRequestFollowings(params: Array<number>) {
    const response = await requestFollowingService.getRequestFollowings(
      params[0],
      params[1]
    );
    return response.data;
  }

  @Action({ commit: "setRequestCreated", rawError: true })
  async getCreatedRequestByUser(params: Array<number>) {
    const response = await requestService.getCreatedRequestByUser(
      params[0],
      params[1]
    );
    return response.data;
  }

  @Action({ commit: "setRequestInvitation", rawError: true })
  async getInvitationRequests(params: Array<number>) {
    const response = await requestService.getInvitationRequests(
      params[0],
      params[1]
    );
    return response.data;
  }

  @Action({ commit: "setRequests", rawError: true })
  async fetchSugggestRequests(requestId: number) {
    const response = await requestService.getSuggestRequests(requestId);
    return response.data.data;
  }

  @Action({ commit: "setReceiveRequests", rawError: true })
  async fetchReceiveRequest(params: Array<number>) {
    const response = await requestService.getReceiveRequest(
      params[0],
      params[1]
    );
    return response.data;
  }
}
