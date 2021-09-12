<template>
  <app-base app-name="슬키 얼마나 강해졌나 볼까요?">
    <app-row>
      <v-col cols="1">
        <v-btn @click="onSave" color="error">저장</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn @click="onReset" color="warning">리셋</v-btn>
      </v-col>      
    </app-row>
    <app-row :title="`ID: ${userInfo.id}`" :subTitle="`마지막 업데이트: ${lastModifiedAt}`" justify="center">      
      <v-col cols="4">
        <v-card outlined tile :loading="loading" elevation="1" height="510">
          <v-card-title><h4>공격력 / 치명타 / 회심</h4></v-card-title>
          <v-card-text class="mt-3">
            <v-row dense> 
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.gold" label="골드공격력(Lv)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.grow" label="성장공격력(수치)" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.relics" label="유물(완력의장갑)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.elli" label="엘리" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.playerOption" label="승급옵션(플레이어)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.crewOption" label="승급옵션(동료)" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.zeek" label="지크" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.grade" label="승급배수" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.classEquip" label="클래스 장착효과" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.attacks.classHold" label="클래스 보유효과" />
              </v-col>
            </v-row>
            <!-- <br /> <br /> -->
            <v-row>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.criticals.gold" label="골드치명타(Lv)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.criticals.current" label="현재 치명타값" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.criticals.relics" label="유물(사냥꾼의눈)" />
              </v-col>
            </v-row>
            <!-- 회심 영역 -->
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="slayerInfo.superCriticals.gold" label="회심" />
              </v-col>
            </v-row> 
          </v-card-text>
        </v-card>
      </v-col> 
      <!-- <v-spacer></v-spacer> -->
      <v-col cols="4">
        <v-card outlined tile :loading="loading" elevation="1" height="510">
          <v-card-title><h4>무기</h4></v-card-title>
          <v-card-text class="mt-3">
            <v-row dense v-for="weapon in config.weapons" :key="weapon.grade">
              <v-col cols="3" v-for="subGrade in weapon.subGrades" :key="subGrade">
                <v-text-field dense v-model.number="slayerInfo.weapon[weapon.grade][subGrade]" :label="`${weapon.name} ${4 - subGrade}등급(Lv)`" />
              </v-col>
            </v-row>
            <v-row dense align="start">
              <v-col cols="3">
                <v-select
                  dense 
                  v-model="slayerInfo.weaponEquip.grade" 
                  :items="config.weapons" 
                  :item-text="item => item.name" 
                  :item-value="item => item.grade"
                />
              </v-col>
              <v-col cols="3">
                <v-select
                  dense 
                  v-model="slayerInfo.weaponEquip.subGrade" 
                  :items="[{i: 0}, {i: 1}, {i: 2}, {i: 3}]" 
                  :item-text="item => `${4 - item.i}등급`"
                  :item-value="item => item.i"
                />                
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="4">
        <slayer-info-area :info="slayerInfo" :loading="loading" /> 
      </v-col>
    </app-row>    
  </app-base>
</template>

<script>
import SlayerInfoArea from './parts/SlayerInfoArea';
import SlayerService from '@/modules/service/slayer';
import { slayerInfo, config } from '@/init-data';
import 'moment/locale/ko'
import moment from 'moment';

export default {
  name: 'MainApp',
  components: {
    SlayerInfoArea
  },
  data: () => {
    return {
      loading: true,
      config,
      slayerInfo
    }
  },
  created() {
    this.loadSlayerInfo();
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    lastModifiedAt() {
      return moment(this.userInfo.lastModifiedAt.toDate()).fromNow()
    }
  },
  methods: {
    async loadSlayerInfo() {
      this.loading = true;
      let res = await SlayerService.getSlayerInfo(this.userInfo.id).get();
      this.slayerInfo = res.data();
      this.loading = false;
    },
    onSave() {
      this.loading = true;
      SlayerService.saveSlayerInfo(this.userInfo.id, this.slayerInfo).then(() => {
        this.loading = false;
      });
    },
    onReset() {
      this.loadSlayerInfo();
    }
  }
}
</script>

<style>

</style>