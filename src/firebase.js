import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  where,
} from 'firebase/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyAkTBrLleVMv8BGvDTvSwqNVQd0TM8u0To",
  authDomain: "expense-tracker-1a8b1.firebaseapp.com",
  projectId: "expense-tracker-1a8b1",
  storageBucket: "expense-tracker-1a8b1.appspot.com",
  messagingSenderId: "1094756476305",
  appId: "1:1094756476305:web:94940ccf7a660cdc2ae630",
  measurementId: "G-FJ4JCN1H7K"
};

let app = initializeApp(firebaseConfig);
export let auth = getAuth(app);
export let db = getFirestore(app);
console.log(db);


export async function signIn() {
  let provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export function signOutUser() {
  signOut(auth);
};

export function getProfilePicUrl() {
  let profilePicUrl = auth.currentUser.photoURL || '/images/profile_placeholder.png';
  return addSizeToGoogleProfilePic(profilePicUrl);
};

function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
};

export async function uploadTransaction(user, id, bookId, moneyFlow, amount, name, details) {
  try {
    await addDoc(collection(getFirestore(), 'transactions'), {
      'uid': user.uid,
      'id': id,
      'time': serverTimestamp(),
      'bookId': bookId,
      'moneyFlow': moneyFlow,
      'amount': amount,
      'name': name,
      'details': details
    });
  }
  catch(error) {
    console.error('Error writing new book to Firebase Database', error);
  }
};

export async function uploadBook(user, id, name) {
  try {
    await addDoc(collection(db, 'books'), {
      'uid': user.uid,
      'id': id,
      'time': serverTimestamp(),
      'name': name
    });
  }
  catch(error) {
    console.error('Error writing new book to Firebase Database', error);
  }
};

export function loadBooks() {
  let booksQuery = query(collection(db, 'books'), where("uid", "==", auth.currentUser.uid));

  // Start listening to the query.
  onSnapshot(booksQuery, function(snapshot) {
    console.log(snapshot);
  });
}