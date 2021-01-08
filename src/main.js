// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Store from './store'
import firebase from 'firebase'
import BuyModalComponent from '@/components/shared/BuyModal'
import colors from 'vuetify/lib/util/colors'

Vue.config.productionTip = false

Vue.use(Vuetify)
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      }
    }
  }
})
Vue.component('buy-modal', BuyModalComponent) 

new Vue({
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi'
    }
  }),
  el: '#app',
  router,
  store: Store,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAeVAwfkHlzLCx6AnFuk9L_OdKdTGjROnc",
      authDomain: "born-vue-js.firebaseapp.com",
      databaseURL: "https://born-vue-js-default-rtdb.firebaseio.com",
      projectId: "born-vue-js",
      storageBucket: "born-vue-js.appspot.com",
      messagingSenderId: "1064676987445",
      appId: "1:1064676987445:web:798204ec718e84bb4a577c"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.$store.dispatch('afterLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
