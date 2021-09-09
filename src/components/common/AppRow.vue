<template>
  <div>
    <v-row :align="align" :justify="justify">
      <slot />
    </v-row>
    <!-- <v-divider /> -->
  </div>  
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