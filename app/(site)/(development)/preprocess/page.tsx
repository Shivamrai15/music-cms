import { PreProcessForm } from "@/components/development/form/preprocessform";
import { getPreProcessSongs } from "@/server/songs";


const PreProcessPage = async() => {
    
    const songs = await getPreProcessSongs();
    
    return (
        <div className='h-full flex flex-col gap-y-10 items-center justify-center py-10'>
            <h2 className="text-lg font-semibold text-zinc-800">Remaining {songs.length}</h2>
            <PreProcessForm songs={songs} />
        </div>
    )
}

export default PreProcessPage;