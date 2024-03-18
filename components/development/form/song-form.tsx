"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SongSchema } from "@/schema/song.schema";
import { Album, Artist } from "@prisma/client";
import { SongUpload } from "../utils/song-upload";
import { X } from "lucide-react";

interface SongFormProps {
    artists : Artist[];
    albums : Album[];
}


export const SongForm = ({
    artists,
    albums
} : SongFormProps ) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const form  = useForm<z.infer<typeof SongSchema>>({
        resolver : zodResolver(SongSchema),
        defaultValues : {
            name : "",
            url : "",
            duration : 0,
            albumId : "",
            artistIds : [],
            image : ""
        }
    });

    const handleForm = async ( values : z.infer<typeof SongSchema> ) =>{
        try {

            setLoading(true);
            await axios.post("/api/v1/song", values);
            toast.success("Song has been added");
            form.reset();
            router.refresh();
            
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
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled = {loading}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Input
                                        
                                        disabled = {loading}
                                        onChange={(date)=>field.onChange(Number.parseInt(date.target.value))}
                                    />
                                </FormControl>
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
                    <FormField
                        control={form.control}
                        name="albumId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="mr-4">Album</FormLabel>
                                    <Select onValueChange={(value)=>{
                                        field.onChange(value);
                                        form.setValue("image", albums.find((album)=>album.id===value)?.image|| "");
                                    }} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an album" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                albums.map((album)=>(
                                                    <SelectItem key={album.id} value={album.id}>
                                                        {album.name}
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
                        name="artistIds"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="mr-4">Artist</FormLabel>
                                    <div className="flex gap-4">
                                        {
                                            field.value.map((id)=>(
                                                <div key={id} className="flex gap-2 items-center px-4 py-2 bg-gray-100 rounded-md ">
                                                    <p className="text-sm" >
                                                        {
                                                            artists.find((artist)=>artist.id===id)?.name || "Not found"
                                                        }
                                                    </p>
                                                    <button className="p-0 bg-red-500 text-white rounded-md" onClick={()=>field.onChange( field.value.filter((current)=> current!==id) )} >
                                                        <X/>
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <Select onValueChange={(value)=>{field.onChange([...field.value, value]); console.log(field.value) }} >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select artist" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                artists.map((artist)=>(
                                                    <SelectItem key={artist.id} value={artist.id}>
                                                        {artist.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled = {loading}
                >
                    Create
                </Button>
            </form>
        </Form>
    )
}
