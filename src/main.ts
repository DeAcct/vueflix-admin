import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import { initializeApp } from "firebase/app";
import App from "./App.vue";
import "./color.scss";
import "./common.scss";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = createApp(App);
const pinia = createPinia();
initializeApp(firebaseConfig);
app.use(pinia).use(router).mount("#app");
