import Vue from 'vue';
import firebaseModule from '@/modules/firebase';
import sha256 from 'crypto-js/sha256';
import { slayerInfo, huntingInfo } from '@/init-data';


const firestore = firebaseModule.app.firestore();
const EventBus = new Vue();

export default {
  EventBus,
  async login(userId, password) {    
    let userInfo = await firestore.collection(firebaseModule.collections.SITE_USERS).doc(userId).get();
    if (!userInfo.exists) {
      return { success: false, message: `사용자 '${userId}'가 존재하지 않습니다.`  };
    } 
    if (userInfo.data().password != sha256(password).toString()) {
      return { success: false, message: '비밀번호가 다릅니다.' };
    }
    return { success: true, userInfo: userInfo.data() };
  },
  async register(userId, password) {
    let userInfo = await firestore.collection(firebaseModule.collections.SITE_USERS).doc(userId);
    if (userInfo.exists) {
      return { success: false, message: `이미 사용중인 ID 입니다.` };      
    }    

    await userInfo.set({ 
      id: userId,
      password: sha256(password).toString(), 
      lastModifiedAt: firebaseModule.firebase.firestore.Timestamp.fromDate(new Date()) 
    });
    await firestore.collection(firebaseModule.collections.SLAYER_INFOS).doc(userId).set(Object.assign({}, slayerInfo));
    await firestore.collection(firebaseModule.collections.HUNTING_INFOS).doc(userId).set(Object.assign({}, huntingInfo));
    return { success: true };
  }
}
