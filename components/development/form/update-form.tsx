"use client";

import * as z from "zod";
import { Song } from "@prisma/client";
import { useForm } from "react-hook-form";
import { UpdateSchema } from "@/schema/update.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
  } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { SongUpload } from "../utils/song-upload";

interface UpdateFormProps {
    songs : Song[]
}

export const UpdateForm = ({
    songs
} : UpdateFormProps ) => {

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    const form = useForm<z.infer<typeof UpdateSchema>>({
        resolver : zodResolver(UpdateSchema),
        defaultValues : {
            id : "",
            url : ""
        }
    });

    const handleForm = async( values : z.infer<typeof UpdateSchema> ) => {
        try {
            
            await axios.post("/api/v1/update", values);
            toast.success("Successfully Updated")
            form.reset();
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
                className="space-y-6 max-w-md w-full"
                onSubmit={form.handleSubmit(handleForm)}
            >
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="mr-4">Song</FormLabel>
                                    <Select onValueChange={(value)=>{
                                        field.onChange(value)
                                        setImage(songs.find((item)=> item.id===value)?.image || "")
                                    }} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a song" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                songs.map((song)=>(
                                                    <SelectItem key={song.id} value={song.id}>
                                                        {song.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Song</FormLabel>
                                <FormControl>
                                    <SongUpload
                                        onChange={(url) => field.onChange(url)}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                {
                    image && (
                        <div className="h-40 w-40 relative overflow-hidden">
                            <Image
                                src={image}
                                alt="song image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )
                }
                <Button
                    type="submit"
                    className="w-full"
                    disabled = {loading}
                >
                    Update
                </Button>
            </form>
        </Form>
    )
}
