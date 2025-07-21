import { SongForm } from "@/components/development/form/song-form";
import { getAllAlbums } from "@/server/album";
import { getAllArtist } from "@/server/artist";


const SongPage = async() => {

    const albums = await getAllAlbums();
    const artists = await getAllArtist();

    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari Songs</h1>
                <p className="text-sm text-zinc-700">Fill in the required fields below to add a new song to the database. After this you must run the hls script to process the audio files.</p>
            </div>
            <SongForm
                albums = {albums}
                artists  = {artists}
            />
        </div>
    )
}

export default SongPage;