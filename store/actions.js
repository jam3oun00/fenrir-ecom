import { fb, db, auth, storage } from "@/plugins/firebase";
export default {
  //
  // actions
  signUp({ commit }, payload) {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(u => {
        this.$router.push("/admin");
      })
      .catch(err => console.warn(err));
  },
  ///////////////
  withGoogle() {
    const provider = new fb.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(u => {
        this.$router.push(`/admin/${this.$store.user.uid}`);
      })
      .catch(function(e) {});
  },
  ///////////////
  withFacebook() {
    const provider = new fb.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(u => {
        this.$router.push(`/admin/${this.$store.user.uid}`);
      })
      .catch(function(error) {});
  },
  /////////////////
  refreshData({ commit }) {
    db.collection("products")
      .get()
      .then(d => {
        let products = [];
        d.forEach(doc => {
          products.push({ id: doc.id, ...doc.data() });
        });
        commit("setData", products);
      });
  },
  logOut({ commit }) {
    auth.signOut().then(u => {
      commit("logOut");
      this.$router.push("/");
    });
  },
  getData({ commit }) {
    db.collection("products")
      .get()
      .then(data => {
        commit("setProduct", data);
      });
  },
  deleteProduct({ commit }, payload) {
    // ----- DELETE IMAGES OF THAT EXACT PRODUCT FROM FIREBASE STORAGE -------
    const baseUrl =
      "https://firebasestorage.googleapis.com/v0/b/ecom-1-4de2c.appspot.com/o/";
    /////////////////
    payload.imgsUrl.forEach(m => {
      let imagePath = m.replace(baseUrl, "");
      const indexOfEndPath = imagePath.indexOf("?");
      imagePath = imagePath.substring(0, indexOfEndPath);
      imagePath = imagePath.replace("%2F", "/");
      storage
        .ref()
        .child(imagePath)
        .delete()
        .then(() => {
          // File deleted successfully
          db.collection("products")
            .doc(payload.id)
            .delete()
            .then(d => {});
        })
        .catch(e => {
          console.log(e);
          db.collection("products")
            .doc(payload.id)
            .delete()
            .then(d => {});
        });
    });
  }

  //
};
