import { AudioProcessForm } from "@/components/development/form/audio-process-form";

const Page = () => {
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Audio Processing</h1>
                <p className="text-sm text-zinc-700">Upload audio files to convert them to HLS (.m3u8 format) for preprocessing.</p>
            </div>
            <AudioProcessForm />
        </div>
    )
}

export default Page;
