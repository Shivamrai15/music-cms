"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Artist, Song } from "@prisma/client";
import { PreProcessSchema } from "@/schema/preprocess.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";



interface PreProcessFormProps {
    songs : (Song  & { artists : Artist[] } )[];
}

export const PreProcessForm = ({
    songs
} : PreProcessFormProps ) => {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof PreProcessSchema>>({
        resolver : zodResolver(PreProcessSchema),
    });

    const handleProcess = async( values : z.infer<typeof PreProcessSchema> )=>{
        try {

            setLoading(true);
            const response = await axios.patch("http://localhost:5000/api/preprocess", values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Song has been preprocessed");
            form.reset();
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    
    return (
        <Form {...form}>
            <form
                className="space-y-10 max-w-md w-full"
                onSubmit={form.handleSubmit(handleProcess)}
                encType="multipart/form-data"
            >
                <div className="space-y-4">
                    {
                        songs.map((song)=> song.id===form.getValues().id ? (
                            <div className="w-full space-y-2" key={song.id}>
                                <div className="size-44 rounded-md mx-auto relative">
                                    <Image
                                        src={song.image}
                                        alt={song.name}
                                        fill
                                    />
                                </div>
                                <div className="flex items-center justify-center flex-wrap gap-2">
                                    {
                                        song.artists.map((artist)=>(
                                            <p className="text-sm text-zinc-700 font-medium" key={artist.id}>
                                                {artist.name}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                            
                        ) : null)
                    }
                    <FormField
                        control={form.control}
                        name="id"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Select a song</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a song" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {songs.map((song)=>(
                                            <SelectItem key={song.id} value={song.id}>
                                                {song.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="audio"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Select File</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled = {loading}
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    className="w-full"
                    type="submit"
                    disabled={loading}
                >
                    Pre Process
                </Button>
            </form>
        </Form>
    )
}
