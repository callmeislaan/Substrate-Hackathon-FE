<template>
  <div class="wrap">
    <img
      src="../../assets/images/system/1.svg"
      alt="Mobirise"
      class="image-1 animated-elements1"
    />
    <img
      src="../../assets/images/system/2.svg"
      alt="Mobirise"
      class="image-2 animated-elements2"
    />
    <img
      src="../../assets/images/system/3.svg"
      alt="Mobirise"
      class="image-3 animated-elements3"
    />
    <img
      src="../../assets/images/system/4.svg"
      alt="Mobirise"
      class="image-4 animated-elements4"
    />
    <img
      src="../../assets/images/system/5.svg"
      alt="Mobirise"
      class="image-5 animated-elements5"
    />
    <img
      src="../../assets/images/system/6.svg"
      alt="Mobirise"
      class="image-6 animated-elements6"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import $ from "jquery";

@Component({
  props: {
    alignY: {
      default: "top",
      type: String
    },
    alignX: {
      default: "right",
      type: String
    },
    size: {
      default: "m",
      type: String
    }
  }
})
export default class AnimatedCircles extends Vue {
  mounted() {
    const animatedElements1 = $(".animated-elements1"),
      animatedElements2 = $(".animated-elements2"),
      animatedElements3 = $(".animated-elements3"),
      animatedElements4 = $(".animated-elements4"),
      animatedElements5 = $(".animated-elements5"),
      animatedElements6 = $(".animated-elements6"),
      containerW = $(window).width() ?? 0,
      containerH = $(window).height() ?? 0;

    $(document).on("mousemove", function(event) {
      const posX = event.clientX,
        posY = event.clientY;

      let left = 0,
        top = 0,
        right = 0,
        bottom = 0;

      left = containerW / 2 - posX;
      top = containerH / 2 - posY;
      right = containerW / 2 + posX;
      bottom = containerH / 2 + posY;

      $(animatedElements1).css({
        transform:
          "translateX(" + right / 8 + "px) translateY(" + top / 8 + "px)"
      });
      $(animatedElements2).css({
        transform:
          "translateX(" + left / 24 + "px) translateY(" + top / 24 + "px)"
      });
      $(animatedElements3).css({
        transform:
          "translateX(" + left / 8 + "px) translateY(" + bottom / 8 + "px)"
      });
      $(animatedElements4).css({
        transform:
          "translateX(" + left / 24 + "px) translateY(" + bottom / 24 + "px)"
      });
      $(animatedElements5).css({
        transform:
          "translateX(" + right / 24 + "px) translateY(" + bottom / 24 + "px)"
      });
      $(animatedElements6).css({
        transform:
          "translateX(" + right / 8 + "px) translateY(" + top / 8 + "px)"
      });
    });
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
  float: left;
  width: 100%;
  min-height: 1px;
  padding-left: 10px;
  padding-right: 10px;

  img {
    max-width: 100%;
    vertical-align: middle;
    display: inline-block;
  }
}

.image-1,
.image-2,
.image-3,
.image-4,
.image-5,
.image-6 {
  position: absolute;
  -webkit-transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  will-change: transform;
}

.image-1 {
  left: -75px;
  bottom: 30px;
}

.image-2 {
  left: -80px;
  top: 200px;
}

.image-3 {
  left: -11px;
  bottom: -141px;
}

.image-4 {
  left: auto;
  right: -91px;
  bottom: -280px;
}

.image-5 {
  left: 7px;
  top: 35px;
}

.image-6 {
  left: -155px;
  top: -15px;
}
</style>
