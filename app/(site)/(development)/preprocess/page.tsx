import { PreProcessForm } from "@/components/development/form/preprocessform";
import { getPreProcessSongs } from "@/server/songs";


const PreProcessPage = async() => {
    
    const songs = await getPreProcessSongs();
    
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Preprocess Safari Audios</h1>
                <p className="text-sm text-zinc-700">
                Use this form to preprocess an audio file and update the corresponding song with the new preprocessed audio.
                </p>
            </div>
            <PreProcessForm songs={songs} />
        </div>
    )
}

export default PreProcessPage;