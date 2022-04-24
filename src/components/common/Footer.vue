<template>
  <!-- Footer -->
  <section id="footer">
    <div class="container">
      <div class="row f-top">
        <div class="col-12 col-sm-12 col-md-5 info">
          <img src="assets/images/cover/logo.png" />
          <p>Học lập trình cùng <span class="highlight">ANEST</span></p>
          <ul>
            <li>
              <i class="far fa-envelope fa-fw mr-2"></i>anest.academy@gmail.com
            </li>
            <li><i class="fas fa-phone fa-fw mr-2"></i>(+84) 0973 876 107</li>
            <li>
              <i class="fas fa-map-marker-alt fa-fw mr-2"></i>Thôn 8 - Thạch Hoà
              - Thạch Thất - HN
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
                <i class="fab fa-facebook-square"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCP_JjK3orweIJ23HZ8kniJA"
                target="_blank"
              >
                <i class="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="courses.html" class="btn btn-lg btn-success mt-4"
                ><i class="fas fa-edit fa-fw mr-1"></i>Đăng ký</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- <section id="signature">
    <div class="container">
      <div class="row f-bot">
        <div class="col-12 col-sm-12 col-md-6 clock">
          <i class="far fa-clock color-tan fa-fw mr-1"></i><span id=clock></span>
        </div>
        <div class="col-12 col-sm-12 col-md-6 copyright">
          <span>Copyright © 2020 ANEST ACADEMY</span>
        </div>
      </div>
    </div>
  </section> -->
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
</style>
