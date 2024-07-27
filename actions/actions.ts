"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

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
