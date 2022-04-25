<template>
  <div>
    <div class="menu" v-if="this.profile">
      <ul
        class="row nav nav-pills"
        id="pills-tab"
        role="tablist"
        v-if="this.profile.mentor"
      >
        <li
          class="col-6 col-md-6 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="nav-link font-weight-500 active"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="true"
          >
            Trang cá nhân
          </a>
        </li>
        <li
          class="col-6 col-md-6 mb-3 nav-item text-center"
          role="presentation"
        >
          <a
            class="nav-link font-weight-500"
            id="pills-partner-profile-tab"
            data-toggle="pill"
            href="#pills-partner-profile"
            role="tab"
            aria-controls="pills-partner-profile"
            aria-selected="false"
          >
            Thông tin mentor
          </a>
        </li>
      </ul>
    </div>

    <div class="tab-content" id="pills-tabContent">
      <!-- Tab Profile -->
      <div
        class="tab-pane fade show active"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="overview" v-if="userOverview">
              <h6 class="title">Thống kê</h6>
              <div class="overview-report">
                <div class="row">
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-card-text"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ userOverview.totalRequestCreate }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Bài đăng</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-clock"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ userOverview.totalHoursHiredMentor }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Số giờ đã thuê</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-people"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zm7.973.056v-.002.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ userOverview.totalPeopleHired }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Số người đã thuê</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="about" v-if="profile">
              <h6 class="title">Thông tin</h6>
              <div class="about-info bg-dark-ui border-ui mb-4">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <fieldset class="bg-dark-ui">
                        <legend>Họ & tên</legend>
                        <input
                          type="text"
                          class="form-control"
                          :value="profile.fullName"
                          readonly
                        />
                      </fieldset>
                    </div>
                    <div class="form-group col-md-6">
                      <fieldset class="bg-dark-ui">
                        <legend>Ngày sinh</legend>
                        <input
                          type="text"
                          class="form-control"
                          :value="dateOfBirth"
                          readonly
                        />
                      </fieldset>
                    </div>
                    <div class="form-group col-md-6">
                      <fieldset class="bg-dark-ui">
                        <legend>Giới tính</legend>
                        <input
                          type="text"
                          class="form-control"
                          :value="this.profile.gender ? 'Nam' : 'Nữ'"
                          readonly
                        />
                      </fieldset>
                    </div>
                    <div class="form-group col-md-6">
                      <fieldset class="bg-dark-ui">
                        <legend>Ngày tham gia</legend>
                        <input
                          type="text"
                          class="form-control"
                          :value="profile.createdDate"
                          readonly
                        />
                      </fieldset>
                    </div>
                    <div class="form-group col-md-6">
                      <fieldset class="bg-dark-ui">
                        <legend>Số điện thoại</legend>
                        <input
                          type="text"
                          class="form-control"
                          :value="profile.phone"
                          readonly
                        />
                      </fieldset>
                    </div>
                    <div class="form-group col-md-6">
                      <fieldset class="bg-dark-ui">
                        <legend>Email</legend>
                        <input
                          type="text"
                          class="form-control"
                          :value="profile.email"
                          readonly
                        />
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <quick-action>
              <div class="row">
                <div
                  class="col-12 col-md-4 col-lg-4 mb-3"
                  v-if="profile && profile.mentor"
                >
                  <router-link class="border-ui" :to="{ name: 'UpdateMentor' }">
                    <font-awesome-icon
                      class="fa-flip-horizontal mr-2"
                      :icon="['fas', 'pencil-alt']"
                    />Sửa trang hồ sơ
                  </router-link>
                </div>

                <div class="col-12 col-md-4 col-lg-4 mb-3" v-else>
                  <router-link class="border-ui" :to="{ name: 'ListMentor' }">
                    <font-awesome-icon
                      class="fa-flip-horizontal mr-2"
                      :icon="['fas', 'eye']"
                    />Xem danh sách mentor
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    :to="{ name: 'SettingUpdateInfo' }"
                    class="border-ui"
                  >
                    <font-awesome-icon
                      class="mr-2"
                      :icon="['fas', 'user-edit']"
                    />Chỉnh sửa thông tin
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    :to="{ name: 'SettingUpdateInfo' }"
                    class="border-ui"
                  >
                    <font-awesome-icon class="mr-2" :icon="['fas', 'key']" />
                    Đổi mật khẩu
                  </router-link>
                </div>
              </div>
            </quick-action>
          </div>
        </div>
      </div>

      <!-- Tab Partner Profile -->
      <div
        v-if="this.profile"
        class="tab-pane fade"
        id="pills-partner-profile"
        role="tabpanel"
        aria-labelledby="pills-partner-profile-tab"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="balance">
              <h6 class="title">Tài khoản</h6>
              <div class="balance-report">
                <div class="row">
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-credit-card-2-front"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
                            />
                            <path
                              d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M2 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ this.bankCards.length }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Thẻ ngân hàng</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-credit-card-2-back"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
                            />
                            <path
                              d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zM1 9h14v2H1V9z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ this.eWallets.length }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Ví điện tử</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-wallet2"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.5 4l10-3A1.5 1.5 0 0 1 14 2.5v2h-1v-2a.5.5 0 0 0-.5-.5L5.833 4H2.5z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M1 5.5A1.5 1.5 0 0 1 2.5 4h11A1.5 1.5 0 0 1 15 5.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-8zM2.5 5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-11z"
                            />
                          </svg>
                        </div>
                        <div class="number" v-if="userFinanceOverview">
                          <h4>
                            {{
                              userFinanceOverview
                                ? userFinanceOverview.totalMoneyCurrent.toLocaleString(
                                    "vi-VI"
                                  )
                                : 0
                            }}<sup>UNIT</sup>
                          </h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Ví thu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="income">
              <h6 class="title">Thu nhập</h6>
              <div class="income-report">
                <div class="row" v-if="mentorIncomeReport">
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-calendar3-event"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>
                            {{
                              mentorIncomeReport.dailyIncome.toLocaleString(
                                "vi-VN"
                              )
                            }}<sup>UNIT</sup>
                          </h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Thu nhập ngày</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-calendar3-week"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>
                            {{
                              mentorIncomeReport.weeklyIncome.toLocaleString(
                                "vi-VN"
                              )
                            }}<sup>UNIT</sup>
                          </h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Thu nhập tuần</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-calendar3"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>
                            {{
                              mentorIncomeReport.monthlyIncome.toLocaleString(
                                "vi-VN"
                              )
                            }}<sup>UNIT</sup>
                          </h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Thu nhập tháng</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="overview">
              <h6 class="title">Thống kê</h6>
              <div class="overview-report">
                <div class="row" v-if="mentorOverview">
                  <div class="col-6 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-question-circle"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ mentorOverview.totalRequestReceive }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Yêu cầu thuê</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-dash-circle"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ mentorOverview.totalRequestDeny }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Từ chối yêu cầu</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-clock"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ mentorOverview.totalHoursBeHired }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Số giờ được thuê</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-percent"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4 v-if="this.mentorOverview.totalRequestReceive">
                            {{
                              Number(
                                (
                                  (this.mentorOverview.totalRequestDeny /
                                    this.mentorOverview.totalRequestReceive) *
                                  100
                                ).toFixed(2)
                              )
                            }}%
                          </h4>
                          <h4 v-else>---%</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Tỷ lệ từ chối</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-percent"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4 v-if="this.mentorOverview.totalRequestReceive">
                            {{
                              Number(
                                (
                                  ((this.mentorOverview.totalRequestReceive -
                                    this.mentorOverview.totalRequestDeny) /
                                    this.mentorOverview.totalRequestReceive) *
                                  100
                                ).toFixed(2)
                              )
                            }}%
                          </h4>
                          <h4 v-else>
                            ---%
                          </h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Tỷ lệ hoàn thành</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-md-6 col-lg-4 mb-3">
                    <div class="label-info bg-dark-ui border-ui">
                      <div class="flex">
                        <div class="icon">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            class="bi bi-star"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                            />
                          </svg>
                        </div>
                        <div class="number">
                          <h4>{{ mentorOverview.averageRating.toFixed(1) }}</h4>
                        </div>
                      </div>
                      <div class="description">
                        <span>Đánh giá</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <quick-action>
              <div class="row">
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link class="border-ui" :to="{ name: 'UpdateMentor' }">
                    <font-awesome-icon
                      class="fa-flip-horizontal mr-2"
                      :icon="['fas', 'pencil-alt']"
                    />Sửa trang hồ sơ
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    :to="{ name: 'TransactionHistory' }"
                    class="border-ui"
                  >
                    <font-awesome-icon
                      class="mr-2"
                      :icon="['fas', 'history']"
                    />Lịch sử giao dịch
                  </router-link>
                </div>
                <div class="col-12 col-md-4 col-lg-4 mb-3">
                  <router-link
                    :to="{ name: 'SettingBankCard' }"
                    class="border-ui"
                  >
                    <font-awesome-icon
                      class="mr-2"
                      :icon="['fas', 'plus']"
                    />Thêm p.thức thanh toán
                  </router-link>
                </div>
              </div>
            </quick-action>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import ProfileModule from "../../store/profile/profile.module";
