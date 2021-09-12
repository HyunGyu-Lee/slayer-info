import Vue from 'vue'
import firebaseModule from '@/modules/firebase'
import store from '../store';
//import store from '@/modules/store';
// import _ from 'lodash'

const firestore = firebaseModule.app.firestore();
const EventBus = new Vue()

export default {
  EventBus,
  /**
   * 플레이어 정보 조회
   * @param slayerId 플레이어 ID
   * @returns 플레이어 정보
   */
  getSlayerInfo(slayerId) {
    return firestore.collection(firebaseModule.collections.SLAYER_INFOS).doc(slayerId)
  },
  /**
   * 플레이어 정보 저장
   * @param slayerId 플레이어 ID
   * @param slayerInfo 플레이어 정보
   */
  async saveSlayerInfo(slayerId, slayerInfo) {
    let now = firebaseModule.firebase.firestore.Timestamp.fromDate(new Date());
    await this.getSlayerInfo(slayerId).set(Object.assign({}, slayerInfo));
    await firestore
      .collection(firebaseModule.collections.SITE_USERS)
      .doc(slayerId)
      .update({lastModifiedAt: now});
    store.dispatch('updateLastModifiedAt', now);
    return this.getSlayerInfo(slayerId).set(Object.assign({}, slayerInfo));
  },
  /**
   * 플레이어 공격력 계산
   * @param slayerInfo 플레이어 정보
   * @param applyOption 플레이어 + 동료 승급 옵션 적용 여부
   * @returns 플레이어 공격력
   */
  getPlayerAttack(slayerInfo, applyOption) {
    let attackInfo = slayerInfo.attacks;

    // 골드 공격력 + 성장 공격력
    let a = attackInfo.gold * 4 + attackInfo.grow;

    // 무기 장착 + 보유 효과
    let b = this.getPlayerWeaponTotal(slayerInfo) / 100;

    // 유물 + 엘리 + 승급옵션 + 동료 승급옵션
    let c1 = attackInfo.relics + attackInfo.elli;
    let c2 = attackInfo.playerOption + attackInfo.crewOption;
    let c = (applyOption ? c1 + c2 : c1) / 100 + 1;

    // 지크
    let d = attackInfo.zeek / 100 + 1;

    // 승급배수
    let e = attackInfo.grade;

    // 클래시 장착 + 보유 효과
    let f = (attackInfo.classEquip + attackInfo.classHold) / 100 + 1;
    return a * b * c * d * e * f;
  },
  /**
   * 플레이어 무기 공격력 계산
   * @param weaponInfo 무기 정보
   */
  getPlayerWeaponTotal(slayerInfo) {
    let weapons = slayerInfo.weapon;
    let equipInfo = slayerInfo.weaponEquip;
    let equipAttack = this.getWeaponEquipAttack(equipInfo.grade, equipInfo.subGrade, weapons[equipInfo.grade][equipInfo.subGrade]);
    let holdAttack = 0;
    for (let grade in weapons) {
      holdAttack += weapons[grade].reduce((acc, level, index) => acc + this.getWeaponHoldAttack(grade, level, index), 0)
    }
    return equipAttack + holdAttack;
  },
  /**
   * 무기 장착 효과 계산
   * @param grade 등급 (일반 ~ 신화)
   * @param subGrade 서브 등급 (0: 4등급 ~ 3: 1등급)
   * @param level 강화 레벨
   * @returns 
   */
  getWeaponEquipAttack(grade, subGrade, level) {
    // TODO 현재 가라데이터로 구현되있음 / 무기 장착 공격력 계산식 구현
    const config = {g1: 1, g2: 2, g3: 3, g4: 4, g5: 5, g6: 10};
    return config[grade] + subGrade + level;
  },
  /**
   * 무기 보유 효과 계산
   * @param grade 등급 (일반 ~ 신화)
   * @param subGrade 서브 등급 (0: 4등급 ~ 3: 1등급)
   * @param level 강화 레벨 
   * @returns 
   */
  getWeaponHoldAttack(grade, subGrade, level) {
    return this.getWeaponEquipAttack(grade, subGrade, level) / 10 * 3;
  }
}
