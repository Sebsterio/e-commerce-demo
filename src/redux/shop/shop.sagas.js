import { takeLatest, call, put } from "redux-saga/effects";

import shopActionTypes from "./shop.types";
import {
	fetchCollectionsFailure,
	fetchCollectionsSuccess
} from "./shop.actions";

import {
	firestore,
	convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils";

// -----------------------------------------------------------------------

export function* fetchCollectionsAsync() {
	try {
		const collectionRef = firestore.collection("collections");
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (err) {
		yield put(fetchCollectionsFailure(err.message));
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(
		shopActionTypes.FETCH_COLLECTIONS_START, // action to intercept
		fetchCollectionsAsync
	);
}
