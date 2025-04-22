"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";


type UserWithAccounts = User & {accounts : { provider: string }[] };
type UserResponse = {
    users : UserWithAccounts[];
    page : number;
    limit : number;
    hasNextPage : boolean;
};

const Page = () => {

    const [page, setPage] = useState(1);
    
    const { data, isPending } : { data: UserResponse|null|undefined, isPending: boolean } = useQuery({
        queryFn : async()=>{
            const response = await axios.get(`/api/v1/user?page=${page}&limit=8`);
            return response.data;
        },
        queryKey : ["users", page],
    });


    
    return (
        <div className="p-6 h-full w-full flex flex-col gap-y-12">
            <h1 className="text-base text-zinc-700 font-semibold">Users</h1>
            <div className="space-y-6 flex flex-col flex-1">
                <div className="w-full flex-1 relative">
                    { isPending
                        ? (
                            <div className="absolute inset-0 z-50 flex items-center justify-center">
                                <Loader className="size-6 text-zinc-800 animate-spin" />
                            </div>
                        ) 
                        : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Avatar</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Verified Account</TableHead>
                                        <TableHead>Login Methods</TableHead>
                                        <TableHead>Joined At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    { data && data.users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="w-20">
                                                    <Avatar>
                                                        <AvatarImage src={user.image ?? ""} />
                                                        <AvatarFallback>{ user.name ? user.name.charAt(0).toUpperCase() :"U"}</AvatarFallback>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        href={`/users/${user.id}`}
                                                        className="text-zinc-800 hover:text-zinc-900 font-medium hover:underline"
                                                    >
                                                        {user.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.accountVerified ? "Yes" : "No"}</TableCell>
                                                <TableCell>{user.accounts.map((account) => account.provider).join(", ")}</TableCell>
                                                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        )
                    }
                </div>
                <div className="flex items-center justify-end gap-x-4 pb-6">
                    <Button
                        size="sm"
                        disabled={page===1}
                        onClick={()=>setPage((prev)=>prev-1)}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        disabled={!data?.hasNextPage}
                        onClick={()=>setPage((prev)=>prev+1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page
