import { Skills } from "@/types/skill";
import { User } from "@/types/user";
import { Profile } from "@/types/profile/profile";

export type Request = {
  id: number;
  status: string;
  bookmarked: boolean;
  title: string;
  content: string;
  price: number;
  deadline: number;
  time: number;
  createdBy: string;
  createdDate: number;
  skills: Skills;
  userInfoResponse: User | null;
  mentorInfoResponse: Profile | null;
  confirmStatus: string | null;
  startDoingTime: number | null;
} | null;

export type Requests = Request[] | null;

export type PostRequest = {
  deadline: number;
  title: string;
  content: string;
  price: number;
  skillIds: Array<number>;
} | null;

type statusMap = {
  [name: string]: unknown;
};

export const RequestStatus: statusMap = {
  OPEN: {
    text: "ĐANG MỞ",
    class: "text-primary"
  },
  DOING: {
    text: "ĐANG LÀM",
    class: "text-warning"
  },
  COMPLETE: {
    text: "ĐÃ HOÀN THÀNH",
    class: "text-success"
  },
  DELETE: {
    text: "ĐÃ ĐÓNG",
    class: "text-danger"
  }
};

export type RequestRating = {
  requestId: number;
  rating: number | null;
  comment: string | null;
};
