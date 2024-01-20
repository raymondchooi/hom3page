import {
  collection,
  doc,
  setDoc,
  getDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { type BlockData } from "models/BlockData";

import { db } from "utils/firebase";

const addBlock = async (blockData: any) => {
  try {
    const docRef = await doc(collection(db, "blocks"));

    await setDoc(docRef, {
      ...blockData,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding block: ", error);
  }
};

const updateBlock = async (blocks: BlockData[]) => {
  try {
  const batch = writeBatch(db);

    for (const block of blocks) {
      const docRef = doc(collection(db, "blocks"), block.id);
      const docSnap = await getDoc(docRef);

      const newBlock = {
        ...block,
        updatedAt: serverTimestamp(),
      };

      if (docSnap.exists()) {
        batch.update(docRef, newBlock);
      } else {
        batch.set(docRef, {
          ...block,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        });
      }
    }

    await batch.commit();
  } catch (error) {
    console.error("Error updating block: ", error);
  }
};

export { addBlock, updateBlock };
