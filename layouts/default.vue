<template>
  <v-app>
    <!--  -->
    <v-navigation-drawer v-model="form" temporary app :width="drawerWidth" right color="xgrey">
      <v-tabs v-model="tab" fixed-tabs background-color="primary">
        <v-tabs-items v-model="tab" class="xgrey">
          <v-tab-item>
            <v-card flat tile light color="xgrey">
              <!-- sign in form -->
              <v-form @submit.prevent="onSignIn">
                <v-container>
                  <v-text-field
                    outlined
                    label="Email"
                    v-model="userIn.email"
                    type="email"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="userIn.password"
                    outlined
                    label="Password"
                    prepend-inner-icon="mdi-form-textbox-password"
                    type="password"
                  ></v-text-field>
                  <v-layout class="pa-4 xgrey">
                    <v-spacer></v-spacer>
                    <v-btn text class="mr-2" rounded @click="form = !form">cancel</v-btn>
                    <v-btn text class="px-5 primary" rounded type="submit">save</v-btn>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat tile color="xgrey" light>
              <!-- sign up form -->
              <v-form @submit.prevent="onSignUp">
                <v-container>
                  <v-text-field
                    outlined
                    v-model="userUp.name"
                    label="Name"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="userUp.email"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="userUp.password"
                    label="Password"
                    prepend-inner-icon="mdi-form-textbox-password"
                  ></v-text-field>
                  <div class="d-flex flex-row justify-center">
                    <v-btn rounded dark class="mx-3 px-4 google" text @click="withGoogle">
                      <v-icon left>mdi-google</v-icon>google
                    </v-btn>
                    <v-btn rounded dark class="mx-3 px-4 facebook" text @click="withFacebook">
                      <v-icon left>mdi-facebook</v-icon>facebook
                    </v-btn>
                  </div>
                  <v-layout class="pa-4 xgrey mt-5">
                    <v-spacer></v-spacer>
                    <v-btn text class="mr-2" rounded @click="form = !form">cancel</v-btn>
                    <v-btn text class="px-5 primary" rounded type="submit">save</v-btn>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <v-tab class="primary">sign in</v-tab>
        <v-tab class="primary">sign up</v-tab>
      </v-tabs>
      <!-- <v-footer v-model="bottomNav" absolute>djkughd</v-footer> -->
    </v-navigation-drawer>
    <!--  -->
    <!-- fixed nav -->
    <v-fade-transition>
      <v-card tile class="fixed-nav py-2 pb-3 elevation-4" dark v-if="fixedNav">
        <v-toolbar dense flat class="none-back">
          <v-app-bar-nav-icon class="hidden-sm-and-up mt-1" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="font-weight-bold mr-4 mt-1" v-if="$vuetify.breakpoint.smAndUp">
            <img
              src="fenrir.png"
              alt="fenrir"
              title="fenrir"
              style="    height: 27px;
    margin-top: 9px;"
            />
          </v-toolbar-title>
          <v-btn
            text
            class="font-weight-medium hidden-xs-only mx-1 mt-1 text-capitalize"
            rounded
            v-for="(l, i) in links"
            nuxt
            @click="$vuetify.goTo(l.to)"
            :key="i"
          >{{l.name}}</v-btn>
          <v-spacer></v-spacer>
          <nuxt-link class="mt-1" :to="`/admin/${user.uid}`" v-if="user">
            <v-avatar height="44px" width="44px">
              <img
                v-if="user.photoURL"
                :src="user.photoURL"
                :alt="user.displayName"
                :title="user.displayName"
              />
              <img
                v-else
                src="https://png.pngitem.com/pimgs/s/504-5040528_empty-profile-picture-png-transparent-png.png"
                :alt="user.displayName"
                :title="user.displayName"
              />
            </v-avatar>
          </nuxt-link>

          <v-btn
            v-else
            class="font-weight-bold mx-1 mt-1 primary"
            rounded
            text
            @click="form = true"
          >get started</v-btn>
        </v-toolbar>
      </v-card>
    </v-fade-transition>
    <v-navigation-drawer dark v-model="drawer" class="primary" app temporary>
      <v-list nav dense>
        <v-list-item v-for="(item, i) in links" :key="i" nuxt @click="$vuetify.goTo(item.to)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--  -->
    <header class="main-header" ref="headerx" id="home">
      <!--  -->

      <!--  -->
      <v-carousel
        cycle
        hide-delimiter-background
        :show-arrows="false"
        class="h-100"
        continuous
        delimiter-icon="mdi-minus"
      >
        <!-- header nav -->
        <v-card flat tile class="none-back nav pt-4 px-2">
          <v-toolbar dense flat class="none-back">
            <v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold mr-4 mt-1" v-if="$vuetify.breakpoint.smAndUp">
              <img
                src="fenrir.png"
                alt="fenrir"
                title="fenrir"
                style="    height: 27px;
    margin-top: 9px;"
              />
            </v-toolbar-title>
            <v-btn
              text
              class="font-weight-medium hidden-xs-only mx-1 mt-1 text-capitalize"
              rounded
              v-for="(l, i) in links"
              :key="i"
              nuxt
              @click="$vuetify.goTo(l.to)"
            >{{l.name}}</v-btn>
            <v-spacer></v-spacer>
            <!-- avatar -->
            <nuxt-link :to="`/admin/${user.uid}`" v-if="user">
              <v-avatar height="44px" width="44px">
                <img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  :alt="user.displayName"
                  :title="user.displayName"
                />
                <img
                  v-else
                  src="https://png.pngitem.com/pimgs/s/504-5040528_empty-profile-picture-png-transparent-png.png"
                  :alt="user.displayName"
                  :title="user.displayName"
                />
              </v-avatar>
            </nuxt-link>

            <v-btn
              v-else
              class="font-weight-bold mx-1 mt-1 primary"
              rounded
              text
              @click="form = true"
            >get started</v-btn>
          </v-toolbar>
        </v-card>

        <!--  -->

        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" class="h-100">
          <div class="title px-7">
            <span>
              <h2 class="big-title">{{item.title}}</h2>
              <p class="my-5 mb-6">{{item.text}}</p>
              <v-btn class="font-weight-bold primary" text rounded>read more</v-btn>
            </span>
          </div>
        </v-carousel-item>
      </v-carousel>
    </header>

    <main ref="afterHeader">
      <nuxt />
    </main>
  </v-app>
