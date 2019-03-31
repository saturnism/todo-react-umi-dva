import firebase from 'firebase/app';
import 'firebase/firestore';
import config from '@/credentials/firebase';

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
