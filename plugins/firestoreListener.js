import { fb, db } from "@/plugins/firebase";

export default ({ store }) => {
  db.collection("products")
    .get()
    .then(d => {
      let products = [];
      d.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });
      store.commit("setData", products);
    });

  // setUserProducts
  // |-
  // |-->
  // |---->          <-|->
  // |------- >>   <<--|-->>
  // |---->          <-|->
  // |-->
  // |-
  db.collection("products").onSnapshot(snapshot => {
    db.collection("products")
      .get()
      .then(d => {
        let products = [];
        d.forEach(doc => {
          products.push({ id: doc.id, ...doc.data() });
        });
        store.commit("setData", products);
      });
  });
  db.collection("tags").onSnapshot(snapshot => {
    let tags = [];
    snapshot.forEach(doc => {
      tags.push(doc.data());
    });
    store.commit("setTages", tags[0].tags);
  });
};
