<template>
  <v-app class="xgrey">
    <v-container id="products">
      <v-row class="px-2 justify-md-end">
        <v-col cols="12" md="8" lg="7" class="pa-1">
          <v-form @submit.prevent="search" class="d-flex">
            <v-autocomplete
              v-model="select"
              :items="$store.state.tags"
              append-icon="mdi-chevron-down"
              cache-items
              flat
              hide-no-data
              hide-details
              label="search..."
              filled
              dense
              solo-inverted
              height="44px"
            ></v-autocomplete>
            <v-btn class="ml-2" tile color="primary" large type="submit" v-if="select">go</v-btn>
            <v-btn class="ml-2" tile color="primary" large @click="undoSearch" v-if="select">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-form>
        </v-col>

        <v-col cols="12" sm="6"></v-col>
      </v-row>

      <!-- search result -->
      <client-only placeholder="Loading..." v-if="fProducts && select">
        <masonry :cols="{600: 1, 960: 2, 1264: 3, 1904: 4}" :gutter="12">
          <div v-for="(p, i) in fProducts" :key="i">
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
        </masonry>
      </client-only>

      <!-- all products -->
      <client-only placeholder="Loading..." v-else>
        <masonry :cols="{600: 1, 960: 2, 1264: 3, 1904: 4}" :gutter="12">
          <div v-for="(p, i) in visibleProducts" :key="i">
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
        </masonry>
      </client-only>
      <v-pagination
        v-model="page"
        :length="Math.ceil(products.length/perPage)"
        circle
        v-if="!fProducts && !select"
      ></v-pagination>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fProducts: null,
      select: null,
      page: 1,
      perPage: 10,
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    visibleProducts() {
      return this.products.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  methods: {
    search() {
      let fProdicts = [];
      this.products.forEach((e) => {
        if (e.tags.includes(this.select)) {
          fProdicts.push(e);
        }
      });
      console.log(fProdicts);
      this.fProducts = fProdicts;
      // let fProdicts = this.products.filter((e) => {
      //   e.tags.includes(this.select);
      //   e.uid == this.$store.user.uid;
      //   // if ( && ) {
      //   //   fProdicts.push(e);
      //   // }
      // });
      // console.log(fProdicts);
      // this.$store.products = fProdicts;
    },
    undoSearch() {
      this.fProducts = null;
      this.select = null;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>