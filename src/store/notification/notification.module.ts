import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Notification, Notifications } from "@/types/notification";

@Module({
  namespaced: true,
  name: "notification"
})
export default class SkillModule extends VuexModule {
  // State
  notifications: Notifications = [];
  lastestNoti: Notification | null = null;

  // Getters
  get getNotifications(): Notifications {
    return this.notifications;
  }

  // Mutations
  @Mutation
  _setNotifications(data: Notifications): void {
    this.notifications = data;
    this.lastestNoti = this.notifications[0];
  }

  @Action({ commit: "_setNotifications", rawError: true })
  async setNotifications(data: Notifications) {
    return data;
  }
}
