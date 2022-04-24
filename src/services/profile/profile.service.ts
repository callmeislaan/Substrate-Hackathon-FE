import { anestAxios } from "@/libs/axios";
import { Profile } from "@/types/profile/profile";
// import { Profile } from "@/types/profile/updateProfile";

const api = "api/user/profile";
const updateApi = "api/user/profile";

const ID_USERNAME = "id_user_name";
const ID_FULLNAME = "id_full_name";

class ProfileService {
  constructor() {
    console.log("creating new instance of profile.service");
  }

  getProfile() {
    return anestAxios.get<Profile>(`${api}`);
  }

  updateProfile(profile: Profile) {
    return anestAxios.put<Profile>(`${updateApi}`, profile);
  }
  saveInfo(userName: string, fullName: string) {
    window.localStorage.setItem(ID_USERNAME, userName);
    window.localStorage.setItem(ID_FULLNAME, fullName);
  }
}

// Export a singleton instance in the global namespace
export const profileService = new ProfileService();
