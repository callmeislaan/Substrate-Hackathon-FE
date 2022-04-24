<template>
  <div class="card-row" v-if="type">
    <component
      v-for="(data, index) in listData"
      :key="index"
      :is="type"
      :data="data"
    />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import MentorCard from "@/components/card/MentorCard.vue";
import RequestCard from "@/components/card/RequestCard.vue";
@Component({
  components: {
    MentorCard,
    RequestCard
  }
})
export default class ListCard extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly listData!: Array<unknown>;
  @Prop({ type: String, default: "" })
  readonly type!: string;
}
</script>

<style lang="scss" scoped>
.card-row {
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 0.75rem;
  padding: 1.5rem 0;

  .card {
    width: unset;
    flex-basis: 17rem;
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: -5rem;
    margin-right: 0.55rem;
    transition: 0.3s;

    &:first-child {
      margin-left: 0;
    }

    &:focus-within,
    &:hover {
      -webkit-transform: translateY(-1rem);
      transform: translateY(-1rem);
      cursor: pointer;
    }
    &:focus-within ~ .card,
    &:hover ~ .card {
      -webkit-transform: translateX(5.25rem);
      transform: translateX(5.25rem);
    }
  }

  &::-webkit-scrollbar-track {
    background-color: #18191a;
    border-radius: 0.5rem;
    border: 1px solid #242526;
  }

  &::-webkit-scrollbar {
    height: 0.4rem;
    background-color: #242526;
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #242526;
    border-radius: 10px;
  }
}
</style>
