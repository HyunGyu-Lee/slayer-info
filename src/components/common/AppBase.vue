<template>
  <v-container class="fill-witdh" fluid>
    <h1>{{ appName }}</h1>
    <slot />
  </v-container>  
</template>

<script>
export default {
  props: {
    appName: {
      type: String,
      required: true
    },
  }
}
</script>

<style>

</style>