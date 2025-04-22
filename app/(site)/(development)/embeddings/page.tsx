import { EmbeddingsForm } from "@/components/development/form/embedding-form";
import { getSongsWithoutEmbeddings } from "@/server/songs";


const Page = async() => {
    
    const songs = await getSongsWithoutEmbeddings();
    
    return (
        <div className="h-full flex flex-col items-center justify-center py-10 space-y-10" >
            <h2 className="text-lg font-semibold text-zinc-800">Remaining {songs.length}</h2>
            <EmbeddingsForm songs={songs} />            
        </div>
    )
}

export default Page;