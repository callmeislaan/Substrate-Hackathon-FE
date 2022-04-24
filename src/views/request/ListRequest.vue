<template>
  <div class="container">
    <left-side>
      <div class="left-col">
        <!-- Select option filter -->
        <div class="card bg-dark-ui border-ui filter-card">
          <h6 class="filter-title">Sắp xếp</h6>
          <div class="filter-item row">
            <div class="col-5 filter-item-name">Sắp xếp theo</div>
            <div class="col-7">
              <select
                v-model="paramObject.sort"
                class="custom-select filter-select"
              >
                <option value="price">Giá</option>
                <option value="time">
                  Ngày tạo
                </option>
                <option value="deadline">
                  Ngày kết thúc
                </option>
              </select>
            </div>
          </div>
          <div class="filter-item row">
            <div class="col-5 filter-item-name">Thứ tự</div>
            <div class="col-7">
              <select
                v-model="paramObject.order"
                class="custom-select filter-select"
              >
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Other filter -->
        <div class="card bg-dark-ui border-ui filter-card mt-2">
          <h6 class="filter-title">Theo giá</h6>
          <div class="filter-item row">
            <div class="col-3">Từ</div>
            <div class="col-9">
              <input
                v-model="minPrice"
                type="number"
                placeholder="Nhập giá"
                class="form-control filter-input"
                @input="debounceUpdateMinPrice"
              />
            </div>
          </div>
          <div class="filter-item row">
            <div class="col-3">Đến</div>
            <div class="col-9">
              <input
                v-model="maxPrice"
                type="number"
                placeholder="Nhập giá"
                class="form-control filter-input"
                @input="debounceUpdateMaxPrice"
              />
            </div>
          </div>
        </div>

        <div class="card bg-dark-ui border-ui filter-card mt-2">
          <h6 class="filter-title">Theo trạng thái</h6>
          <div class="filter-item">
            <div class="custom-control custom-radio">
              <input
                v-model="filter.status"
                type="radio"
                class="custom-control-input"
                id="all"
                :value="undefined"
              />
              <label class="custom-control-label" for="all">
                Tất cả
              </label>
            </div>
            <template v-for="(status, key) in requestStatus">
              <div
                class="custom-control custom-radio"
                v-if="status != requestStatus.DELETE"
                :key="status.text"
              >
                <input
                  v-model="filter.status"
                  type="radio"
                  class="custom-control-input"
                  :id="status.text"
                  :value="key"
                />
                <label class="custom-control-label" :for="status.text">
                  {{ formatStatusText(status.text) }}
                </label>
              </div>
            </template>
          </div>
        </div>

        <!-- Checkbox filter -->
        <div class="card bg-dark-ui border-ui filter-card mt-2">
          <h6 class="filter-title">Kỹ năng</h6>
          <div class="filter-item row">
            <div class="collapsable" :class="{ collapsed: collapseSkill }">
              <skill-checkbox @change="updateFilterSkills" />
            </div>
            <div class="collapse-btn" @click="collapseSkillCheckboxes">
              {{ collapseSkill ? "Tất cả" : "Thu gọn" }}
              <font-awesome-icon
                :icon="['fas', collapseSkill ? 'chevron-down' : 'chevron-up']"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </left-side>
    <right-side>
      <div class="search-bar mb-4">
        <input
          v-model="keyword"
          type="text"
          class="form-control"
          placeholder="Nhập từ khóa tìm kiếm ..."
          @input="debounceUpdateKeyword"
        />
      </div>

      <div class="list-request-wrapper">
        <request-item
          v-for="(request, index) in requests"
          :displayType="'smallcard'"
          :key="index"
          :request="request"
        />
      </div>

      <div class="pagination-wrapper">
        <paginate
          class="m-0"
          v-if="pageCount"
          :page-count="pageCount"
          :page-range="3"
          :prev-text="'Trước'"
          :next-text="'Sau'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :click-handler="goToPage"
        >
        </paginate>
      </div>
    </right-side>
  </div>
</template>

<script lang="ts">
import debounce from "lodash.debounce";

import { Watch, Component, Vue } from "vue-property-decorator";

import { getModule } from "vuex-module-decorators";
import RequestModule from "@/store/request/request.module";

import LeftSide from "@/components/layout/LeftSide.vue";
import RightSide from "@/components/layout/RightSide.vue";
import ListSkill from "@/components/ListSkill.vue";
// import RatingInput from "@/components/utils/RatingInput.vue";
import SkillCheckbox from "@/components/skill/SkillCheckbox.vue";
import RequestItem from "@/components/request/RequestItem.vue";

import { Requests, RequestStatus } from "@/types/request";

import Paginate from "vuejs-paginate";

import { requestService } from "@/services/request/requests.service";

type Filter = {
  skillIds: Array<number>;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  status: string | undefined;
};

