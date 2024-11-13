import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';  // For Auth module
import '@react-native-firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyAM-hC2r8SfuEzcc_EIm89FQ2A238joT-A',
  authDomain: 'damakenya-5a8a0.firebaseapp.com',
  projectId: 'damakenya-5a8a0',
  storageBucket: 'damakenya-5a8a0.appspot.com',
  messagingSenderId: '600049694211',
  appId: '1:600049694211:android:e1402bc7778683672b8036',
  webClientId: '600049694211-971tvd7i51467qqupjdgtetge8mlhm9h.apps.googleusercontent.com',
  measurementId: 'G-NZWQ7BKQGH',
};

if  (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export { firebase };
