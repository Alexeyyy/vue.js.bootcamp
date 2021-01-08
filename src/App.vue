<template>
  <v-app>
    <v-navigation-drawer 
      app 
      temporary
      v-model="drawer"  
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          link
          v-for="link of links"
          :key="link.url"
          :to="link.url"
        >
          <v-list-item-icon>
            <v-icon left>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="isUserLoggedIn"
          link
          @click="onLogout()"
        >
          <v-list-item-icon>
            <v-icon left>
              mdi-logout
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
      <v-app-bar dark color="primary">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link :to="'/'" tag="span" class="pointer">
            Application
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-btn 
            plain
            v-for="link in links"
            :key="link.url"
            :to="link.url"
          >
            <v-icon left>
              {{ link.icon }}
            </v-icon>
            {{ link.title }}
          </v-btn>
          <v-btn
            v-if="isUserLoggedIn"
            plain
            @click="onLogout()"
          >
            <v-icon left>
              mdi-logout
            </v-icon>
            Log Out
          </v-btn>
        </div>
      </v-app-bar>
    </div>

    <v-main>
      <router-view></router-view>
    </v-main>

    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        :value="true"
      >
        {{ error }}
        <template>
          <v-btn
            dark
            @click.native="closeError()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      console.log(this)
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark', url: '/orders' },
          { title: 'New ad', icon: 'mdi-bookmark-plus', url: '/new' },
          { title: 'My adds', icon: 'mdi-view-list', url: '/list' },
        ]
      }

      return [
        { title: 'Login', icon: 'mdi-lock', url: '/signin' },
        { title: 'Sign up', icon: 'mdi-account', url: '/signup' },
      ]
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
