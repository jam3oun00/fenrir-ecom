<template>
  <v-app class="xgrey">
    <v-container class="mt-5">
      <h2 class="big-title mb-10 mt-4">your products</h2>
      <v-row class="justify-space-between px-2">
        <v-col cols="12" sm="7" md="9" class="pa-1">
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
        <v-col cols="12" sm="5" md="3" class="pa-1">
          <v-btn block class="primary" @click="addProduct" tile large>
            add new product
            <v-icon right>mdi-plus-circle</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12" sm="6"></v-col>
      </v-row>

      <!-- <v-layout row wrap>
        <v-flex v-for="(p, i) in products" :key="`${i}-${p.id}`" xs12 sm6 md4 lg3>
          <products :product="p" :id="p.id" :index="i" @delete="editProduct($event)" />
        </v-flex>
      </v-layout>-->
      <client-only placeholder="Loading..." v-if="fProducts && select">
        <masonry :cols="{600: 1, 960: 2, 1264: 3, 1904: 4}" :gutter="12">
          <div v-for="(p, i) in fProducts" :key="`${i}-${p.id}`">
            <products
              :product="p"
              class="my-3"
              :id="p.id"
              :index="i"
              @delete="editProduct($event)"
            />
          </div>
        </masonry>
      </client-only>
      <client-only placeholder="Loading..." v-else>
        <masonry :cols="{600: 1, 960: 2, 1264: 3, 1904: 4}" :gutter="12">
          <div v-for="(p, i) in products" :key="`${i}-${p.id}`">
            <products
              :product="p"
              class="my-3"
              :id="p.id"
              :index="i"
              @delete="editProduct($event)"
            />
          </div>
        </masonry>
      </client-only>

      <!-- DIALOGUE ADD OR EDIT DTATA -->
      <v-dialog v-model="dialog" persistent width="800px" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card class="xgrey">
          <v-card-title class="primary white--text">
            <span v-if="added">add new product</span>
            <span v-else>
              edit product
              <v-icon dark class="mb-1">mdi-chevron-right</v-icon>
              {{product}}
            </span>
          </v-card-title>
          <v-container light>
            <v-row class="mx-2" wrap>
              <v-col cols="12" sm="6" class="px-1 pb-0">
                <v-text-field
                  dense
                  filled
                  counter="20"
                  maxlength="20"
                  placeholder="enter product's name"
                  label="name"
                  v-model="product"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="px-1 pb-0">
                <v-text-field
                  filled
                  dense
                  type="number"
                  min="0"
                  placeholder="enter product's price"
                  label="price"
                  v-model="price"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="px-1 pb-0">
                <v-row>
                  <v-col cols="12">
                    <v-combobox
                      v-model="tags"
                      :items="allTags"
                      chips
                      clearable
                      filled
                      placeholder="enter product's keywords"
                      label="tags"
                      multiple
                    >
                      <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip
                          label
                          color="primary"
                          small
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="remove(item)"
                        >{{ item }}</v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      counter="120"
                      maxlength="120"
                      auto-grow
                      rows="2"
                      multi-line
                      dense
                      filled
                      placeholder="add a description for your product"
                      label="descreption"
                      v-model="desc"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      @change="picked"
                      dense
                      chips
                      multiple
                      placeholder="select images for product"
                      label="images"
                      small-chips
                      show-size
                      counter
                      prepend-icon
                      filled
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>
              <!-- images for add product -->
              <v-col cols="12">
                <div v-if="images" justify-content="start" class="d-flex justify-start flex-wrap">
                  <v-card v-for="(img, i) in images" :key="i" class="ma-1">
                    <v-img :src="img" height="130px" width="130px">
                      <v-btn fab x-small dark class="ma-1" color="primary" @click="daleteImg(i)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-img>
                  </v-card>
                </div>
                <!-- images fro the edit product  -->
                <div v-else justify-content="start" class="d-flex justify-start flex-wrap">
                  <v-card v-for="(img,i) in imgsUrl" :key="i" class="ma-2">
                    <v-img :src="img" eager height="130px" width="130px">
                      <v-btn
                        fab
                        x-small
                        dark
                        class="ma-1"
                        color="primary"
                        @click="deleteImgFromStorage(img)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-img>
                  </v-card>
                </div>
              </v-col>
            </v-row>

            <!--  -->
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="cancelUploadFn">Cancel</v-btn>
            <v-btn text @click="uploadFiles" :loading="loader" :disabled="loader">Save</v-btn>
          </v-card-actions>
          <v-progress-linear color="primary" height="5" striped v-model="progress"></v-progress-linear>
        </v-card>
      </v-dialog>
    </v-container>
    <v-snackbar v-model="snackbar" bottom left color="primary" elevation="12">
      {{snackbarMsg}}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" icon small v-bind="attrs" @click="snackbar = false">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { fb, db, auth, storage } from "@/plugins/firebase";
