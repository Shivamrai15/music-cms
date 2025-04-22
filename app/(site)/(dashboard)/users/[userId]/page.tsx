import { UserOptions } from "@/components/dashboard/user-options";
import { db } from "@/lib/db";
import { HistoryIcon, ListMusic, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";


interface PageProps {
    params : {
        userId : string
    }
}



const Page = async({ params }: PageProps) => {
    
    const { userId } = params;

    

    const user = await db.user.findUnique({
        where : {
            id : userId
        },
        select : {
            name : true,
            image : true,
            emailVerified : true,
            accountVerified : true,
            email : true,
            accounts : {
                select : {
                    provider : true,
                }
            }
        }
    });

    if(!user) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <h1 className="text-zinc-800 font-semibold text-lg">User not found</h1>
            </div>
        )
    }
    
    return (
        <div className="p-6 size-full">
            <header className="flex items-center gap-x-20 md:gap-x-28">
                <div className="size-28 md:size-36 flex items-center justify-center relative rounded-full overflow-hidden bg-zinc-800">
                    {
                        user.image
                        ? (
                            <Image
                                src={user.image}
                                alt="User Image"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <h1 className="text-zinc-50 font-semibold text-2xl md:text-6xl flex items-center justify-center h-full w-full">
                                { user.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </h1>
                        )
                    }
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <h1 className="text-zinc-800 font-semibold text-lg md:text-xl">{ user.name }</h1>
                        {
                            (user.emailVerified || user.accountVerified || user.accounts.length > 0) && (
                                <MdVerified className="text-blue-500 size-6" />
                            )
                        }
                    </div>
                    <p className="text-zinc-500 text-sm md:text-base">{ user.email }</p>
                </div>
            </header>
            <UserOptions userId={userId} />
        </div>
    )
}

export default Page
