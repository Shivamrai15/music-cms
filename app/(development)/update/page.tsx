import { UpdateForm } from "@/components/development/form/update-form";
import { getSongs } from "@/server/songs";


const UpdatePage = async() => {

    const songs = await getSongs();

    return (
        <div className="h-full flex items-center justify-center  py-10" >
            <UpdateForm songs={songs} /> 
        </div>
    )
}

export default UpdatePage;