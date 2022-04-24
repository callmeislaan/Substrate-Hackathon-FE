/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";

const api = "api/public/skill";
class SkillService {
  constructor() {
    console.log("creating new instance of skill.service");
  }

  getSkills() {
    return anestAxios.get<any>(`${api}`);
  }

  getSkill(id: string) {
    return anestAxios.get<any>(`${api}/${id}`);
  }
}

// Export a singleton instance in the global namespace
export const skillService = new SkillService();
