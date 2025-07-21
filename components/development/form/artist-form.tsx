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
import { ArtistSchema } from "@/schema/artist.schema";
import { ImageUpload } from "../utils/image-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const ArtistForm = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const form  = useForm<z.infer<typeof ArtistSchema>>({
        resolver : zodResolver(ArtistSchema),
        defaultValues : {
            about : "",
            image : "",
            name : "",
        }
    });

    const handleForm = async ( values : z.infer<typeof ArtistSchema> ) =>{
        try {

            if (values.thumbnail === "") {
                values.thumbnail = undefined;
            }
            setLoading(true);
            await axios.post("/api/v1/artist", values);
            toast.success("Artist has been added");
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
                <div className="space-y-2">
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
                        name="about"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>About</FormLabel>
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
                        name="thumbnail"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
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
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled = {loading}
                >
                    {loading ? "Adding..." : "Add Artist"}
                </Button>
            </form>
        </Form>
    )
}
