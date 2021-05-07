<template>
  <v-app class="xgrey" id="product">
    <v-container>
      <h1 class="big-title my-7 mt-12">product</h1>
      <client-only placeholder="Loading...">
        <masonry :cols="{600: 1, 960: 2, 1264: 3, 1904: 4}" :gutter="12">
          <div v-for="(p, i) in products" :key="i">
            <v-card tile class="my-3" dark>
              <v-carousel
                height="220px"
                cycle
                :hide-delimiters="p.imgsUrl.length <= 1"
                :show-arrows="false"
                continuous
                delimiter-icon="mdi-minus"
              >
                <v-carousel-item v-for="(item,i) in p.imgsUrl" :key="i" :src="item"></v-carousel-item>
              </v-carousel>
              <v-card-title>{{p.product}}</v-card-title>

              <v-card-text>{{p.desc}}</v-card-text>
              <v-card-actions>
                <v-btn text color="primary">{{p.price}} $</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" class="font-weight-bold">add to card</v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div>
            <nuxt-link to="/products#products">
              <v-card tile class="primary my-3" v-ripple>
                <v-container class="fill-height">
                  <v-row
                    align="center"
                    justify="center"
                    style="min-height: 300px;"
                    class="text-center"
                  >
                    <h3 class="big-title mt-4" style=" font-size: 37px ">
                      show
                      all
                      products
                    </h3>
                    <br />
                    <v-icon class="mb-3">mdi-arrow-right</v-icon>
                  </v-row>
                </v-container>
              </v-card>
            </nuxt-link>
          </div>
          <!--  -->
        </masonry>
      </client-only>

      <!--  -->
      <!--  -->
    </v-container>
    <div class="blacktext my-16">
      <v-card dark tile flat>
        <v-container class="pt-0 pb-0">
          <v-layout wrap row>
            <v-flex xs12 sm6>
              <v-img src="xps-dpbXgTh0Lac-unsplash.jpg"></v-img>
            </v-flex>
            <v-flex xs12 sm6>
              <div class="pa-7" id="about">
                <v-card-title>
                  <h1 class="mx-0 mt-9 mb-9 big-title">about us</h1>
                </v-card-title>
                <v-card-text>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum optio eos aspernatur? Ipsam odit voluptatum qui libero! Tempora quaerat eaque commodi, dignissimos laborum facere itaque ratione reiciendis earum exercitationem est?</p>
                  <v-btn text class="primary mt-6" rounded>browse product</v-btn>
                </v-card-text>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
    <v-footer dark padless>
      <v-card flat tile style="width: 100%" class="white--text text-center">
        <v-card-text>
          <a href="https://www.facebook.com/mohamed.jamountanjawi" target="_blank">
            <v-btn class="mx-4 white--text" icon>
              <v-icon size="24px">mdi-facebook</v-icon>
            </v-btn>
          </a>

          <a href="https://twitter.com/mohamedJM1" target="_blank">
            <v-btn icon class="mx-4 white--text">
              <v-icon size="24px">mdi-twitter</v-icon>
            </v-btn>
          </a>

          <a href="https://www.linkedin.com/in/mohamed-jamoun-a9640819a/" target="_blank">
            <v-btn icon class="mx-4 white--text">
              <v-icon size="24px">mdi-linkedin</v-icon>
            </v-btn>
          </a>

          <a href="https://www.instagram.com/jam_3_oun/" target="_blank">
            <v-btn icon class="mx-4 white--text">
              <v-icon size="24px">mdi-instagram</v-icon>
            </v-btn>
          </a>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy; {{ new Date().getFullYear() }} —
          <strong>Fenrir</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // ...mapState(["products"]),
    products() {
      return this.$store.state.products.slice(0, 5);
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.v-card {
  line-height: 1 !important;
}
</style>
<style lang="stylus" scoped></style>