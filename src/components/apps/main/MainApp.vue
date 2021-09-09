<template>
  <app-base app-name="슬키 얼마나 강해졌나 볼까요?">
    <br />
    <h2>정보입력</h2>
    <br />
    <app-row align="start" justify="center">
      <v-col cols="6">
        <h4>공격력 / 치명타 / 회심</h4>
        <v-text-field v-model="info.attacks.gold" label="골드공격력(Lv)" clearable></v-text-field>
        <v-text-field v-model="info.attacks.grow" label="성장공격력(수치)" clearable></v-text-field>    
        </v-col>  
      <v-col cols="6">
        <h4>무기</h4>
        무기무기무기무기무기ㄴ
      </v-col>
    </app-row>
    <br />
    <v-divider />
    <br />
    <h2>결과</h2>
    <br />
    <app-row>
      <v-col cols="12">
        결과결과결과결과
      </v-col>
    </app-row>
  </app-base>
</template>

<script>
import SlayerService from '@/modules/service/slayer'
import AppRow from '../../common/AppRow.vue';

export default {
  components: { AppRow },
  name: 'MainApp',
  data: () => {
    return {
      info: {
        attacks: {
          gold: 0,
          grow: 0
        },
        criticals: {
          gold: 0,
          relics: 0,
          current: 0
        },
        superCriticals: {
          gold: 0
        },
        weapon: {
          equip: 0,
          hold: {
            1: [0, 0, 0, 0],
            2: [0, 0, 0, 0],
            3: [0, 0, 0, 0],
            4: [0, 0, 0, 0],
            5: [0, 0, 0, 0],
            6: [0, 0, 0, 0]
          }
        }
      }
    }
  },
  async created() {
    let res = await SlayerService.getSlayerInfo('gusrb0808').get();
    this.info = res.data();
    console.log(res.data());
  }
}
</script>

<style>

</style>