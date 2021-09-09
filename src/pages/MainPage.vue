<template>
  <v-row align="start" class="fill-height">
    <main-app />
  </v-row>
</template>

<script>
import MainApp from '@/components/apps/main/MainApp';

export default {
  name: 'MainPage',
  components: {
    MainApp,
  }
};
</script>
