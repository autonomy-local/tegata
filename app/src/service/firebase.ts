import { initializeApp } from 'firebase/app';

// replace with your own firebase config object
const devfirebaseConfig = {
  apiKey: "AIzaSyAFUVOZFSMY3ry4-OKvXrqrb-MnhqPaK1A",
  authDomain: "autonomy-tegata-dev.firebaseapp.com",
  projectId: "autonomy-tegata-dev",
  storageBucket: "autonomy-tegata-dev.appspot.com",
  messagingSenderId: "860829179517",
  appId: "1:860829179517:web:0c3947200d448056f85b14",
  measurementId: "G-813EBFYV1Q"
}

export const firebaseApp = initializeApp(devfirebaseConfig);