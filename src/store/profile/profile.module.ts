import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { profileService } from "@/services/profile/profile.service";
import { Profile } from "@/types/profile/profile";
import { format } from "date-fns";

@Module({
  namespaced: true,
  name: "profile"
})
export default class ProfileModule extends VuexModule {
  // State
  profile: Profile = null;

  // Getters
  get getProfile(): Profile {
    if (!this.profile) {
      return null;
    }

    return {
      id: "",
      username: this.profile?.username,
      avatar: this.profile?.avatar,
      fullName: this.profile?.fullName,
      dateOfBirth: this.profile?.dateOfBirth,
      gender: this.profile?.gender,
      phone: this.profile?.phone,
      createdDate: format(parseInt(this.profile?.createdDate), "dd/MM/yyyy"),
      email: this.profile?.email,
      mentor: this.profile?.mentor
    };
  }

  // Mutations
  @Mutation
  setProfile(data: Profile): void {
    this.profile = data;
    if (this.profile)
      profileService.saveInfo(this.profile?.username, this.profile?.fullName);
  }

  // Actions
  @Action({ commit: "setProfile", rawError: true })
  async fetchProfile() {
    const response = await profileService.getProfile();
    return response.data;
  }
}
