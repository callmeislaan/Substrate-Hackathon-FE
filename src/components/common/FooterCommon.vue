<template>
  <!-- Footer -->

  <section id="footer">
    <div class="container">
      <div class="row f-top">
        <div class="col-12 col-sm-12 col-md-5 info">
          <img src="../../assets/images/logo.png" />
          <p>Học lập trình cùng <span class="highlight">ANEST</span></p>
          <ul>
            <li>
              <!-- <i class="far fa-envelope fa-fw mr-2"></i>anest.academy@gmail.com -->
              <i>
                <font-awesome-icon
                  class="tan mr-2"
                  :icon="['fas', 'envelope']"
                  fixed-width
                /> </i
              >anest.academy@gmail.com
            </li>
            <li>
              <i>
                <font-awesome-icon
                  class="tan mr-2"
                  :icon="['fas', 'phone']"
                  fixed-width
                /> </i
              >(+84) 0973 876 107
            </li>
            <li>
              <i>
                <font-awesome-icon
                  class="tan mr-2"
                  :icon="['fas', 'map-marker-alt']"
                  fixed-width
                /> </i
              >Thôn 8 - Thạch Hoà - Thạch Thất - HN
            </li>
          </ul>
        </div>
        <div class="col-12 col-sm-12 col-md-4 course">
          <h6>KHÓA HỌC</h6>
          <p>Các khóa học lập trình sẵn sàng</p>
          <ul>
            <li>Java</li>
            <li>Javascript</li>
            <li>Database</li>
            <li>HTML/CSS</li>
            <li>VueJS</li>
          </ul>
        </div>
        <div class="col-12 col-sm-12 col-md-3 social">
          <h6>FOLLOW US</h6>
          <p>Cập nhật những tin tức - bài học nhanh nhất</p>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/groups/anest.learning"
                target="_blank"
              >
                <i>
                  <font-awesome-icon
                    class="tan"
                    :icon="['fab', 'facebook-square']"
                  />
                </i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCP_JjK3orweIJ23HZ8kniJA"
                target="_blank"
              >
                <i>
                  <font-awesome-icon
                    class="tan"
                    :icon="['fab', 'youtube']"
                    fixed-width
                  />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
/*----- Site header -----*/
@import "~@/assets/scss/config/color";
/* ----- Footer ----- */

#footer {
  background-color: #1d1d1d;
  color: #bdbdbd;
  font-size: 17px;
}

#footer .f-top {
  padding-top: 80px;
  padding-bottom: 80px;
}

#footer .f-top img {
  height: 45px;
  margin-bottom: 7px;
}

#footer h6 {
  color: #c7af8b;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 1.15rem;
}

#footer h6:hover {
  color: #ffcf5c;
}

#footer .info ul,
#footer .social ul {
  padding: 0;
}

#footer .info ul li,
#footer .social ul li {
  list-style: none;
  padding: 0.15rem 0;
}

#footer .course ul {
  padding-left: 18px;
}

#footer .course ul li {
  padding: 0.15rem 0;
}

#footer .social ul li a {
  color: #bdbdbd;
  margin-right: 20px;
}

#footer .social ul li a:hover {
  color: #ffcf5c;
  text-decoration: none;
}

#footer .social ul li a i {
  font-size: 40px;
}

#footer .social ul li a.btn {
  color: #fff;
}

#footer .social ul li a.btn i {
  font-size: 16px;
}

.btn-success {
  background-color: transparent !important;
  border: 2px solid #c7af8b !important;
  color: #c7af8b !important;
}

.btn-success:hover {
  color: #ffcf5c !important;
  background-color: #333 !important;
  border-color: #ffcf5c !important;
}

.btn-lg {
  border-radius: 10px !important;
  font-size: 18px !important;
  padding: 10px 35px !important;
}
</style>
