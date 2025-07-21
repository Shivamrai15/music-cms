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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SongSchema } from "@/schema/song.schema";
import { Album, Artist } from "@prisma/client";
import { SongUpload } from "../utils/song-upload";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { ImageUpload } from "../utils/image-upload";
import { cn } from "@/lib/utils";

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
                className="space-y-10 max-w-md w-full"
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
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? albums.find(
                                                        (album) => album.id === field.value
                                                    )?.name
                                                    : "Select Album"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Albums..." />
                                        <CommandList>
                                        <CommandEmpty>No Album found.</CommandEmpty>
                                        <CommandGroup>
                                            {albums.map((album) => (
                                            <CommandItem
                                                    value={album.name.toLowerCase()}
                                                    className="w-full"
                                                    key={album.id}
                                                    onSelect={() => {
                                                    form.setValue("albumId", album.id);
                                                    form.setValue("image", album.image);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        album.id === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                    )}
                                                />
                                                {album.name}
                                            </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        </CommandList>
                                    </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                            value={field.value ? [field.value] : []}
                                            disabled = {loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                </FormControl>
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
                                    <div className="flex gap-4 flex-wrap">
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
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                    Select Artist
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                        <Command className="w-full">
                                            <CommandInput placeholder="Search Artists..." />
                                            <CommandList>
                                            <CommandEmpty>No language found.</CommandEmpty>
                                            <CommandGroup className="w-full" >
                                                {artists.map((artist) => (
                                                <CommandItem
                                                    value={artist.name.toLowerCase()}
                                                    key={artist.id}
                                                    onSelect={() => {
                                                        field.onChange([...field.value, artist.id]);
                                                    }}
                                                    className="w-full"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            field.value.includes(artist.id)
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                    />
                                                    {artist.name}
                                                </CommandItem>
                                                ))}
                                            </CommandGroup>
                                            </CommandList>
                                        </Command>
                                        </PopoverContent>
                                    </Popover>
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
                    {loading ? "Adding..." : "Add Song"}
                </Button>
            </form>
        </Form>
    )
}
