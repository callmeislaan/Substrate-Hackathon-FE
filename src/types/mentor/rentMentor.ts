import { Skills } from "@/types/skill";

export type RentMentor = {
  id: number;
  username: string;
  fullName: string;
  gender: boolean;
  avatar: string;
  job: string;
  listSkill: Skills;
  onlineStatus: string;
  anestMentor: boolean;
  rating: number;
  price: number;
  totalRequestFinish: number;
} | null;

export type RentMentors = RentMentor[] | null;

export type MentorHiring = {
  mentorId: number;
  title: string;
  note: string;
} | null;