import { GenreSongsForm } from "@/components/development/form/genre-songs-form";
import { getGenre } from "@/server/genre";
import { getSongs } from "@/server/songs";


const GenreSongPage = async() => {

    const genre = await getGenre();
    const songs = await getSongs();

    return (
        <div className="h-full flex items-center justify-center py-10">
            <GenreSongsForm genres={genre} songs={songs}   />
        </div>
    )
}

export default GenreSongPage;