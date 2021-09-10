<template>
  <app-base app-name="슬키 얼마나 강해졌나 볼까요?">
    <app-row>
      <v-col cols="12">
        <v-btn @click="onSave">저장</v-btn>
      </v-col>
    </app-row>
    <app-row title="정보입력" justify="center">      
      <v-col cols="6">
        <v-card outlined tile :loading="loading" elevation="1" height="510">
          <v-card-title><h4>공격력 / 치명타 / 회심</h4></v-card-title>
          <v-card-text class="mt-3">
            <v-row dense> 
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.gold" label="골드공격력(Lv)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.grow" label="성장공격력(수치)" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.relics" label="유물(완력의장갑)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.elli" label="엘리" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.playerOption" label="승급옵션(플레이어)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.crewOption" label="승급옵션(동료)" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.zeek" label="지크" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.grade" label="승급배수" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.classEquip" label="클래스 장착효과" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.attacks.classHold" label="클래스 보유효과" />
              </v-col>
            </v-row>
            <!-- <br /> <br /> -->
            <v-row>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.criticals.gold" label="골드치명타(Lv)" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.criticals.current" label="현재 치명타값" />
              </v-col>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.criticals.relics" label="유물(사냥꾼의눈)" />
              </v-col>
            </v-row>
            <!-- 회심 영역 -->
            <v-row dense>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.superCriticals.gold" label="회심" />
              </v-col>
            </v-row> 
          </v-card-text>
        </v-card>
      </v-col> 
      <!-- <v-spacer></v-spacer> -->
      <v-col cols="6">
        <v-card outlined tile :loading="loading" elevation="1" height="510">
          <v-card-title><h4>무기</h4></v-card-title>
          <v-card-text class="mt-3">
            <v-row dense v-for="grade in config.weaponGrades" :key="grade.key">
              <v-col cols="3" v-for="(subGrade, index) in config.subGrades" :key="subGrade">
                <v-text-field dense v-model.number="info.weapon.hold[grade.key][index]" :label="`${grade.name} ${4 - index}등급`" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-text-field dense v-model.number="info.weapon.equip" label="장착무기효과" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </app-row>
    <!-- <br />
    <v-divider />
    <br /> -->
    <app-row title="결과">
      <v-col cols="12">
        <v-card outlined tile :loading="loading" elevation="1">
          <v-card-title><h4>성적표</h4></v-card-title>
          <v-card-text class="mt-3">
            공격력: {{ totalAttack }} ({{ totalAttack / 10000000000000000 }}경)
          </v-card-text>
        </v-card>
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
      loading: true,
      config: {
        weaponGrades: [
          { key: 'g1', name: '일반' }, 
          { key: 'g2', name: '고급' }, 
          { key: 'g3', name: '레어' }, 
          { key: 'g4', name: '영웅' }, 
          { key: 'g5', name: '전설' }, 
          { key: 'g6', name: '신화' }, 
        ],
        subGrades: [1, 2, 3, 4]
      },
      info: {
        attacks: {
          gold: 0,
          grow: 0,
          relics: 0,
          elli: 0,
          playerOption: 0,
          crewOption: 0,
          zeek: 0,
          grade: 0,
          classEquip: 0,
          classHold: 0
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
            g1: [0, 0, 0, 0],
            g2: [0, 0, 0, 0],
            g3: [0, 0, 0, 0],
            g4: [0, 0, 0, 0],
            g5: [0, 0, 0, 0],
            g6: [0, 0, 0, 0]
          }
        }
      }
    }
  },
  async created() {
    let res = await SlayerService.getSlayerInfo('gusrb0808').get();
    this.info = res.data();
    this.loading = false;
  },
  computed: {
    totalAttack() {
      let attackInfo = this.info.attacks;
      let weaponInfo = this.info.weapon;
      let a = attackInfo.gold * 4 + attackInfo.grow;
      let b = (weaponInfo.equip + this.weaponHoldTotal) / 100;
      let c = (attackInfo.relics + attackInfo.elli) / 100 + 1;
      let d = attackInfo.zeek / 100 + 1;
      let e = attackInfo.grade;
      let f = (attackInfo.classEquip + attackInfo.classHold) / 100;
      return a * b * c * d * e * f;
    },
    // totalAttackAll() {

    // },
    weaponHoldTotal() {
      let total = 0;
      for (let grade in this.info.weapon.hold) {
        total += this.info.weapon.hold[grade].reduce((acc, value) => acc + value, 0);
      }
      return total
    }
  },
  methods: {
    onSave() {
      alert('자동저장구현하면빼기');
    }
  }
}
</script>

<style>

</style>