import * as firebase from "firebase/app";
import "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDCZt8_LZdiQu3wKmH-UF0r3VkTflHaIGU",
//   authDomain: "testchat-36274.firebaseapp.com",
//   databaseURL: "https://testchat-36274.firebaseio.com",
//   projectId: "testchat-36274",
//   storageBucket: "testchat-36274.appspot.com",
//   messagingSenderId: "692796714650",
//   appId: "1:692796714650:web:61f9a22a923bc4d27cf923",
//   measurementId: "G-4M576BBJXX"
// };
// firebase.initializeApp(firebaseConfig);

// const db = firebase.database();

const config = {
  apiKey: "AIzaSyDCZt8_LZdiQu3wKmH-UF0r3VkTflHaIGU",
  authDomain: "testchat-36274.firebaseapp.com",
  databaseURL: "https://testchat-36274.firebaseio.com",
  projectId: "testchat-36274",
  storageBucket: "testchat-36274.appspot.com",
  messagingSenderId: "692796714650",
  appId: "1:692796714650:web:61f9a22a923bc4d27cf923",
  measurementId: "G-4M576BBJXX"
};
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.database();

export { db };
