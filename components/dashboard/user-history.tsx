"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useQuery } from "@/hooks/use-query";
import { useInView } from "react-intersection-observer";
import { UserHistory as UserHistoryType } from "@/types";
import { Loader } from "lucide-react";

interface UserHistoryProps {
    userId : string;
}

export const UserHistory = ({
    userId
}: UserHistoryProps) => {
    
    const { data, isFetchingNextPage, status, hasNextPage, fetchNextPage } = useQuery({
        url : `/api/v1/user/${userId}/history`,
        paramKey : "",
        paramValue : "",
        queryKey : ["user-history", userId],
    });

    const { ref, inView } = useInView();

    useEffect(()=>{
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, inView])


    if (status === "pending") {
        return (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
                <Loader className="size-6 text-zinc-800 animate-spin" />
            </div>
        );
    }


    
    return (
        <div className="w-full h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {
                    data?.pages?.map((page, index) => (
                        page.items.map((history: UserHistoryType) => (
                            <div className="bg-neutral-100 rounded-md outline outline-1 outline-neutral-300 p-2" key={index}>
                                <div className="flex gap-3 items-center">
                                    <div className="rounded-md size-12 relative overflow-hidden">
                                        <Image
                                            src={history.song.image}
                                            fill
                                            alt={history.song.name}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-sm text-zinc-700 font-semibold line-clamp-1">{history.song.name}</h1>
                                        <p className="text-xs text-neutral-500 line-clamp-1">{new Date(history.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))
                }
            </div>
            {
                isFetchingNextPage && (
                    <div className="display flex items-center justify-center w-full h-12">
                        <Loader className="size-6 text-zinc-800 animate-spin" />
                    </div>
                )
            }
            <div className="h-4 w-full" ref = {ref} />
        </div>
    )
}
