import {collection, doc, setDoc, updateDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import { BlockData } from 'models/BlockData';

import { db } from 'utils/firebase';

const addBlock = async (blockData: any) => {
	try {
		
		const docRef = await doc(collection(db, 'blocks'));

		await setDoc(docRef, {...blockData, updatedAt: serverTimestamp(),
			createdAt: serverTimestamp(),});

	} catch (error) {
		console.error('Error adding block: ', error);
	}
};


const updateBlock = async (blocks:BlockData[]) => {
	try {
		const docRef = await doc(collection(db, 'blocks'));
		const docSnap = await getDoc(docRef);

		const newBlock = {
			...blockData,
			updatedAt: serverTimestamp(),
		};
		
		if(docSnap.exists()) {
			await updateDoc(docRef, newBlock);
		} else {
			await setDoc(docRef, {...blockData, updatedAt: serverTimestamp(),createdAt: serverTimestamp()});
		}

		const subscriptionUpdateBatch = writeBatch(db);

          subscribers.forEach((subscriber) => {
            if (subscriber?.data()?.subscriberId) {
              const subscriptionRef = doc(
                db,
                `publicUsers/${subscriber?.data()?.subscriberId}/feed`,
                docRef.id
              );
              subscriptionUpdateBatch.set(subscriptionRef, newPost);
            }
          });

          await subscriptionUpdateBatch.commit().then(() => docRef.id);
          return docRef.id;
	} catch (error) {
		console.error('Error updating block: ', error);
	}
};

export { addBlock, updateBlock };
