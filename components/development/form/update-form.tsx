"use client";

import * as z from "zod";
import { Album, Label } from "@prisma/client";
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

interface UpdateFormProps {
    albums : Album[];
    labels : Label[]; 
}

export const UpdateForm = ({
    albums,
    labels
} : UpdateFormProps ) => {

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    const form = useForm<z.infer<typeof UpdateSchema>>({
        resolver : zodResolver(UpdateSchema),
        defaultValues : {
            id : "",
            labelId : ""
        }
    });

    const handleForm = async( values : z.infer<typeof UpdateSchema> ) => {
        try {
            
            await axios.post("/api/v1/update", values);
            toast.success("Successfully Updated");
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
                                <FormLabel className="mr-4">Album</FormLabel>
                                    <Select onValueChange={(value)=>{
                                        field.onChange(value)
                                        setImage(albums.find((item)=> item.id===value)?.image || "")
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
                        name="labelId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="mr-4">Label</FormLabel>
                                    <Select onValueChange={(value)=>{
                                        field.onChange(value)
                                    }} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a label" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                labels.map((label)=>(
                                                    <SelectItem key={label.id} value={label.id}>
                                                        {label.name}
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
