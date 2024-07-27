"use client";
import React, { useEffect, useState } from "react";
import NewDocumentButton from "./NewDocumentButton";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetDescription
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
	collectionGroup,
	DocumentData,
	query,
	where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
	createdAt: string;
	role: "owner" | "editor";
	roomId: string;
	userId: string;
}

function Sidebar() {
	const { user } = useUser();
	const [groupedData, setGroupedData] = useState<{
		owner: RoomDocument[];
		editor: RoomDocument[];
	}>({
		owner: [],
		editor: [],
	});

	const userEmail = user?.emailAddresses
		? user.emailAddresses[0].emailAddress
		: null;

	const [data, loading, error] = useCollection(
		userEmail
			? query(collectionGroup(db, "rooms"), where("userId", "==", userEmail))
			: null
	);

	useEffect(() => {
		if (!data) return;
		const grouped = data.docs.reduce<{
			owner: RoomDocument[];
			editor: RoomDocument[];
		}>(
			(acc, curr) => {
				const roomData = curr.data() as RoomDocument;

				if (roomData.role === "owner") {
					acc.owner.push({
						id: curr.id,
						...roomData,
					});
				} else {
					acc.editor.push({
						id: curr.id,
						...roomData,
					});
				}

				return acc;
			},
			{
				owner: [],
				editor: [],
			}
		);
		setGroupedData(grouped);
	}, [data]);

	const menuOptions = (
		<>
			<NewDocumentButton />
			<div className="flex py-4 flex-col space-y-4 md:max-w-36">
				{/*My Documents*/}
				{groupedData.owner.length === 0 ? (
					<h2 className="text-gray-500 font-semibold text-sm">
						No documents found
					</h2>
				) : (
					<>
						<h2 className="text-gray-500 font-semibold text-sm">
							My Documents
						</h2>
						{groupedData.owner.map((doc) => (
							<SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
						))}
					</>
				)}
			</div>
			{/*My List....*/}
			{groupedData.editor.length > 0 && (
				<>
				<h2>Shared with me</h2>
				{groupedData.editor.map((doc) => (
					<SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
				))}
				</>
			)}
			{/*Liste*/}
		</>
	);

	return (
		<div className="p-2 md:p-5 bg-gray-200 relative">
			<div className="md:hidden">
				<Sheet>
					<SheetTrigger>
						<MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
					</SheetTrigger>
					<SheetDescription>{}</SheetDescription>
					<SheetContent side={"left"}>
						<SheetHeader>
							<div className="flex flex-col justify-center items-center">
								<SheetTitle>Menu</SheetTitle>
								<div>{menuOptions}</div>
							</div>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
			<div className="hidden md:inline">{menuOptions}</div>
		</div>
	);
}

export default Sidebar;
