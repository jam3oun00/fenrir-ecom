<template>
  <div>
    <v-container class="mt-5">
      <h1 class="big-title">profile</h1>

      <v-avatar class="profile ma-auto" size="164" tile>
        <v-img :src="user.photoURL" :alt="user.displayName" :title="user.displayName"></v-img>
      </v-avatar>
      <h2>{{user.displayName}}</h2>
    </v-container>
  </div>
</template>

<script>
import { fb, db, auth } from "@/plugins/firebase";
import { mapState } from "vuex";
export default {
  layout: "admin",
  data() {
    return {
      photoURL: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    try {
      this.photoURL = auth.currentUser.photoURL;
    } catch (error) {
      console.log("fuck you");
    }
  },
};
</script>

<style lang="scss" scoped>
</style>