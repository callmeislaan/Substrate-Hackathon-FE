import Vue from "vue";
import Vuex from "vuex";
import AuthModule from "./auth/auth.module";
import SkillModule from "./skill/skill.module";
import ProfileModule from "./profile/profile.module";
import UserOverviewModule from "./profile/userOverview.module";
import UserFinanceOverviewModule from "./profile/userFinanceOverview.module";
import MentorOverviewModule from "./profile/mentorOverview.module";
import MentorIncomeReportModule from "./profile/mentorIncomeReport.module";
import BankCardModule from "./profile/bankCard.module";
import EWalletModule from "./profile/eWallet.module";
import MentorModule from "./mentor/mentor.module";
import RequestModule from "./request/request.module";
import MentorInfoModule from "./profile-mentor/mentorInfo.module";
import CommentModule from "./profile-mentor/comment.module";
import TransactionModule from "./transaction/transaction.module";
import AchievementModule from "./profile-mentor/achievement.module";
import NotificationModule from "./notification/notification.module";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [
        "skill",
        "mentor",
        "request",
        "profile",
        "userOverview",
        "userFinanceOverview",
        "mentorOverview",
        "mentorIncomeReport",
        "bankCards",
        "eWallets",
        "mentorInfo",
        "comment",
        "achievement",
        "notification"
      ],
      storage: sessionStorage
    }),
    createPersistedState({
      paths: ["auth"],
      storage: localStorage
    })
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthModule,
    skill: SkillModule,
    mentor: MentorModule,
    request: RequestModule,
    profile: ProfileModule,
    userOverview: UserOverviewModule,
    userFinanceOverview: UserFinanceOverviewModule,
    mentorOverview: MentorOverviewModule,
    mentorIncomeReport: MentorIncomeReportModule,
    bankCards: BankCardModule,
    eWallets: EWalletModule,
    mentorInfo: MentorInfoModule,
    comment: CommentModule,
    transaction: TransactionModule,
    achievement: AchievementModule,
    notification: NotificationModule
  }
});
