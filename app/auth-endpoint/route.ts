import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
        auth().protect();
        const { sessionClaims }: { sessionClaims: any } = await auth();
        // console.log("Session Claims:", sessionClaims);

        const { room } = await req.json();
        // console.log("Requested Room:", room);

        const session = liveblocks.prepareSession(sessionClaims?.email!, {
            userInfo: {
                name: sessionClaims?.fullName!,
                email: sessionClaims?.email!,
                avatar: sessionClaims?.image!,
            },
        });
        const usersInRoom = await adminDb.collectionGroup("rooms")
        .where("userId", "==" ,sessionClaims?.email)
        .get();

        // console.log("Users in Room ", usersInRoom);

        const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
        // console.log("User in Room ", userInRoom);

        if (userInRoom?.exists) {
            session.allow(room, session.FULL_ACCESS);
            const{ body , status } =await session.authorize();

            console.log("You are authorized");
            

            return new Response(body, { status });

        } else {
            return NextResponse.json(
                {messgae: "You are not allowed to access this room"},
                { status: 403 }
            )
        }

}
