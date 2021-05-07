<template>
  <v-card class="xdarkgrey" tile dark>
    <v-carousel
      height="220px"
      cycle
      :hide-delimiters="product.imgsUrl.length <= 1"
      :show-arrows="false"
      continuous
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item v-for="(item,i) in product.imgsUrl" :key="i" :src="item"></v-carousel-item>
    </v-carousel>

    <v-card-title>{{product.product}}</v-card-title>

    <v-card-subtitle>
      <div>
        <strong>author :</strong>
        {{product.author}}
      </div>
      <div>
        <strong>price :</strong>
        {{product.price}}
      </div>
      <div>
        <strong>tags :</strong>
        <v-chip
          class="px-2 ma-1 elevation-2"
          color="primary"
          label
          small
          v-for="(tag, i) in product.tags"
          :key="i"
        >{{tag}}</v-chip>
      </div>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn class="primary" tile @click="dalete(index)">delete</v-btn>
      <v-btn text color="primary" @click="$emit('delete', product)" tile>edit</v-btn>

      <v-spacer></v-spacer>

      <v-btn icon color="primary" @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>{{product.desc}}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ["product", "index", "id"],
  data() {
    return {
      show: false,
      currentProduct: this.product,
    };
  },
  methods: {
    dalete(i) {
      console.warn("delete", this.id);
      this.$store.dispatch("deleteProduct", {
        id: this.id,
        imgsUrl: this.product.imgsUrl,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>