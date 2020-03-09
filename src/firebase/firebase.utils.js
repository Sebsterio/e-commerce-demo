import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyAm4XHrTYFgSZVboeZcGfhX9_MxOa-YX7s",
	authDomain: "e-commerce-demo-crown.firebaseapp.com",
	databaseURL: "https://e-commerce-demo-crown.firebaseio.com",
	projectId: "e-commerce-demo-crown",
	storageBucket: "e-commerce-demo-crown.appspot.com",
	messagingSenderId: "1083589020499",
	appId: "1:1083589020499:web:a576a6cd57a4fdb3726fa6",
	measurementId: "G-TVV199P3V1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const userSnapshot = await userRef.get();
	if (!userSnapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
			console.log("user added to DB");
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}
	return userRef;
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc(); // .doc(_id); empty id -> UID
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();
		return {
			id: doc.id,
			title,
			routeName: encodeURI(title.toLowerCase()), // JS method
			items
		};
	});

	return transformedCollection.reduce((acc, col) => {
		acc[col.title.toLowerCase()] = col;
		return acc;
	}, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google OAuth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
