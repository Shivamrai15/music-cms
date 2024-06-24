import { LyricsForm } from "@/components/development/form/lyrics-form";
import { getSongs } from "@/server/songs"


const LyricsPage = async() => {
    
    const songs = await getSongs();
    
    return (
        <div className="h-full flex items-center justify-center  py-10" >
            <LyricsForm songs={songs} /> 
        </div>
    )
}

export default LyricsPage;