import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import config from '@/credentials/firebase';

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
