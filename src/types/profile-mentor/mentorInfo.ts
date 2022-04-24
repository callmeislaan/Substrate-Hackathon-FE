import { Skills } from "@/types/skill";

export type MentorInfo = {
  fullName: string;
  username: string;
  avatar: string;
  gender: string;
  status: string;
  createdDate: string;
  following: boolean;
  job: string;
  price: number;
  anestMentor: boolean;
  averageRating: number;
  totalRating: number;
  totalRating1: number;
  totalRating2: number;
  totalRating3: number;
  totalRating4: number;
  totalRating5: number;
  totalRequestFinish: number;
  totalRequestReceive: number;
  totalHoursBeHired: number;
  introduction: string;
  skillDescription: string;
  mentorSkillResponses: Skills;
  service: string;
} | null;
