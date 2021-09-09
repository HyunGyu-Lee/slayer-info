<template>
  <v-container class="fill-witdh">
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