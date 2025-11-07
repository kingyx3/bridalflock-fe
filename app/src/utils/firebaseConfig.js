import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getFunctions } from "firebase/functions";
import { envVars } from './envConfig';

const firebaseConfig = {
  apiKey: envVars.REACT_APP_FB_apiKey,
  authDomain: envVars.REACT_APP_FB_authDomain,
  databaseURL: envVars.REACT_APP_FB_databaseURL,
  projectId: envVars.REACT_APP_FB_projectId,
  storageBucket: envVars.REACT_APP_FB_storageBucket,
  messagingSenderId: envVars.REACT_APP_FB_messagingSenderId,
  appId: envVars.REACT_APP_FB_appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, "asia-southeast1");

export { app, auth, db, database, storage, functions };
