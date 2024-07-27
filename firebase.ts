import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB2iyw48-KSNYUAWIekswtz19VLYGrQyBM",
	authDomain: "notation-8358c.firebaseapp.com",
	projectId: "notation-8358c",
	storageBucket: "notation-8358c.appspot.com",
	messagingSenderId: "578164639183",
	appId: "1:578164639183:web:b45119774fdc799a9cbeba",
};

const app = getApps.length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)

export { db };