import { Profile } from "@/types/profile/profile";

import UserOverviewModule from "../../store/profile/userOverview.module";
import { UserOverview } from "@/types/profile/userOverview";

import MentorOverviewModule from "../../store/profile/mentorOverview.module";
import { MentorOverview } from "@/types/profile/mentorOverview";

import MentorIncomeReportModule from "../../store/profile/mentorIncomeReport.module";
import { MentorIncomeReport } from "@/types/profile/mentorIncomeReport";

import UserFinanceOverviewModule from "../../store/profile/userFinanceOverview.module";
import { UserFinanceOverview } from "@/types/profile/userFinanceOverview";

import AnimatedCircles from "@/components/animated/AnimatedCircles.vue";
import QuickAction from "@/components/utils/QuickAction.vue";

import { format } from "date-fns";

import BankCardModule from "../../store/profile/bankCard.module";
import { BankCards } from "@/types/profile/bankCard";

import EWalletModule from "../../store/profile/eWallet.module";
import { EWallets } from "@/types/profile/eWallet";

import Swal from "sweetalert2";
import { ToastError } from "@/mixins/sweetalert.mixin";

@Component({
  components: {
    QuickAction,
    AnimatedCircles
  }
})
export default class Info extends Vue {
  /** data */
  private isPartner = true;

