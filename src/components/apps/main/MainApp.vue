<template>
  <app-base app-name="슬키 얼마나 강해졌나 볼까요?">
    <app-row>
      Hi
    </app-row>
  </app-base>
</template>

<script>
import SlayerService from '@/modules/service/slayer'

export default {
  name: 'MainApp',
  async created() {
    let res = await SlayerService.getSlayerInfo('gusrb0808').get();
    console.log(res.data());
  }
}
</script>

<style>

</style>