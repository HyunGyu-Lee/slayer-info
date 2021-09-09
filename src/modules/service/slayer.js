import Vue from 'vue'
import firebase from '@/modules/firebase'
// import _ from 'lodash'

const firestore = firebase.app.firestore();
const EventBus = new Vue()

export default {
  EventBus,
  getSlayerInfo(slayerId) {
    return firestore.collection(firebase.collections.SLAYER_INFOS).doc(slayerId)
  },
  // addTodo(todo) {
  //   return this.getCollection().add(todo);
  // },
  // getTodos() {
  //   return this.getCollection().orderBy('toFinishAt').get();
  // },
  // updateTodo(todoId, payload) {
  //   return this.getCollection().doc(todoId).update(payload);
  // },
  // deleteTodo(todoId) {
  //   return this.getCollection().doc(todoId).delete();
  // },
  // getSummary() {
  //   return this.getCollection().get().then((snapshot) => {
  //     let list = _.map(snapshot.docs, (doc) => doc.data());
  //     return {
  //       statusCounts: _.countBy(list, 'status')
  //     }
  //   })
  // }
}
