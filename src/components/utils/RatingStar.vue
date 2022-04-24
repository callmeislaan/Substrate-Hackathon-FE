<template>
  <div class="stars">
    <font-awesome-icon
      v-for="(star, index) in rating - (rating % 1)"
      :icon="['fas', 'star']"
      :key="`star${index}`"
    />
    <font-awesome-icon v-if="rating % 1" :icon="['fas', 'star-half-alt']" />
    <font-awesome-icon
      v-for="(star, index) in 5 - rating - (rating % 1)"
      :icon="['far', 'star']"
      :key="`empty-star${index}`"
    />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component
export default class RatingStar extends Vue {
  @Prop({ type: Number, default: 0 }) readonly rating!: number;
}
</script>

<style lang="scss" scoped>
.svg-inline--fa.fa-w-18 {
  width: 0.8em;
}
</style>
