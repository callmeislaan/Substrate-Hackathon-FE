<template>
  <div class="rating-input-wrapper">
    <font-awesome-icon
      v-for="index in 5"
      class="cursor-pointer"
      :icon="[index > rating ? 'far' : 'fas', 'star']"
      :key="`star${index}`"
      @mouseenter="previewRating(index)"
      @mouseleave="unPreviewRating()"
      @click="setRate(index)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RatingInput extends Vue {
  // @Prop({ type: Number, default: 0 }) readonly rating!: number;
  rating = 0;
  isSet = false;

  previewRating(value: number) {
    this.rating = value;
    this.isSet = false;
  }

  unPreviewRating() {
    if (!this.isSet) this.rating = 0;
  }

  setRate(value: number) {
    this.rating = value;
    this.isSet = true;
    this.$emit("rate", this.rating);
  }
}
</script>

<style lang="scss" scoped>
.rating-input-wrapper {
  font-size: 1.5rem;
}
</style>
