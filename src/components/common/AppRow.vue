<template>
  <v-row :align="align" :justify="justify">
    <v-col sm="12" md="12" xs="1">
      <slot />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AppRow',
  props: {
    align: {
      type: String,
      required: false,
      default: 'center'
    },
    justify: {
      type: String,
      required: false,
      default: 'start'
    },
  }
}
</script>

<style>

</style>