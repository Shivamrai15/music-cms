"use client";

import {
    MultiFileDropzone,
    type FileState,
  } from '@/components/multi-file-dropzone';
  import { useEdgeStore } from '@/lib/edgestore';
  import { useState } from 'react';

interface SongUploadProps {
    onChange : ( url : string ) => void;
}

export const SongUpload = ({
    onChange
} : SongUploadProps ) => {

    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
        const newFileStates = structuredClone(fileStates);
        const fileState = newFileStates.find(
            (fileState) => fileState.key === key,
        );
        if (fileState) {
            fileState.progress = progress;
        }
        return newFileStates;
        });
    }

    return (
        <div>
            <MultiFileDropzone
                value={fileStates}
                onChange={(files) => {
                setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                setFileStates([...fileStates, ...addedFiles]);
                await Promise.all(
                    addedFiles.map(async (addedFileState) => {
                    try {
                        const res = await edgestore.publicFiles.upload({
                        file: addedFileState.file,
                        onProgressChange: async (progress) => {
                            updateFileProgress(addedFileState.key, progress);
                            if (progress === 100) {
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                            updateFileProgress(addedFileState.key, 'COMPLETE');
                            }
                        },
                        });
                        onChange(res.url);
                        console.log(res);
                    } catch (err) {
                        updateFileProgress(addedFileState.key, 'ERROR');
                    }
                    }),
                );
                }}
            />
    </div>
    )

}