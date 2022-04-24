export type Skill = {
  id: number;
  name: string;
  value: number;
} | null;

export type Skills = Skill[] | null;

export type SkillRequest = {
  id: number;
  name: string;
} | null;

export type SkillRequests = SkillRequest[] | null;