</template>
<script>
import { fb, db, auth } from "@/plugins/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: null,
      links: [
        {
          name: "home",
          to: "#home",
          icon: "mdi-home",
        },
        {
          name: "product",
          icon: "mdi-shopping",
          to: "#product",
        },
        {
          name: "about",
          icon: "mdi-account",
          to: "#about",
        },
      ],
      items: [
        {
          src: "/sean-pollock-PhYq704ffdA-unsplash.jpg",
          title: "start shoping now.",
          text:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quidem distinctio eius similique. A non asperiores consectetur dicta earum deserunt debitis",
        },
        {
          src: "mika-baumeister-PZao9UjlbMY-unsplash.jpg",
          title: "best services.",
          text:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quidem distinctio eius similique.",
        },
        {
          src: "freestocks-_3Q3tsJ01nc-unsplash.jpg",
          title: "just ask for it.",
          text:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quidem distinctio eius similique.",
        },
      ],
      userUp: {
        name: null,
        email: null,
        password: null,
      },
      userIn: {
        email: null,
        password: null,
      },
      fixedNav: false,
      tab: null,
      form: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    drawerWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "370px";
        case "md":
          return "370px";
        case "lg":
          return "370px";
        case "xl":
          return "370px";
      }
    },
  },
  methods: {
    onSignUp() {
      this.form = !this.form;
      this.$store.dispatch("signUp", this.userUp);
    },
    onSignIn() {
      this.form = !this.form;
    },
    withGoogle() {
      this.$store.dispatch("withGoogle");
      this.form = false;
    },
    withFacebook() {
      this.$store.dispatch("withFacebook");
      this.form = false;
    },
  },
  // //
  mounted() {
    this.form = false;
    try {
      if (this.$refs.headerx) {
        window.addEventListener("scroll", () => {
          window.pageYOffset >= this.$refs.headerx.scrollHeight - 150
            ? (this.fixedNav = true)
            : (this.fixedNav = false);
        });
      }
    } catch (error) {
      console.log(error);
    }
    ///////////
    this.$vuetify.theme.dark = false;
    //////////////
  },
};
</script>
<style lang="scss">
$font: "Montserrat", sans-serif;

button:focus {
  outline: none !important;
}

.blacktext {
  color: #1f1f25;
}
.fixed-nav {
  position: fixed;
  width: 100%;
  z-index: 2;
}
.v-carousel__controls {
  // opacity: 0.7;
  justify-content: flex-start;
  padding-left: 20px;
}
.v-apllication {
  overflow-x: hidden;
}
h1,
h2,
h3,
h4,
h5,
h6,
.fonty,
.big-title {
  font-family: $font !important;
}
.none-back {
  background: none !important;
}
.h-100,
.v-carousel__item {
  height: 100% !important;
}
.nav {
  position: absolute;
  width: 100%;
  z-index: 1;
}
.big-title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  text-transform: capitalize;
}
.title {
  margin: auto;
  height: 100%;
  display: flex;
  background-image: linear-gradient(
    0deg,
    rgba(black, 0.88) -15%,
    rgba(black, 0.54) 60%
  );
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;

  p {
    font-size: 17px;
    max-width: 500px;
  }
  span {
    max-width: 750px;
  }
}
header.main-header {
  display: block;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  // position: relative;
  z-index: 0;
}
</style>