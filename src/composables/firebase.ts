import {
  getFirestore,
  collection,
  query,
  where,
  DocumentData,
  WhereFilterOp,
  FieldPath,
  OrderByDirection,
  onSnapshot,
  orderBy,
  QueryConstraint,
} from "firebase/firestore";
import { ref, Ref, watchEffect } from "vue";
import type { AnimeDoc } from "../types/AnimeDoc";

const db = getFirestore();

// type Filters = [FieldPath | string, WhereFilterOp, unknown];
// type Orders = [fieldPath: string | FieldPath, directionStr?: OrderByDirection];

export function useFirestoreDocs(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
) {
  const docs: Ref<Array<AnimeDoc>> = ref([]);
  const error: Ref<string> = ref("");

  const collectionRef = collection(db, collectionName);

  const q = queryConstraints
    ? query(collectionRef, ...queryConstraints)
    : query(collectionRef);
  watchEffect((onInvalidate) => {
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
    onInvalidate(() => {
      unsub();
    });
  });

  return { docs, error };
}
