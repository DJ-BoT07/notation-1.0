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
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

function InviteUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const router = useRouter();

    const handleInvite = async (e: FormEvent) => {
        e.preventDefault();
        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            const result = await inviteUserToDocument(roomId, email);
            const success = result?.success;

            if (success) {
                setIsOpen(false);
                setEmail("");
                toast.success("User Added to Room Successfully");
            } else {
               
                toast.error("Failed to add user to room");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a User to Collaborate</DialogTitle>
                    <DialogDescription>
                        Enter the Email of the user you want to invite.
                    </DialogDescription>
                </DialogHeader>
            
                <form className="flex gap-2" onSubmit={handleInvite}>
                    <Input
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <Button 
                    type="submit"
                    disabled={!email || isPending}
                    >
                        {isPending ? "Inviting..." : "Invite"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    );
}
export default InviteUser;
