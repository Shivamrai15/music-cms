import { GenreForm } from "@/components/development/form/genre-form";

const GenrePage = () => {
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari Genres</h1>
                <p className="text-sm text-zinc-700">Fill in the required fields below to add a new genre to the database.</p>
            </div>
            <GenreForm/>
        </div>
    )
}

export default GenrePage;