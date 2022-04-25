import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";

import "overlayscrollbars/css/OverlayScrollbars.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-loading-overlay/dist/vue-loading.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import VueFbCustomerChat from "vue-fb-customer-chat";
import Loading from "vue-loading-overlay";
import Tooltip from "vue-directive-tooltip";
import VueSweetalert2 from "vue-sweetalert2";
import "vue-directive-tooltip/dist/vueDirectiveTooltip.css";
import "@sweetalert2/theme-dark/dark.scss";
// import "sweetalert2/dist/sweetalert2.min.css";

import PublicPath from "../src/router/public";

import { jwtService } from "../src/services/auth/jwt.service";

import { format } from "date-fns";

import { required } from "vee-validate/dist/rules";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";

library.add(fas, far, fab);

Vue.component("font-awesome-icon", FontAwesomeIcon);

// Install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.use(Toasted, { position: "bottom-left", duration: 4000 });
Vue.use(Tooltip);
Vue.use(VueSweetalert2, {
  // showConfirmButton: false
});

Vue.use(Loading, {
  color: "#5a5b5c",
  backgroundColor: "#000000",
  opacity: 0.5,
  height: 80,
  width: 80
});

Vue.use(VueFbCustomerChat, {
  page_id: "1620734998235806",
  theme_color: "#333333",
  locale: "vi_VN"
});

Vue.mixin({
  methods: {
    formatTime: function(milli: number, pattern = "HH:mm dd/MM/yyyy") {
      return format(milli, pattern);
    }
  }
});

Vue.config.productionTip = false;

router.beforeEach((to, _from, next) => {
  if (!to.name || PublicPath.includes(to.name)) {
    next();
    return;
  }
  if (jwtService.getToken() !== null) {
    next();
    return;
  }
  next({ path: "/login" });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

extend("required", {
  ...required,
  message: "Bạn vui lòng nhập {_field_}"
});

extend("password", {
  validate: value => {
    return value.match("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$");
  },
  message: "Bạn đã nhập sai định dạng mật khẩu"
});

extend("email", {
  validate: value => {
    return value.match("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  },
  message: "Bạn đã nhập sai định dạng email"
});

extend("checkRePassword", {
  params: ["target"],
  validate(value, target) {
    return value == Object.values({ ...target })[0];
  },
  message: "Xác nhận mật khẩu không khớp"
});

extend("amount", {
  validate: value => {
    return value >= 10000;
  },
  message: "Số tiền muốn rút cần lớn hơn hoặc bằng 10.000 UNIT"
});

extend("amountOfCreateRequest", {
  validate: value => {
    return value >= 10000;
  },
  message: "Số tiền trả cần lớn hơn hoặc bằng 10.000 UNIT"
});

extend("limitAmount", {
  validate: value => {
    return value <= 10000000;
  },
  message: "Số tiền muốn rút cần nhỏ hơn hoặc bằng 10.000.000 UNIT"
});

extend("limitAmountPaid", {
  validate: value => {
    return value <= 100000000;
  },
  message: "Số tiền trả cần nhỏ hơn hoặc bằng 100.000.000 UNIT"
});

extend("limitTitleOfRequest", {
  validate: value => {
    return value.length <= 250;
  },
  message: "Tiêu đề của bạn quá dài"
});

extend("priceOfMentor", {
  validate: value => {
    return value <= 10000000;
  },
  message: "Giá cơ bản cần nhỏ hơn hoặc bằng 10.000.000 UNIT"
});

extend("limitJob", {
  validate: value => {
    return value.length <= 30;
  },
  message: "Nghề nghiệp của bạn quá dài"
});
