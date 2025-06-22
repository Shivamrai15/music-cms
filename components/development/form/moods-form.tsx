"use client";

import * as z from "zod";
import { MoodSchema } from "@/schema/moods.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mood } from "@prisma/client";
import { useForm } from "react-hook-form";

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
import { useRouter } from "next/navigation";
import { ImageUpload } from "../utils/image-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface MoodsFormProps {
    moods : Mood[];
}

export const MoodsForm = ({
    moods
}: MoodsFormProps ) => {

    const router = useRouter();
    
    const form = useForm<z.infer<typeof MoodSchema>>({
        resolver : zodResolver(MoodSchema),
        defaultValues : {
            id : "",
            image : "",
            color : ""
        }
    });

    const loading = form.formState.isSubmitting;

    const handleForm = async( values : z.infer<typeof MoodSchema> ) => {
        try {
            
            const response = await axios.post("/api/v1/mood", values);
            form.reset();
            router.refresh();
            toast.success("Mood updated successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to update mood. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form
                className="space-y-6 max-w-md w-full"
                onSubmit={form.handleSubmit(handleForm)}
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mood</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(e)=>{
                                            field.onChange(e);
                                            moods.find((mood) => mood.id === e)?.image && form.setValue("image", moods.find((mood) => mood.id === e)?.image || "");
                                            moods.find((mood) => mood.id === e)?.color && form.setValue("color", moods.find((mood) => mood.id === e)?.color || "");
                                        }}  
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a mood" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {moods.map((mood) => (
                                                <SelectItem key={mood.id} value={mood.id}>
                                                    {mood.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={loading}
                                        type="color"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? "Updating..." : "Update Mood"}
                </Button>
            </form>
        </Form>
    )
}