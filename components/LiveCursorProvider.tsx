"use client"

import { useMyPresence, useOthers } from "@liveblocks/react/suspense"
import { PointerEvent } from "react"
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({children}: {
    children: React.ReactNode
}) {

    const [myPresence, upadteMyPresence] = useMyPresence();
    const others = useOthers();
    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
        const cursor = {x : Math.floor(e.pageX), y: Math.floor(e.pageY)};
        upadteMyPresence({cursor});
    }

    function handlePointerLeave() {
        upadteMyPresence({cursor: null});
    }
    
  return (
    <div
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}
    >
        {others.filter((other) => other.presence.cursor !== null)
        .map(({connectionId, presence, info}) => (
            <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
            />
        ))}
        {children}
    </div>
  )
}
export default LiveCursorProvider