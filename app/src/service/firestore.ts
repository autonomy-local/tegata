import { firebaseApp } from './firebase';
import { CollectionReference, DocumentData, Firestore,  query, Query, addDoc, collection, collectionGroup, connectFirestoreEmulator, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc, getDocs, where } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

/*
firebaseはcollectionとdocumentの概念を持っている
https://firebase.google.com/docs/reference/js/firestore_
*/

// useEmulatorを使うと、ローカルで動かすことができる
export function useEmulator(host: string, port: number, options?: {mockUserToken?: string}) {
  try {
    connectFirestoreEmulator(db, host, port, options);
  } catch (e) {
    // this method is used in the development environment, so it is not necessary to handle the error
    console.error(e);
  }
}

function getCollection(collectionName: string): CollectionReference<DocumentData, DocumentData> {
  return collection(db, collectionName);
}

function getAllDocuments(collectionId: string):Query<DocumentData, DocumentData> {
  return collectionGroup(db, collectionId);
 }

export function getAllDocumentsWithCollectionName(collectionName: string):Query<DocumentData, DocumentData> {
  const collectionRef = getCollection(collectionName);
  return getAllDocuments(collectionRef.id);
 }

// 新しいドキュメントを任意のIDで追加する
export async function addNewDocument(collectionName: string, data: DocumentData):Promise<null | Error> {
  const collectionRef = getCollection(collectionName);
  return setDoc(doc(collectionRef, data.id), data).then(() => {
    return null;
  }).catch((error) => {
    return new Error('Error adding document: ' + error);
  });
}

// autoIdを使って新しいドキュメントを追加する
export async function addNewDocumentWithAutoId(collectionName: string, data: DocumentData):Promise<null | Error> {
  const collectionRef = getCollection(collectionName);
  return addDoc(collectionRef, data).then(() => {
    return null;
  }).catch((error) => {
    return new Error('Error adding document: ' + error);
  });
}

export async function getDocumentById(collectionName: string, documentId: string):Promise<DocumentData | null> {
  const documentRef = doc(db, collectionName, documentId);
  const documentSnapshot = await getDoc(documentRef);
  if (documentSnapshot.exists()) {
    return documentSnapshot.data();
  } else {
    return null;
  }
}

export async function updateDocument(collectionName: string, documentId: string, data: DocumentData):Promise<null | Error> {
  const documentRef = doc(db, collectionName, documentId);
  return updateDoc(documentRef, data).then(() => {
    return null;
  }).catch((error) => {
    return new Error('Error updating document: ' + error);
  });
}

export async function deleteDocument(collectionName: string, documentId: string):Promise<null | Error> {
  const documentRef = doc(db, collectionName, documentId);
  return deleteDoc(documentRef).then(() => {
    return null;
  }).catch((error) => {
    return new Error('Error deleting document: ' + error);
  });
}

export type QueryObj = {
  field: string,
  operator: "==",
  value: unknown,
}

export async function getDocumentsWithQuery(collectionName: string, queryObj: QueryObj):Promise<DocumentData[] | Error> {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, where(queryObj.field, queryObj.operator, queryObj.value));
  try {
    const querySnapshot = await getDocs(q);
    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        documents.push(doc.data());
      }
    });
    return documents;
  }
  catch (error) {
    return new Error('Error getting documents: ' + error);
  }
}
