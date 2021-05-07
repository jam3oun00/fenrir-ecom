<template>
  <v-app dark>
    <v-dialog v-model="dialog" persistent width="500px">
      <v-card>
        <!--  -->
        <v-card-title class="primary white--text">Error</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-6">
          <h2 v-if="error.statusCode === 404">{{ pageNotFound }}</h2>
          <h2 v-else>{{ otherError }}</h2>
        </v-card-text>
        <!--  -->
        <v-divider></v-divider>
        <!--  -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" nuxt to="/" text>Home page</v-btn>
        </v-card-actions>
        <!--  -->
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dialog: true,
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
