"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
// import { collection } from "firebase/firestore";

export async function createNewDocument() {
	try {
		auth().protect();
		const { sessionClaims } = await auth();

		if (!sessionClaims?.email) {
			throw new Error("User email not found in session claims");
		}

		const docCollectionRef = adminDb.collection("documents");
		const docRef = await docCollectionRef.add({
			title: "New Doc",
		});

		await adminDb
			.collection("users")
			.doc(sessionClaims.email)
			.collection("rooms")
			.doc(docRef.id)
			.set({
				userId: sessionClaims.email,
				role: "owner",
				createdAt: new Date(),
				roomId: docRef.id,
			});

		return { docId: docRef.id };
	} catch (error) {
		console.error("Error creating new document:", error);
		throw new Error("Failed to create new document. Please try again later.");
	}
}

export async function deleteDocument(roomId: string) {
	auth().protect();
	console.log("deleteDocument: ", roomId);
	
	try {
		await adminDb.collection("docments").doc(roomId).delete();

		const query = await adminDb
			.collectionGroup("rooms")
			.where("roomId", "==", roomId)
			.get();

		const batch = adminDb.batch();
		query.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});

		await batch.commit();

		await liveblocks.deleteRoom(roomId);

		return { success: true };


	} catch (error) {
		console.error(error);
		return {success : false}
		
	}
}


export async function inviteUserToDocument(roomId: string, email: string){
	auth().protect();

	console.log("Invite User to Document: ", roomId, email);

	try {
		await adminDb
		.collection("users")
		.doc(email)
		.collection("rooms")
		.doc(roomId)
		.set({
			userId: email,
			role: "editor",
			createdAt: new Date(),
			roomId,
		});

		return {success: true};


	} catch (error) {
		console.error(error);
		return {success : false};
	}
	

} 

