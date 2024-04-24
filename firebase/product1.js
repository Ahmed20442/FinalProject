// Update the path to your firebase file if needed
import { db } from "./firebase";
import {
    getDocs,
    doc,
    setDoc,
    addDoc,
    deleteDoc,
    collection,
    query,
    onSnapshot,
} from "firebase/firestore";

async function editproduct(product) {
    console.log("at editproduct", product);
    await setDoc(doc(db, "products", product.id), product);
}

async function deleteproduct(productId) {
    try {
        await deleteDoc(doc(db, "products", productId));
        console.log("Document deleted with ID: ", productId);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

async function addproduct(product) {
    try {
        const docRef = await addDoc(collection(db, "products"), product);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

function subscribe(callback) {
    const unsubscribe = onSnapshot(
        query(collection(db, "products")),
        (snapshot) => {
            const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
            snapshot.docChanges().forEach((change) => {
                if (callback) callback({ change, snapshot });
            });
        }
    );
    return unsubscribe;
}

export { addproduct, editproduct, deleteproduct, subscribe };
