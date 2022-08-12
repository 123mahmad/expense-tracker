import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
  serverTimestamp,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
  writeBatch,
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
    await setDoc(doc(db, 'transactions', id), {
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
    console.error('Error writing new transaction to Firebase Database', error);
  }
};

export async function uploadBook(user, id, name) {
  try {
    await setDoc(doc(db, 'books', id), {
      'uid': user.uid,
      'id': id,
      'time': serverTimestamp(),
      'timeCreated': serverTimestamp(),
      'name': name
    });
  }
  catch(error) {
    console.error('Error writing new book to Firebase Database', error);
  }
};

export async function updateBook(id, name) {
  try {
    await setDoc(doc(db, 'books', id), {
      'time': serverTimestamp(),
      'name': name
    },{merge: true});
  }
  catch(error) {
    console.error('Error updating book in Firebase Database', error);
  }
};

export async function deleteBook(id) {
  try {
    await deleteDoc(doc(db, 'books', id));
    await deleteSubTransactions(id);
  }
  catch(error) {
    console.error('Error deleting book from Firebase Database', error);
  }
};

async function deleteSubTransactions(bookId) {
  try {
    let q = query(collection(db, 'transactions'), where('bookId','==',bookId))
    let snap = await getDocs(q);
    let batch = writeBatch(db);
    snap.forEach((transaction) => {
      batch.delete(doc(db, 'transactions', transaction.id));
    });
    await batch.commit();
  }
  catch(error) {
    console.error('Error deleting subsequent transactions from Firebase Database', error);
  }
};

export async function deleteTransaction(id) {
  try {
    await deleteDoc(doc(db, 'transactions', id));
  }
  catch(error) {
    console.error('Error deleting book from Firebase Database', error);
  }
};