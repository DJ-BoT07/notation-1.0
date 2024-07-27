"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocument } from "react-firebase-hooks/firestore";

interface SidebarOptionProps {
    href: string;
    id: string;
}

function SidebarOption({ href, id }: SidebarOptionProps) {
    const [data, loading, error] = useDocument(doc(db, "documents", id));
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== "/";
    if (error) return <p>Error loading document</p>;
    if (!data || !data.exists()) return null;

    const documentData = data.data();

    return (
        <Link href={href} className={`relative border p-2 rounded-md ${
        isActive ? "bg-gray-300 font-bold border-black text-gray-950" : "border-gray-400 text-gray-600 font-semibold flex justify-center"}`}>
            <p className="truncate">{documentData?.title}</p>
        </Link>
    );
}

export default SidebarOption;
