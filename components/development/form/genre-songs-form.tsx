"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Genre, Song } from "@prisma/client";

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
import { GenreSongSchema } from "@/schema/genre-song.schema";

interface GenreSongsFormProps {
    songs : Song[];
    genres : Genre[];
}

export const GenreSongsForm = ({
    genres,
    songs
} : GenreSongsFormProps ) => {

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof GenreSongSchema>>({
        resolver : zodResolver(GenreSongSchema),
        defaultValues : {
            genreId : "",
            songId : ""
        }
    });

    const handleForm = async( values : z.infer<typeof GenreSongSchema> ) => {
        try {
            
            await axios.post("/api/v1/genre/songs", values);
            toast.success("Song is added")
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
                        name="genreId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="mr-4">Genre</FormLabel>
                                    <Select onValueChange={(value)=>{
                                        field.onChange(value)
                                    }} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a genre" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                genres.map((genre)=>(
                                                    <SelectItem key={genre.id} value={genre.id}>
                                                        {genre.name}
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
                        name="songId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="mr-4">Song</FormLabel>
                                    <Select onValueChange={(value)=>{
                                        field.onChange(value)
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
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled = {loading}
                >
                    Add
                </Button>
            </form>
        </Form>
    )
}
