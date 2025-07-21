"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const Sidebar = () => {
    
    const pathname = usePathname();

    const dataEntryLinks = useMemo(()=>[
        {
            href:"/artist",
            name:"Artist",
            isActive: pathname === "/artist"
        },
        {
            href:"/album",
            name:"Album",
            isActive: pathname === "/album"
        },
        {
            href:"/song",
            name:"Song",
            isActive: pathname === "/song"
        },
        {
            href:"/label",
            name:"Label",
            isActive: pathname === "/label"
        },
        {
            href:"/genre",
            name:"Genre",
            isActive: pathname === "/genre"
        },
        {
            href:"/lyrics",
            name:"Lyrics",
            isActive: pathname === "/lyrics"
        },
        {
            href:"/synced-lyrics",
            name:"Synced Lyrics",
            isActive: pathname === "/synced-lyrics"
        },
        {
            href:"/album-label",
            name:"Album Label",
            isActive: pathname === "/album-label"
        },
        {
            href:"/genre-songs",
            name:"Genre Songs",
            isActive: pathname === "/genre-songs"
        },
        {
            href:"/preprocess",
            name:"Pre Process",
            isActive: pathname === "/preprocess"
        },
        {
            href:"/ad",
            name:"Ad",
            isActive: pathname === "/ad"
        },
        {
            href:"/video",
            name:"Video",
            isActive: pathname === "/video"
        },
        {
            href:"/embeddings",
            name:"Embeddings",
            isActive: pathname === "/embeddings"
        },
        {
            href:"/moods",
            name:"Moods",
            isActive: pathname === "/moods"
        },
        {
            href:"/audio-processing",
            name:"Audio Processing",
            isActive: pathname === "/audio-processing"
        }
    ], [pathname]);

    const dashboardLinks = useMemo(()=>[
        {
            href:"/users",
            name:"Users",
            isActive: pathname === "/users"
        },
        {
            href : "/subscriptions",
            name : "Subscriptions",
            isActive : pathname === "/subscriptions"
        }
    ], [pathname]);
    
    return (
        <aside className="w-64 h-full overflow-y-auto p-6 border-r border-zinc-200 space-y-8">
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-zinc-700">Dashboard</h2>
                <ul className="h-20 w-full flex flex-col items-start text-zinc-700 space-y-0.5">
                    {
                        dashboardLinks.map((link) => (
                            <Link
                                href={link.href}
                                key={link.href}
                                className="w-full"
                            >
                                <Button
                                    variant={link.isActive ? "secondary" : "ghost"}
                                    size="sm"
                                    className="w-full text-left justify-start"

                                >
                                    {link.name}
                                </Button>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-zinc-700">Data Entry</h2>
                <ul className="w-full flex flex-col items-start text-zinc-700 space-y-0.5">
                    {
                        dataEntryLinks.map((link) => (
                            <Link
                                href={link.href}
                                key={link.href}
                                className="w-full"
                            >
                                <Button
                                    variant={link.isActive ? "secondary" : "ghost"}
                                    size="sm"
                                    className="w-full text-left justify-start"

                                >
                                    {link.name}
                                </Button>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}
