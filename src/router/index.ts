import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "../components/utils/NotFound.vue";
import ActiveUserSuccess from "../components/utils/ActiveUserSuccess.vue";
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";
import ProfileIndex from "../views/profile/Profile.vue";
import ProfileInfo from "../views/profile/Info.vue";
import ProfilePayIn from "../views/profile/PayIn.vue";
import ProfileWithdraw from "../views/profile/Withdraw.vue";
import RequestDetail from "../views/request/RequestDetail.vue";
import CreateRequest from "../views/request/CreateRequest.vue";
import ListRequest from "../views/request/ListRequest.vue";

// Setting
import SettingIndex from "../views/setting/Setting.vue";
import SettingUpdateInfo from "../views/setting/UpdateInfo.vue";
import SettingBankCard from "../views/setting/SettingBankCard.vue";
import SettingEwallet from "../views/setting/SettingEwallet.vue";

// Mentor Profiles
import MentorProfile from "../views/mentor-profile/MentorProfile.vue";

// Request Created
import RequestCreated from "../views/request-created/RequestCreated.vue";

//Invitation Requests
import InvitationRequests from "../views/invitation-requests/InvitationRequests.vue";

//Receive Request
import ReceiveRequest from "../views/receive-request/ReceiveRequest.vue";

// Create Mentor
import CreateMentor from "../views/mentor/CreateMentor.vue";

//list rent mentor
import RentMentor from "../views/rent-mentor/RentMentor.vue";

// Update Mentor
import UpdateMentor from "../views/mentor/UpdateMentor.vue";

import ListMentor from "../views/mentor/ListMentor.vue";

//Transaction History
import TransactionHistory from "../views/profile/TransactionHistory.vue";

import BookmarkRequestIndex from "../views/bookmarked/BookMarked.vue";

import FollowMentorIndex from "../views/follow-mentor/FollowMentor.vue";

import UpdateRequest from "../views/request/UpdateRequest.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/active-user",
    name: "ActiveUserSuccess",
    component: ActiveUserSuccess
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileIndex,
    //redirect: "/profile/info",
    children: [
      {
        // ProfileInfo will be rendered inside Profile's <router-view>
        // when /profile/info is matched
        path: "info",
        name: "ProfileInfo",
        component: ProfileInfo,
        alias: "/profile",
        meta: {
          title: "Profile"
        }
      },
      {
        path: "pay-in",
        name: "ProfilePayIn",
        component: ProfilePayIn,
        meta: {
          title: "Pay In"
        }
      },
      {
        path: "withdraw",
        name: "ProfileWithdraw",
        component: ProfileWithdraw,
        meta: {
          title: "Withdraw"
        }
      },
      {
        path: "transaction-history",
        name: "TransactionHistory",
        component: TransactionHistory,
        meta: {
          title: "Transaction History"
        }
      }
    ]
  },

  // REQUEST ROUTE MAPPING
  {
    path: "/requests",
    name: "ListRequest",
    component: ListRequest
  },
  {
    path: "/request/:id",
    name: "RequestDetail",
    component: RequestDetail
  },
  {
    path: "/create-request",
    name: "CreateRequest",
    component: CreateRequest
  },
  {
    path: "/update-request/:id?",
    name: "UpdateRequest",
    component: UpdateRequest
  },

  {
    path: "/bookmark-request",
    name: "BookmarkRequest",
    component: BookmarkRequestIndex,
    meta: {
      title: "Bookmark Request"
    }
  },
  {
    path: "/request-created",
    name: "RequestCreated",
    component: RequestCreated,
    meta: {
      title: "Request Created"
    }
  },
  {
    path: "/invitation-requests",
    name: "InvitationRequests",
    component: InvitationRequests,
    meta: {
      title: "Invitation Requests"
    }
  },
  {
    path: "/receive-request",
    name: "ReceiveRequest",
    component: ReceiveRequest,
    meta: {
      title: "Receive Request"
    }
  },

  {
    path: "/setting",
    name: "Setting",
    component: SettingIndex,
    children: [
      {
        path: "update-info",
        name: "SettingUpdateInfo",
        component: SettingUpdateInfo,
        alias: "/setting",
        meta: {
          title: "Update Info"
        }
      },
      {
        path: "bank-card",
        name: "SettingBankCard",
        component: SettingBankCard,
        meta: {
          title: "Bank Card"
        }
      },
      {
        path: "e-wallet",
        name: "SettingEwallet",
        component: SettingEwallet,
        meta: {
          title: "Ewallet"
        }
      }
    ]
  },

  // MENTOR ROUTE MAPPING
  {
    path: "/mentor-profiles/:id?",
    name: "MentorProfile",
    component: MentorProfile,
    meta: {
      title: "Mentor Profiles"
    }
  },
  {
    path: "/create-mentor",
    name: "CreateMentor",
    component: CreateMentor,
    meta: {
      title: "Create Mentor"
    }
  },
  {
    path: "/update-mentor",
    name: "UpdateMentor",
    component: UpdateMentor,
    meta: {
      title: "Update Mentor"
    }
  },
  {
    path: "/follow-mentor",
    name: "FollowMentor",
    component: FollowMentorIndex,
    meta: {
      title: "Follow Mentor"
    }
  },
  {
    path: "/rent-mentor",
    name: "RentMentor",
    component: RentMentor,
    meta: {
      title: "Rent Mentor"
    }
  },
  {
    path: "/mentors",
    name: "ListMentor",
    component: ListMentor,
    meta: {
      title: "List Mentor"
    }
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
