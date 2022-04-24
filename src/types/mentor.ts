import { Skills } from "@/types/skill";
import { Achievements } from "@/types/achievement";

export type Mentor = {
  id: number;
  fullName: string;
  onlineStatus: string;
  username: string;
  job: string;
  listSkill: Skills;
  gender: boolean;
  profileImgPath: string | null;
} | null;

export type Mentors = Mentor[] | null;

export type SignUpMentor = {
  job: string;
  introduction: string;
  skillDescription: string;
  mentorSkills: Skills;
  service: string;
  price: number | null;
  achievements: Achievements;
} | null;

export type SignUpMentors = SignUpMentor[] | null;

// Mentor Suggestione
export enum SuggestType {
  ALL,
  ANEST,
  FOLLOWING,
  HIRED,
  BEST
}

export type MentorFollowing = {
  id: number;
  username: string;
  fullName: string;
  gender: boolean;
  avatar: string;
  job: Skills;
  listSkill: Skills;
  onlineStatus: string;
  rating: number;
  price: number;
  totalRequestFinish: number;
  anestMentor: boolean;
  followed: boolean;
} | null;

export type MentorFollowings = MentorFollowing[] | null;

export type MentorSuggest = {
  id: number;
  anestMentor: boolean;
  avatar: string | null;
  followed: boolean;
  fullName: string;
  gender: boolean;
  job: string;
  listSkill: Skills;
  price: number;
  rating: number;
  totalRequestFinish: number;
  username: string;
  hired: boolean;
};

export type MentorSuggests = MentorSuggest[];
