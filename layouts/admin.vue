<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app class="xgrey">
      <v-list-item class="py-3">
        <v-list-item-avatar>
          <v-img :src="user.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{user.displayName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group class="mb-1">
          <v-list-item nuxt :to="user.uid" active-class="primary white--text" dense>
            <v-list-item-icon>
              <v-icon>mdi-shopping-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!--  -->
        </v-list-item-group>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            nuxt
            :to="item.to"
            active-class="primary white--text"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- LOG OUT -->
          <v-list-item nuxt active-class="primary white--text" @click="logOut" dense>
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!--  -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app short color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- mdi-shopping-search -->
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <!-- dialog -->
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-home", text: "home", to: "/" },
      { icon: "mdi-cards", text: "overview", to: "/admin/overview" },
      { icon: "mdi-comment-arrow-left", text: "orders", to: "/admin/orders" },
      { icon: "mdi-account", text: "profile", to: "/admin/profile" },
    ],
  }),
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  },
};
</script>

<style lang="scss" scoped>
</style>