import {
  getFirestore,
  collection,
  query,
  DocumentData,
  onSnapshot,
  QueryConstraint,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { ref, Ref, watchEffect } from "vue";
import type { ImageFileName } from "../types/MediaExtension";
import { FirebaseError } from "@firebase/util";
import { useToast } from "../store/toast";
import { storeToRefs } from "pinia";

export function useFirestoreDocs<T>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
) {
  const db = getFirestore();
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
  const db = getFirestore();
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

export function useStorageMedia(fileName: ImageFileName) {
  const storage = getStorage();
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
  const errorCode: Ref<string> = ref("");
  try {
    await signInWithEmailAndPassword(auth, id.value, pw.value);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errorCode.value = "잘못된 이메일 형식입니다.";
          break;
        case "auth/user-not-found":
          errorCode.value = "등록되지 않은 이메일입니다.";
          break;
        case "auth/wrong-password":
          errorCode.value = "잘못된 패스워드입니다.";
          break;
        case "auth/too-many-requests":
          errorCode.value = "패스워드를 잊어버렸다면 재설정할 수 있습니다.";
          break;
        default:
          errorCode.value = "오류가 발생했습니다. 다시 시도해 주세요";
      }
    }
  }
  return errorCode;
}

export async function firebaseLogout() {
  const auth = getAuth();
  const isFailed: Ref<boolean> = ref(false);
  try {
    await signOut(auth);
  } catch {
    isFailed.value = true;
  }
  return isFailed;
}

export async function sendResetEmail(email: Ref<string>) {
  const auth = getAuth();
  const isFailed: Ref<boolean> = ref(false);
  const toastStore = useToast();
  try {
    await sendPasswordResetEmail(auth, email.value);
    toastStore.bakeBread(
      "success",
      `${email.value}에 비밀번호 리셋용 이메일을 보냈습니다.`,
      3000
    );
  } catch {
    toastStore.bakeBread(
      "error",
      "에러가 발생했습니다. 입력한 이메일을 다시 확인해 보세요",
      3000
    );
  }
  return isFailed;
}
