import Vue from 'vue'
import firebase from '@/modules/firebase'
// import _ from 'lodash'

const firestore = firebase.app.firestore();
const EventBus = new Vue()
const config = {g1: 0, g2: 0, g3: 0, g4: 0, g5: 0, g6: 0};

export default {
  EventBus,
  /**
   * 플레이어 정보 조회
   * @param slayerId 플레이어 ID
   * @returns 플레이어 정보
   */
  getSlayerInfo(slayerId) {
    return firestore.collection(firebase.collections.SLAYER_INFOS).doc(slayerId)
  },
  /**
   * 플레이어 정보 저장
   * @param slayerId 플레이어 ID
   * @param slayerInfo 플레이어 정보
   */
  saveSlayerInfo(slayerId, slayerInfo) {
    // TODO 마지막 수정일시 업데이트 해주기
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
    console.log(applyOption);
    let a = attackInfo.gold * 4 + attackInfo.grow;
    let b = this.getPlayerWeaponTotal(slayerInfo) / 100;
    let c = (attackInfo.relics + attackInfo.elli) / 100 + 1;
    let d = attackInfo.zeek / 100 + 1;
    let e = attackInfo.grade;
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
      holdAttack += weapons[grade].reduce((acc, subGradeIndex) => acc + this.getWeaponHoldAttack(grade, subGradeIndex), 0);
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
    // TODO 무기 장착 공격력 계산식 구현
    return config[grade] + subGrade + level;
  },
  /**
   * 무기 보유 효과 계산
   * @param grade 등급 (일반 ~ 신화)
   * @param subGrade 서브 등급 (0: 4등급 ~ 3: 1등급)
   * @param level 강화 레벨 
   * @returns 
   */
  getWeaponHoldAttack(grade, subGrade) {
    return this.getWeaponEquipAttack(grade, subGrade) / 10 * 3;
  }
}
