import { GenreSongsForm } from "@/components/development/form/genre-songs-form";
import { getGenre } from "@/server/genre";
import { getSongs } from "@/server/songs";


const GenreSongPage = async() => {

    const genre = await getGenre();
    const songs = await getSongs();

    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Genre Songs</h1>
                <p className="text-sm text-zinc-700">Add the following songs to a genre</p>
            </div>
            <GenreSongsForm genres={genre} songs={songs}   />
        </div>
    )
}

export default GenreSongPage;