  private isActive = true;

  private profile: Profile = null;

  private ProfileInstance = getModule(ProfileModule, this.$store);

  private userOverview: UserOverview = null;

  private userFinanceOverview: UserFinanceOverview = null;

  private mentorOverview: MentorOverview = null;

  private mentorIncomeReport: MentorIncomeReport = null;

  private dateOfBirth = "";

  private MentorIncomeReportInstance = getModule(
    MentorIncomeReportModule,
    this.$store
  );

  private bankCards: BankCards = [];
  private BankCardInstance = getModule(BankCardModule, this.$store);

  private eWallets: EWallets = [];
  private EWalletInstance = getModule(EWalletModule, this.$store);

  private MentorOverviewInstance = getModule(MentorOverviewModule, this.$store);

  private UserOverviewInstance = getModule(UserOverviewModule, this.$store);

  private UserFinanceOverviewInstance = getModule(
    UserFinanceOverviewModule,
    this.$store
  );

  toastError = Swal.mixin(ToastError);

  async mounted() {
    document.title = "Trang cá nhân";
    const loader = this.$loading.show();
    this.firstLoad().then(() => {
      loader.hide();
    });
  }

  async firstLoad() {
    await this.getUserOverview();
    await this.getProfile();
    await this.getUserFinanceOverview();
    if (this.profile?.mentor) {
      await this.getBankCards();
      await this.getEWallets();
    }
  }

  async getUserOverview() {
    try {
      await this.UserOverviewInstance.fetchUserOverview();
      this.userOverview = this.UserOverviewInstance.getUserOverview;
    } catch (e) {
      this.userOverview = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  setDateOfBirth() {
    if (this.profile)
      this.dateOfBirth = format(this.profile?.dateOfBirth, "dd/MM/yyyy");
  }

  async getProfile() {
    try {
      await this.ProfileInstance.fetchProfile();
      this.profile = this.ProfileInstance.getProfile;
      if (this.profile)
        this.dateOfBirth = format(this.profile?.dateOfBirth, "dd/MM/yyyy");
      if (this.profile && this.profile.mentor) {
        this.getMentorOverview();
        this.getMentorIncomeReport();
      }
    } catch (e) {
      this.profile = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getMentorOverview() {
    try {
      await this.MentorOverviewInstance.fetchMentorOverview();
      this.mentorOverview = this.MentorOverviewInstance.getMentorOverview;
    } catch (e) {
      this.mentorOverview = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getUserFinanceOverview() {
    try {
      await this.UserFinanceOverviewInstance.fetchUserFinanceOverview();
      this.userFinanceOverview = this.UserFinanceOverviewInstance.getUserFinanceOverview;
    } catch (e) {
      this.userFinanceOverview = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getMentorIncomeReport() {
    try {
      await this.MentorIncomeReportInstance.fetchMentorIncomeReport();
      this.mentorIncomeReport = this.MentorIncomeReportInstance.getMentorIncomeReport;
    } catch (e) {
      this.mentorIncomeReport = null;
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    }
  }

  async getBankCards() {
    const loader = this.$loading.show();
    try {
      await this.BankCardInstance.fetchBankCards();
      this.bankCards = this.BankCardInstance.getBankCards;
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }

  async getEWallets() {
    const loader = this.$loading.show();
    try {
      await this.EWalletInstance.fetchEWallets();
      this.eWallets = this.EWalletInstance.getEWallets;
    } catch (e) {
      const message =
        e.response.data.message || "Xảy ra lỗi! Xin vui lòng thử lại";
      this.toastError.fire({ icon: "error", title: message });
    } finally {
      loader.hide();
    }
  }
}
</script>

<style scoped lang="scss">
.right .tab-content .about .about-info {
  padding: 1rem 1rem 0.25rem 1rem;
}

@import "../../assets/scss/nav-pills.scss";
@import "../../assets/scss/label-info-panel.scss";
@import "../../assets/scss/form.scss";
</style>
