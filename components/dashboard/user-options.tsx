"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { UserHistory } from "./user-history";


interface UserOptionsProps {
    userId : string;
}


type Tab = 
    "History" |
    "Liked Songs" |
    "Playlists" |
    "Followings";

const tabs: Tab[] = ["History", "Liked Songs", "Playlists", "Followings"];

export const UserOptions = ({
    userId
}: UserOptionsProps) => {
    
    const [ tab, setTab ] = useState<Tab>("History");
    
    return (
        <div className="w-full mt-20 space-y-20">
            <div className="flex items-center gap-x-2">
                {
                    tabs.map((item) => (
                        <Button
                            key={item}
                            variant={tab===item ? "default" : "ghost"}
                            onClick={() => setTab(item)}
                            disabled={tab === item}
                        >
                            {item}
                        </Button>
                    ))
                }
            </div>
            { tab === "History" && <UserHistory userId={userId} />}
        </div>
    )
}

