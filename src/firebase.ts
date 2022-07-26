import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAQm_RStK5Sgeuk4pMrIEsxMEkH9X_p-Rg",
	authDomain: "anasalhamdan.firebaseapp.com",
	projectId: "anasalhamdan",
	storageBucket: "anasalhamdan.appspot.com",
	messagingSenderId: "589461924086",
	appId: "1:589461924086:web:77e51b4ea4818a775124d7",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