import { mapState } from "vuex";
export default {
  layout: "admin",
  data() {
    return {
      dialog: false,
      select: null,
      added: false,
      gallery: false,
      imgPicker: "",
      snackbar: false,
      snackbarMsg: "",
      progress: "",
      cancelUpload: false,
      dialogType: null,
      loader: false,
      isUplodDone: false,
      id: null,
      product: null,
      price: null,
      tags: null,
      imgsUrl: null,
      images: null,
      desc: null,
      imgsDetail: null,
      productsName: null,
      chips: null,
      fProducts: null,
    };
  },
  computed: {
    ...mapState(["user"]),
    products() {
      return this.$store.state.products.filter(
        (m) => m.uid == this.$route.params.id
      );
    },
    allTags() {
      let tags = [];
      for (let p in this.$store.state.tags) {
        tags.push(this.$store.state.tags[p]);
      }
      return tags;
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
    deleteImgFromStorage(url) {
      const baseUrl =
        "https://firebasestorage.googleapis.com/v0/b/ecom-1-4de2c.appspot.com/o/";
      let imagePath = url.replace(baseUrl, "");
      const indexOfEndPath = imagePath.indexOf("?");
      imagePath = imagePath.substring(0, indexOfEndPath);
      imagePath = imagePath.replace("%2F", "/");
      const indexOfImg = this.imgsUrl.indexOf(url);
      this.imgsUrl[indexOfImg] = null;
      console.log(this.imgsUrl);
      // db.collection("products")
      //   .doc(this.id)
      //   .then(() => {
      //     console.log(doc);
      //   })
      //   .catch((doc) => {
      //     // doc.get('array') no longer contains field 'foo'
      //     console.warn("error", doc);
      //   });
      let newImgs = [];
      this.imgsUrl.forEach((e) => {
        if (e) {
          newImgs.push(e);
        }
      });
      storage
        .ref()
        .child(imagePath)
        .delete()
        .then(() => {
          db.collection("products")
            .doc(this.id)
            .update({
              imgsUrl: newImgs,
            })
            .then(() => {
              this.imgsUrl = newImgs;
              console.log(
                "%c delete succesfully",
                "color: red; font-weight: 900"
              );
            })
            .catch((err) => {
              console.log(err);
            });
          // File deleted successfully
          console.log("File deleted successfully");
          // console.warn(storage.ref().child(imagePath));
        });
    },
    picked($event) {
      try {
        let allFiles = [];
        let imgsDetail = [];
        let files = $event;

        Array.from(files).forEach((e) => {
          imgsDetail.push(e);

          let fr = new FileReader();
          if (e) {
            fr.readAsDataURL(e);
            fr.addEventListener("load", () => {
              allFiles.push(fr.result);
            });
          } else {
            this.imgsDetail = "";
            this.images = "";
          }
        });
        this.imgsDetail = imgsDetail;
        this.images = allFiles;
        console.warn("picked", this.images);
      } catch (error) {
        console.warn(error);
      }
    },
    cancelUploadFn() {
      this.dialog = false;
      if (!this.isUplodDone) {
        this.cancelUpload = true;
      } else {
        this.cancelUpload = false;
      }
    },
    addProduct() {
      this.dialogType = "add";
      this.snackbar = false;
      this.loader = false;
      this.progress = 0;
      this.imgPicker = null;
      this.id = null;
      this.product = null;
      this.price = null;
      this.tags = null;
      this.imgsUrl = null;
      this.images = null;
      this.desc = null;
      this.imgsDetail = null;
      this.dialog = true;
      this.added = true;
    },
    editProduct(i) {
      this.dialogType = "edit";
      this.snackbar = false;
      this.loader = false;
      this.added = false;
      this.id = i.id;
      this.product = i.product;
      this.price = i.price;
      this.tags = i.tags;
      this.imgsUrl = i.imgsUrl;
      this.images = i.images;
      this.desc = i.desc;
      this.imgsDetail = i.imgsDetail;
      // this.imgsDetail = [
      //   1,
      //   2,
      // ];
      console.log(i);
      this.dialog = true;
    },
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
    daleteImg(i) {
      this.images.splice(i, 1);
      this.imgsDetail.splice(i, 1);
      console.log(this.images.length, this.imgsDetail.length);
    },
    addNewProduct(i) {
      const finalProduct = {
        uid: this.user.uid,
        author: this.user.displayName,
        product: i.product,
        price: i.price,
        tags: i.tags,
        imgsUrl: i.imgsUrl,
        desc: i.desc,
      };

      db.collection("products")
        .add(finalProduct)
        .then((docRef) => {
          console.log(
            "%c yeeeeeeeeeeeeeey you're amazing man",
            "background: yellow; color: red"
          );
          console.error("PRODUCT", finalProduct);
        })
        .catch((error) => {
          console.warn("Error adding document: ", error);
        });
    },
    editExistingProduct(i, b) {
      const finalProduct = {
        product: i.product,
        price: i.price,
        tags: i.tags,
        imgsUrl: b || this.imgsUrl,
        desc: i.desc,
      };

      db.collection("products")
        .doc(i.id)
        .update(finalProduct)
        .then((docRef) => {
          console.log(
            "%c yeeeeeeeeeeeeeey you're amazing man",
            "background: yellow; color: red",
            docRef,
            i
          );
          this.dialog = false;
          this.loader = false;
        })
        .catch((error) => {
          console.warn("Error adding document: ", error);
        });
    },
    uploadFiles() {
      this.cancelUpload = false;
      if (this.dialogType === "add") {
        try {
          if (this.imgsDetail.length > 0) {
            this.cancelUpload = false;
            this.snackbarMsg = "please wait while images upload!";
            this.snackbar = true;
            this.isUplodDone = false;
            this.loader = true;
            console.log("%c done", "color: lightgreen");
            console.warn(this.imgsDetail.length);
            const imgsUrls = [];
            try {
              this.imgsDetail.forEach((d) => {
                const storageRef = storage.ref("productImges").child(d.name);
                const uploadTask = storageRef.put(d);
                uploadTask.on(
                  "state_changed",
                  (s) => {
                    this.snackbarMsg = "please wait while images upload!";
                    this.progress = Math.floor(
                      (s.bytesTransferred / s.totalBytes) * 100
                    );
                    if (this.cancelUpload && !this.isUplodDone) {
                      uploadTask.cancel();
                    }
                  },
                  (err) => {
                    this.snackbarMsg = "error! please try again";
                    this.snackbar = true;
                    console.warn(err);
                  },
                  () => {
                    uploadTask.snapshot.ref
                      .getDownloadURL()
                      .then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        imgsUrls.push(downloadURL);
                        // console.log(imgsUrls.length);
                        if (imgsUrls.length == this.images.length) {
                          this.imgsUrl = imgsUrls;
                          this.addNewProduct({
                            id: this.id,
                            product: this.product,
                            price: this.price,
                            tags: this.tags,
                            imgsUrl: this.imgsUrl,
                            images: this.images,
                            desc: this.desc,
                            imgsDetail: this.imgsDetail,
                            productsName: this.productsName,
                            chips: this.chips,
                          });
                          console.log("oooooo", this.imgsUrl);
                          this.loader = false;
                          this.snackbarMsg = "upload succesfully!";
                          this.dialog = false;
                          console.error("upload succesfully");
                          this.isUplodDone = true;
                        }
                      });
                  }
                );
              });
            } catch (error) {
              console.warn(error);
            }
          }
        } catch (error) {
          console.warn(error);
        }
      } else if (this.dialogType === "edit") {
        try {
          console.log("edit");
          this.cancelUpload = false;
          this.snackbarMsg = "please wait while images upload!";
          this.snackbar = true;
          this.isUplodDone = false;
          this.loader = true;
          const imgsUrls = [];
          if (this.images) {
            this.imgsDetail.forEach((d) => {
              const storageRef = storage.ref("productImges").child(d.name);
              const uploadTask = storageRef.put(d);
              uploadTask.on(
                "state_changed",
                (s) => {
                  this.snackbarMsg = "please wait while images upload!";
                  this.progress = Math.floor(
                    (s.bytesTransferred / s.totalBytes) * 100
                  );
                  if (this.cancelUpload && !this.isUplodDone) {
                    uploadTask.cancel();
                  }
                },
                (err) => {
                  this.snackbarMsg = "error! please try again";
                  this.snackbar = true;
                  console.warn(err);
                },
                () => {
                  console.log("%c done", "color: lightgreen");
                  uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then((downloadURL) => {
                      console.log("File available at", downloadURL);
                      imgsUrls.push(downloadURL);
                      // console.log(imgsUrls.length);
                      if (imgsUrls.length == this.images.length) {
                        // let fImgsUrl = [];
                        // imgsUrls.forEach((d) => {
                        //   fImgsUrl.push(d);
                        // });
                        this.$store.dispatch("refreshData");

                        this.editExistingProduct(
                          {
                            id: this.id,

                            product: this.product,
                            price: this.price,
                            tags: this.tags,
                            images: this.images,
                            desc: this.desc,
                            imgsDetail: this.imgsDetail,
                          },
                          imgsUrls
                        );
                        console.log("oooooo", this.imgsUrl);
                        this.loader = false;
                        this.snackbarMsg = "upload succesfully!";
                        this.dialog = false;
                        console.error("upload succesfully");
                        this.isUplodDone = true;
                      }
                    });
                }
              );
            });
          } else {
            this.editExistingProduct({
              id: this.id,

              product: this.product,
              price: this.price,
              tags: this.tags,
              desc: this.desc,
            });
            console.log("||>------> yow <------<||");
          }
        } catch (error) {
          console.warn(error);
        }
      }
    },
  },
  mounted() {
    console.warn("PRODUCT?", this.products);
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>