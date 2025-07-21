import { EmbeddingsForm } from "@/components/development/form/embedding-form";
import { getSongsWithoutEmbeddings } from "@/server/songs";


const Page = async() => {
    
    const songs = await getSongsWithoutEmbeddings();
    
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Audio Embeddings</h1>
                <p className="text-sm text-zinc-700">Fill in the required fields below to add audio embeddings for the selected songs.</p>
            </div>
            <EmbeddingsForm songs={songs} />            
        </div>
    )
}

export default Page;