"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GenreSchema } from "@/schema/genre.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/development/utils/image-upload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export const GenreForm = () => {

    const [ loading, setLoading ] = useState(false);

    const form = useForm<z.infer<typeof GenreSchema>>({
        resolver : zodResolver(GenreSchema),
        defaultValues : {
            name : "",
            image : ""
        }
    });

    const handleForm  = async ( value : z.infer<typeof GenreSchema> ) => {
        try {
            setLoading(true);
            await axios.post("/api/v1/genre", value);
            toast.success("Genre Created");
            form.reset();
        } catch (error) {
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
