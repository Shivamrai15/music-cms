import { SongForm } from "@/components/development/form/song-form";
import { getAllAlbums } from "@/server/album";
import { getAllArtist } from "@/server/artist";


const SongPage = async() => {

    const albums = await getAllAlbums();
    const artists = await getAllArtist();

    return (
        <div className="flex items-center justify-center py-10">
            <SongForm
                albums = {albums}
                artists  = {artists}
            />
        </div>
    )
}

export default SongPage;