"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";

function Document({ id }: { id: string }) {
	const [data, loading, error] = useDocumentData(doc(db, "documents", id));
	const [input, setInput] = useState("");

	const [isUpdating, startTransition] = useTransition();

	const isOwner = useOwner();

	useEffect(() => {
		if (data) {
			setInput(data.title);
		}
	}, [data]);

	const updateTitle = (e: FormEvent) => {
		e.preventDefault();

		if (input.trim()) {
			startTransition(async () => {
				await updateDoc(doc(db, "documents", id), {
					title: input,
				});
			});
		}
	};
	return (
		<div className="flex-1 h-1 bg-white p-5">
			<div className="flex justify-between mx-auto pb-5 max-w-6xl">
				<form className="flex flex-1 space-x-2 " onSubmit={updateTitle}>
					<Input value={input} onChange={(e) => setInput(e.target.value)} />

					<Button disabled={isUpdating} type="submit">
						{isUpdating ? "Updating..." : "Update"}
					</Button>

					{isOwner && (
						<>
						{/**Invite */}
						{/***Delete */}
						<DeleteDocument />
						
						</>
					)}
				</form>
			</div>
			<div>
				{/**Manage USer */}

				{/**Avattar */}
			</div>

			<hr className="pb-10" />

			<Editor />

			{/**Collabarative Editor */}
		</div>
	);
}
export default Document;
