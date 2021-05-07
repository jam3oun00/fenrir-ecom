import Vue from "vue";
export default {
  //
  setUser(state, payload) {
    try {
      state.user = {
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        email: payload.email,
        uid: payload.uid
      };
    } catch (error) {
      console.log(error);
    }
  },

  //
  setData(state, payload) {
    for (let e in payload) {
      Vue.set(state.products, e, {
        author: payload[e].author,
        uid: payload[e].uid,
        id: payload[e].id,
        desc: payload[e].desc,
        product: payload[e].product,
        price: payload[e].price,
        tags: payload[e].tags,
        imgsUrl: payload[e].imgsUrl
      });
    }
  },
  setTages(state, payload) {
    state.tags = payload;
  },

  logOut(state) {
    state.user = null;
  },
  searchProducts(state, payload) {
    let fProdicts = [];
    state.products.forEach(e => {
      if (e.tags.includes(payload) && e.uid == state.user.uid) {
        fProdicts.push(e);
      }
    });
    state.products = fProdicts;
  }
};
