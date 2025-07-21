"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { VideoSchema } from "@/schema/video.schema";
import { Genre } from "@prisma/client";
import { ImageUpload } from "../utils/image-upload";
import { VideoUpload } from "../utils/video-upload";

interface VideoFormProps {
    genre : Genre[]
}

export const VideoForm = ({ genre }: VideoFormProps) => {
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();
        
    const form  = useForm<z.infer<typeof VideoSchema>>({
        resolver : zodResolver(VideoSchema),
        defaultValues : {
            genreId : "",
            image : "",
            url : ""
        }
    });

    const handleForm = async ( values : z.infer<typeof VideoSchema> ) =>{
        try {

            setLoading(true);
            await axios.patch("/api/v1/video", values);
            toast.success("Video has been added");
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
                                                genre.map((g)=>(
                                                    <SelectItem key={g.id} value={g.id}>
                                                        {g.name}
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
                        name="url"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <VideoUpload
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
                </div>
                <Button className="w-full" type="submit">
                    {loading ? "Adding..." : "Add Video"}
                </Button>
            </form>
        </Form>
    )
}
