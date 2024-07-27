"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";

function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();

    const handleDelete = async () => {
        console.log(pathname);
        
        const roomId = pathname.split("/").pop();
        console.log("roomId: ", roomId);
        
        if (!roomId) return;

        startTransition(async () => {
            const result = await deleteDocument(roomId);
            const success = result?.success;

            if (success) {
                setIsOpen(false);
                router.replace("/");
                console.log("Success toast should appear");
                toast.success("Room Deleted Successfully");
            } else {
                console.log("Error toast should appear");
                toast.error("Something went wrong, Please try again");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="destructive">
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to Delete ?</DialogTitle>
                    <DialogDescription>
                        This will delete the document and all its content.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default DeleteDocument;