type ParamRequestFilter = {
  page: number;
  size: number;
  keyWord: string | undefined;
  sort: string | undefined;
  order: string | undefined;
  filter: Filter | undefined;
};

@Component({
  components: {
    LeftSide,
    RightSide,
    ListSkill,
    // RatingInput,
    SkillCheckbox,
    RequestItem,
    Paginate
  }
})
export default class ListRequest extends Vue {
  RequestInstance = getModule(RequestModule, this.$store);

  collapseSkill = true;

  requests: Requests = [];

  requestStatus = RequestStatus;

  minPrice: string | null = null;
  maxPrice: string | null = null;
  keyword: string | null = null;

  filter: Filter = {
    skillIds: [],
    minPrice: undefined,
    maxPrice: undefined,
    status: undefined
  };

  paramObject: ParamRequestFilter = {
    page: 1,
    size: 4,
    keyWord: undefined,
    sort: "price",
    order: "asc",
    filter: undefined
  };

  pageCount = 1;

  debounce(func: Function, price: number) {
    func(price);
    console.log(debounce);
    debounce(() => {
      console.log("debouncing");
    }, 300);
  }

  @Watch("filter", { deep: true })
  updateFilterToParamObject(filter: Filter) {
    this.paramObject.filter = filter;
  }

  @Watch("paramObject", { deep: true })
  async getRequests(paramObject: ParamRequestFilter) {
    const loader = this.$loading.show();
    const response = await requestService.getListRequests(paramObject);
    this.requests = response.data.data;
    this.pageCount = Math.ceil(
      response.data.totalRecords / this.paramObject.size
    );
    loader.hide();
  }

  created() {
    document.title = "Danh sách yêu cầu";
    this.getRequests(this.paramObject);
  }

  formatStatusText(text: string) {
    if (!text) return "";
    return text.charAt(0) + text.slice(1).toLowerCase();
  }

  updateFilterSkills(skillIds: Array<number>) {
    this.filter.skillIds = skillIds;
  }

  updateKeyword() {
    this.paramObject.keyWord = this.keyword ? this.keyword : undefined;
  }

  debounceUpdateMinPrice = (() => {
    return debounce(() => {
      this.updateMinPrice();
    }, 500);
  })();

  debounceUpdateMaxPrice = (() => {
    return debounce(() => {
      this.updateMaxPrice();
    }, 500);
  })();

  debounceUpdateKeyword = (() => {
    return debounce(() => {
      this.updateKeyword();
    }, 500);
  })();

  updateMinPrice() {
    if (!this.minPrice) this.filter.minPrice = undefined;
    else this.filter.minPrice = +this.minPrice;
  }

  updateMaxPrice() {
    if (!this.maxPrice) this.filter.maxPrice = undefined;
    else this.filter.maxPrice = +this.maxPrice;
  }

  goToPage(pageNo: number) {
    this.paramObject.page = pageNo;
  }

  collapseSkillCheckboxes() {
    this.collapseSkill = !this.collapseSkill;
  }
}
</script>

<style lang="scss" scoped>
.filter-card {
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
}

.filter-title {
  text-align: center !important;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.filter-item {
  align-items: center;
  margin-bottom: 0.5rem;
  color: #e4e6eb;
}

.filter-item-name {
  font-size: 0.9rem;
}

.filter-select,
.filter-input,
.form-control {
  background: #18191a;
  color: #c4c6ca;
  border: none;
  border-radius: 7px;
  font-size: 0.85rem;
  cursor: pointer;
}

.form-control:focus {
  color: #c4c6ca;
  background-color: unset !important;
  border-color: unset !important;
}

.search-bar {
  .form-control {
    background: #242526;
    padding: 1.5rem;
    font-size: 1rem;
    -webkit-box-shadow: 0px 5px 17px 8px rgba(0, 0, 0, 0.19);
    box-shadow: 0px 5px 17px 8px rgba(0, 0, 0, 0.19);
  }
  .btn {
    font-size: 0.85rem;
    background: #242526;
    color: #c4c6ca;
    border: 1px solid #78797a;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}

.left {
  max-height: calc(100vh - 10.5rem);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background-color: #18191a;
  }

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #24252693;
    border-radius: 1rem;
    border: 0.25rem solid #18191a;

    &:hover {
      background-color: #3a3b3c;
    }
  }
}

.list-request-wrapper {
  max-height: calc(100vh - 18.5rem);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    background-color: #18191a;
  }

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #24252693;
    border-radius: 1rem;
    border: 0.25rem solid #18191a;

    &:hover {
      background-color: #3a3b3c;
    }
  }
}

.pagination-wrapper {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.collapsable.collapsed {
  max-height: 10rem;
  overflow: hidden;
}

.collapse-btn {
  width: 100%;
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #b0b2b8;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
