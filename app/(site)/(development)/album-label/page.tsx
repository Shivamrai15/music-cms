import { UpdateForm } from "@/components/development/form/update-form";
import { getAllAlbumsWithoutLabel } from "@/server/album";
import { getLabel } from "@/server/label";



const UpdatePage = async() => {

    const albums = await getAllAlbumsWithoutLabel();
    const labels = await getLabel();

    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari album Label</h1>
                <p className="text-sm text-zinc-700">
                    Fill in the required fields below to connect a label to an available album.
                </p>
            </div>
            <UpdateForm albums={albums} labels={labels} /> 
        </div>
    )
}

export default UpdatePage;