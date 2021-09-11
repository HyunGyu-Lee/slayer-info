import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

const firebaseConfig = {
  apiKey: "AIzaSyCeVlIa4NslomK2JmbIzZnESIjGJK-YgAI",
  authDomain: "slayer-info-backend.firebaseapp.com",
  projectId: "slayer-info-backend",
  storageBucket: "slayer-info-backend.appspot.com",
  messagingSenderId: "506647871488",
  appId: "1:506647871488:web:497b76bc1f5fd7bc6e58e5",
  measurementId: "G-9GHQFBBGND"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default {
  app,
  firebase,
  collections: {
    SITE_USERS: 'site-users',
    SLAYER_INFOS: 'slayer-infos',
    HUNTING_INFOS: 'hunting-infos'
  }
}
