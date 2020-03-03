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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google OAuth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
