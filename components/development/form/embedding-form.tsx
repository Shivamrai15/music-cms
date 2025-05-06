"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Song } from "@prisma/client";
import { EmbeddingsSchema } from "@/schema/embeddings.schema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";




interface EmbeddingFormProps {
    songs : Song[]
}

export const EmbeddingsForm = ({
    songs
}: EmbeddingFormProps) => {
    
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof EmbeddingsSchema>>({
        resolver : zodResolver(EmbeddingsSchema),
        defaultValues : {
            songId : "",
            embeddings : ""
        }
    });

    const handleForm = async ( values : z.infer<typeof EmbeddingsSchema> ) =>{
        try {
            setLoading(true);
            await axios.post("/api/v1/song/embedding", values);
            form.reset();
            toast.success("Embedding added successfully");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }
    
    return (
        <Form {...form}>
            <form
                className="space-y-6 max-w-md w-full"
                onSubmit={form.handleSubmit(handleForm)}
            >
                <div className="space-y-2">
                    <div className="flex items-center justify-center">
                        {
                            form.watch("songId") && (
                                <div className="aspect-square h-32 rounded-md relative overflow-hidden">
                                    <Image
                                        src={songs.find((song)=>song.id === form.watch("songId"))?.image || ""}
                                        alt="Song Image"
                                        fill
                                        className="object-cover" 
                                    />
                                </div>
                            )
                        }
                        
                    </div>
                    <FormField
                        control={form.control}
                        name="songId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Song</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={loading}
                                > 
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a song" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {songs.map((song)=>(
                                            <SelectItem
                                                key={song.id}
                                                value={song.id}
                                            >
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
                        name="embeddings"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Embedding</FormLabel>
                                <Textarea
                                    {...field}
                                    className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none"
                                    disabled={loading}
                                />
                                <FormMessage/>
                            </FormItem>
                        )}

                    />
                </div>
                <Button className="w-full" type="submit" disabled={loading}> 
                    Submit
                </Button>
            </form>
        </Form>
    )
}
