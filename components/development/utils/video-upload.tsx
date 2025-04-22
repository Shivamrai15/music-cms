
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from "@/components/ui/button";
import { VideotapeIcon, Trash } from "lucide-react";

interface VideoUploadProps {
    value : string[];
    disabled : boolean;
    onChange : (value : string) => void;
    onRemove : (value : string) => void;
}

export const VideoUpload = ({
    value,
    disabled,
    onChange,
    onRemove
} : VideoUploadProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    const onUpload = (result : any)=>{
        onChange(result.info.secure_url)
    }


    if (!isMounted){
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map((url)=>(
                        <div
                            key={url}
                            className="relative w-[200px] h-[220px] rounded-md overflow-hidden"
                        >
                            <div className="z-10 absolute top-2 right-2">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    type="button"
                                    onClick={() => onRemove(url)}
                                >
                                    <Trash className="h-4 w-4"/>
                                </Button>
                            </div>
                            <video
                                src={url}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    ))
                }
            </div>
            <CldUploadWidget
                onUpload={onUpload}
                uploadPreset="zmfxcswd"
                options={{
                    maxFiles:1,
                    resourceType: "video",
                }} 
            >
                { ({open}) => {
                    const onClick = ()=>{
                        open();
                    }
                    return (
                        <Button
                            type="button"
                            disabled = {disabled}
                            onClick={onClick}
                            variant="secondary"
                            className="w-full"
                        >
                            <VideotapeIcon className="h-4 w-4 mr-2" />
                            Upload a Video 
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}