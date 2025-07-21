import { getSongsWithoutSyncedLyrics } from "@/server/songs";
import { SyncedLyricsForm } from "@/components/development/form/synced-lyrics-form";


const Page = async() => {
    
    const songs = await getSongsWithoutSyncedLyrics();
    
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari Synced Lyrics</h1>
                <p className="text-sm text-zinc-700">
                    Select a song below and provide the synced lyrics to help improve the accuracy and experience for all users.
                </p>
            </div>
            <SyncedLyricsForm songs={songs} />
        </div>
    )
}

export default Page
