import { UpdateForm } from "@/components/development/form/update-form";
import { getAllAlbumsWithoutLabel } from "@/server/album";
import { getLabel } from "@/server/label";



const UpdatePage = async() => {

    const albums = await getAllAlbumsWithoutLabel();
    const labels = await getLabel();

    return (
        <div className="h-full flex items-center justify-center  py-10" >
            <UpdateForm albums={albums} labels={labels} /> 
        </div>
    )
}

export default UpdatePage;