import firebase from '@/modules/firebase'

const firestore = firebase.app.firestore();

const ADDITIONAL_CARD_BOUND_WAVE = 50
const ADDITIONAL_CARD_PER_WAVE = 3


export default {
  getCollection() {
    return firestore.collection(firebase.collections.RANDOM_DICE_APP)
  },
  addPlayHistory(playHistory) {
    return this.getCollection().add(playHistory);
  },
  getPlayHistories() {
    return this.getCollection().orderBy('registDate').get();
  },
  getPlayHistoriesDummy() {
    return [
      {
        registDate: new Date(),
        playMinutes: 73,
        lastWave: 136
      },
      {
        registDate: new Date(),
        playMinutes: 60,
        lastWave: 50
      },
      {
        registDate: new Date(),
        playMinutes: 60,
        lastWave: 51
      }
    ];
  },
  calculateGainedCard(wave) {
    if (wave <= ADDITIONAL_CARD_BOUND_WAVE) {
      return wave
    } else {
      let remain = wave - ADDITIONAL_CARD_BOUND_WAVE
      return ADDITIONAL_CARD_BOUND_WAVE + remain * ADDITIONAL_CARD_PER_WAVE
    }
  }
}