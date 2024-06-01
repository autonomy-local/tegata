import { firebaseApp } from "./firebase";
import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	setDoc,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
} from "firebase/firestore";
import type {
	CollectionReference,
	DocumentData,
	Firestore,
} from "firebase/firestore";

export const firestore: Firestore = getFirestore(firebaseApp);

/*
firebaseはcollectionとdocumentの概念を持っている
https://firebase.google.com/docs/reference/js/firestore_
*/

function getCollection(
	db: Firestore,
	collectionName: string,
): CollectionReference<DocumentData, DocumentData> {
	return collection(db, collectionName);
}

export async function getAllDocumentsWithCollectionName(
	db: Firestore,
	collectionName: string,
): Promise<DocumentData[] | Error> {
	const collectionRef = getCollection(db, collectionName);
	try {
		const documents: DocumentData[] = [];
		const querySnapshot = await getDocs(collectionRef);
		for (const doc of querySnapshot.docs) {
			documents.push(doc.data());
		}
		return documents;
	} catch (error) {
		return new Error(`Error getting documents: ${error}`);
	}
}

// 新しいドキュメントを任意のIDで追加する
export async function addNewDocument(
	db: Firestore,
	collectionName: string,
	data: DocumentData,
): Promise<null | Error> {
	const collectionRef = getCollection(db, collectionName);
	return setDoc(doc(collectionRef, data.id), data)
		.then(() => {
			return null;
		})
		.catch((error) => {
			return new Error(`Error adding document: ${error}`);
		});
}

// autoIdを使って新しいドキュメントを追加する
export async function addNewDocumentWithAutoId(
	db: Firestore,
	collectionName: string,
	data: DocumentData,
): Promise<null | Error> {
	const collectionRef = getCollection(db, collectionName);
	return addDoc(collectionRef, data)
		.then(() => {
			return null;
		})
		.catch((error) => {
			return new Error(`Error adding document: ${error}`);
		});
}

export async function getDocumentById(
	db: Firestore,
	collectionName: string,
	documentId: string,
): Promise<DocumentData | null> {
	const documentRef = doc(db, collectionName, documentId);
	const documentSnapshot = await getDoc(documentRef);
	if (documentSnapshot.exists()) {
		return documentSnapshot.data();
	}
	return null;
}

export async function updateDocument(
	db: Firestore,
	collectionName: string,
	documentId: string,
	data: DocumentData,
): Promise<null | Error> {
	const documentRef = doc(db, collectionName, documentId);
	return updateDoc(documentRef, data)
		.then(() => {
			return null;
		})
		.catch((error) => {
			return new Error(`Error updating document: ${error}`);
		});
}

export async function deleteDocument(
	db: Firestore,
	collectionName: string,
	documentId: string,
): Promise<null | Error> {
	const documentRef = doc(db, collectionName, documentId);
	return deleteDoc(documentRef)
		.then(() => {
			return null;
		})
		.catch((error) => {
			return new Error(`Error deleting document: ${error}`);
		});
}

export type QueryObj = {
	field: string;
	operator: "==";
	value: unknown;
};

export async function getDocumentsWithQuery(
	db: Firestore,
	collectionName: string,
	queryObj: QueryObj,
): Promise<DocumentData[] | Error> {
	const collectionRef = collection(db, collectionName);
	const q = query(
		collectionRef,
		where(queryObj.field, queryObj.operator, queryObj.value),
	);
	try {
		const querySnapshot = await getDocs(q);
		const documents: DocumentData[] = [];
		for (const doc of querySnapshot.docs) {
			documents.push(doc.data());
		}
		return documents;
	} catch (error) {
		return new Error(`Error getting documents: ${error}`);
	}
}
