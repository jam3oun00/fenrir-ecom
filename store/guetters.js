export default {
  //
  //   guetters
  user(state) {
    state.user;
  },

  //

  getUserProducts: state => {
    return state.products.find(m => {
      return m.uid === state.user.uid;
    });
  }
};
