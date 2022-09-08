import {
  getFirestore,
  collection,
  query,
  DocumentData,
  onSnapshot,
  QueryConstraint,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";

import { ref, Ref, watchEffect } from "vue";
import type { ImageFileName } from "../types/MediaExtension";

const db = getFirestore();

export function useFirestoreDocs<T>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
) {
  const docs: Ref<Array<T>> = ref([]);
  const error: Ref<string> = ref("");

  const collectionRef = collection(db, collectionName);

  const q = queryConstraints
    ? query(collectionRef, ...queryConstraints)
    : query(collectionRef);
  watchEffect((cleanUp) => {
    const unsub = onSnapshot(
      q,
      (snap) => {
        snap.docs.forEach((doc: DocumentData) => {
          docs.value.push(doc.data());
        });
      },
      () => {
        error.value = "firestore에서 데이터를 불러오는데 문제가 발생했습니다.";
      }
    );

    cleanUp(() => {
      unsub();
    });
  });

  return { docs, error };
}

export function useFirestoreSingleDoc<T>(
  collectionName: string,
  docName: string
) {
  const singleDoc: Ref<T | undefined> = ref();
  const docRef = doc(db, collectionName, docName);
  const error: Ref<string> = ref("");

  watchEffect(async (cleanUp) => {
    const unsub = onSnapshot(
      docRef,
      (doc) => {
        singleDoc.value = doc.data() as T;
      },
      () => {
        error.value = "firestore에서 데이터를 불러오는데 문제가 발생했습니다.";
      }
    );
    cleanUp(() => {
      unsub();
    });
  });
  return { singleDoc, error };
}

const storage = getStorage();

export function useStorageMedia(fileName: ImageFileName) {
  const imgURL: Ref<string> = ref("");
  const error: Ref<string> = ref("");
  const imgReference = storageRef(storage, fileName);

  watchEffect(async () => {
    try {
      imgURL.value = await getDownloadURL(imgReference);
    } catch {
      error.value = "해당 미디어 파일의 URL을 불러오는데 문제가 발생했습니다.";
    }
  });

  return { imgURL, error };
}

export async function useFirebaseEmailLogin(id: Ref<string>, pw: Ref<string>) {
  const auth = getAuth();
  const isLoading: Ref<boolean> = ref(false);
  const isFailed: Ref<boolean> = ref(true);
  try {
    await signInWithEmailAndPassword(auth, id.value, pw.value);
  } catch {
    console.error("에러");
    isFailed.value = true;
  }
  isLoading.value = false;
  return {
    isLoading,
    isFailed,
  };
}
