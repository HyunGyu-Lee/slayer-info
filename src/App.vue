<template>
  <v-app>
    <v-app-bar app dark color="primary" clipped-left>      
      <h3>슬키 정보 계산기</h3>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/HyunGyu-Lee" target="_blank" text>
        <span class="mr-2">contact</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height pl-8 pr-8 pb-8" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-bottom-navigation v-model="bottomNav" app background-color="primary" grow dark shift fixed>
      <v-btn to="/main" height="100%">
        <span>Main</span><v-icon>mdi-newspaper-variant-multiple</v-icon>
      </v-btn>
      <v-btn to="/settings" height="100%">
        <span>Settings</span><v-icon>mdi-cogs</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- Global Notification Message -->
    <v-snackbar v-model="alerts.visible" top multi-line :timeout="alerts.timeout">
      {{alerts.message}}
      <v-btn dark text @click="alerts.visible = false">Close</v-btn>
    </v-snackbar>

    <!-- Global Loading Overay -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    bottomNav: 0,
    alerts: {
      message: '',
      visible: false,
      timeout: 2000
    },
    loading: false
  }),
  created() {
    // Listen show alert request
    this.activeToastMessage()

    // Listen show loading request
    this.activeLoadingBar()
  },
  methods: {
    activeToastMessage() {
      this.$app.EventBus.$on('toast', (message) => {
        this.alerts.visible = false
        this.alerts.message = message
        this.alerts.visible = true
      })
    },
    activeLoadingBar() {
      this.$app.EventBus.$on('setLoadingState', (loadingState) => {
        this.loading = loadingState
      });
    }
  }
};
</script>
