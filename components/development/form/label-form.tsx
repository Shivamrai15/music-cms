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
import { LabelSchema } from "@/schema/label.schema";
import { ImageUpload } from "../utils/image-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const LabelForm = () => {

    const [loading, setLoading] = useState(false);
    
    const form  = useForm<z.infer<typeof LabelSchema>>({
        resolver : zodResolver(LabelSchema),
        defaultValues : {
            name : "",
            color : "#242424",
        }
    });

    const handleForm = async ( values : z.infer<typeof LabelSchema> ) =>{
        try {
            console.log("API CALLED")
            setLoading(true);
            await axios.post("/api/v1/label", values);
            toast.success("Label has been added");
            form.reset();
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
                        name="color"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled = {loading}
                                        type="color"
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
                    {loading ? "Adding..." : "Add Label"}
                </Button>
            </form>
        </Form>
    )
}
