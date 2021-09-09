import Vue from 'vue'
import firebase from '@/modules/firebase'

const firestore = firebase.app.firestore();
const EventBus = new Vue()

export default {
  EventBus,
  getCollection() {
    return firestore.collection(firebase.collections.HEALTH_APP)
  },
  addHealthData(healthData) {
    let collection = this.getCollection();
    return new Promise((resolve, reject) => {
      collection.where('registDate', '==', healthData['registDate']).get()
      .then((e) => {
        if (e.docs.length) {
          collection.doc(e.docs[0].id).update(healthData)
          resolve({mode: 'update'})
        } else {
          collection.add(healthData)
          resolve({mode: 'create'})          
        }
      }).catch(e => reject(e))
    });
  },
  getHealthDatas() {
    return this.getCollection().orderBy('registDate').get();
  },
  updateHealthData(id, payload) {
    return this.getCollection().doc(id).update(payload);
  }
}
