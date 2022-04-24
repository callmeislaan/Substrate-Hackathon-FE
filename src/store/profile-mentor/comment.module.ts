import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { commentService } from "@/services/profile-mentor/comment.service";
import { Comments } from "@/types/profile-mentor/comment";

type CommentDataReponse = {
  data: Comments;
  totalRecords: number;
};

type CommentData = {
  comments: Comments;
  totalRecord: number;
};

@Module({
  namespaced: true,
  name: "comment"
})
export default class CommentModule extends VuexModule {
  // State
  comments: Comments = null;

  totalRecord = 0;

  // Getters
  get getComments(): CommentData {
    return {
      comments: this.comments,
      totalRecord: this.totalRecord
    };
  }

  // Mutations
  @Mutation
  setComment(data: CommentDataReponse): void {
    this.comments = data.data;
    this.totalRecord = data.totalRecords;
  }

  // Actions
  @Action({ commit: "setComment", rawError: true })
  async getCommentByMentorId(params: [string, number, number]) {
    const response = await commentService.getComment(
      params[0],
      params[1],
      params[2]
    );
    return response.data;
  }
}
