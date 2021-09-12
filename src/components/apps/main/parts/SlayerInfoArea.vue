<template>
  <v-card outlined tile :loading="loading" elevation="1" height="510" style="overflow-y: scroll;">
    <v-card-title>
      <h4>성적표</h4>
    </v-card-title>
    <v-card-text class="mt-3">
      <slayer-info-row name="공격력" :value="playerAttack" />
      <hr>
      <slayer-info-row name="공격력 (플레이어 + 동료 승급옵션 적용)" :value="playerAttackAll" />
      <hr>
      <slayer-info-row name="치명타" :value="playerCritical" />
      <hr>
      <slayer-info-row name="치명타 (플레이어 + 동료 승급옵션 적용)" :value="playerCriticalAll" />
      <hr>
      <slayer-info-row name="회심의 일격" :value="playerSuperCritical" />
      <hr>
      <slayer-info-row name="회심의 일격 (플레이어 + 동료 승급옵션 적용)" :value="playerSuperCriticalAll" />
      <hr>     
    </v-card-text>
  </v-card>
</template>

<script>
import SlayerService from '@/modules/service/slayer';
import SlayerInfoRow from './SlayerInfoRow';

export default {
  components: { SlayerInfoRow },
  name: 'SlayerInfoArea',
  props: {
    info: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true      
    }
  },
  computed: {
    playerAttack() {      
      return SlayerService.getPlayerAttack(this.info, false);
    },
    playerAttackAll() {
      return SlayerService.getPlayerAttack(this.info, true);
    },
    playerCritical() {
      return this.playerAttack * this.info.criticals.current / 100
    },
    playerCriticalAll() {
      return this.playerAttackAll * this.info.criticals.current / 100
    },
    playerSuperCritical() {
      return this.playerCritical * this.info.superCriticals.gold / 100
    },
    playerSuperCriticalAll() {
      return this.playerCriticalAll * this.info.superCriticals.gold / 100
    },
  }  
}
</script>

<style>

</style>