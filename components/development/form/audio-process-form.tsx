"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";


const formSchema = z.object({
    audio : z.instanceof(File, { message: "Audio file is required" })
        .refine((file) => file.type.startsWith('audio/'), { 
            message: "File must be an audio file",
    }),
})

export const AudioProcessForm = () => {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [processedUrl, setProcessedUrl] = useState("");
    const { isSubmitting } = form.formState;

    const onCopy = () => {
        if (processedUrl) {
            navigator.clipboard.writeText(processedUrl);
            toast.success("URL copied to clipboard");
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
            const response = await axios.post("http://localhost:5000/api/preprocess", values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const data = response.data;
            setProcessedUrl(data.processedUrl);

        } catch (error) {
            console.error("Error processing audio:", error);
            toast.error("Failed to process audio");
        }
    }

    
    return (
        <Form {...form}>
            <form className="space-y-8 max-w-md w-full" onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="audio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Audio File</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="audio/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                field.onChange(e.target.files[0]);
                                            }
                                        }}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        processedUrl && (
                            <div className="flex items-center h-10 bg-secondary rounded-md p-2">
                                <p className="text-sm text-zinc-700 flex-1 truncate">{processedUrl}</p>
                                <button
                                    type="button"
                                    className="text-zinc-700 hover:text-primary"
                                    onClick={onCopy}
                                >
                                    <CopyIcon className="size-5" />
                                </button>
                            </div>
                        )
                    }
                </div>
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Process Audio"}
                </Button>
            </form>
        </Form>
    )
}
