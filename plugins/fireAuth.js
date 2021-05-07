import { auth } from "@/plugins/firebase";

export default ({ store, redirect, route }) => {
  const blockedRoute = /\/admin\/*/g;
  auth.onAuthStateChanged(user => {
    if (user) {
      store.commit("setUser", user);

      // let xxx = [];
      // for (w in store.state.products) {
      //   console.error(w);
      // }
      // observal object
      // let xxx = store.state.products.find(s => {
      //   return s.uid == store.state.user.uid;
      // });
      // console.error(xxx);
      // console.error(store.state.products.find(m => m.price == 50));
    }
    if (!user && route.path.match(blockedRoute)) {
      redirect("/");
    }
  });
};
