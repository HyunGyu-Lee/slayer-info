<template>
  <div>
    <br />
    <h2>{{ title }}</h2><small> {{ subTitle }}</small>
    <br />
    <v-row :align="align" :justify="justify">
      <slot />
    </v-row>
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
    title: {
      type: String,
      required: false,
      default: ''
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style>

</style>