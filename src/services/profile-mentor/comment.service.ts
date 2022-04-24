/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";

const api = "api/public/mentor/comments";
class CommentService {
  constructor() {
    console.log("creating new instance of Comment.service");
  }

  getComment(mentorId: string, perPage: number, pageIndex: number) {
    return anestAxios.get<any>(`${api}/${mentorId}`, {
      params: {
        size: perPage,
        page: pageIndex
      }
    });
  }
}

// Export a singleton instance in the global namespace
export const commentService = new CommentService();
