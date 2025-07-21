import { MoodsForm } from "@/components/development/form/moods-form";
import { getMoods } from "@/server/moods";


const MoodsPage = async() => {

    const moods = await getMoods();

    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari Moods</h1>
                <p className="text-sm text-zinc-700">
                   Add the following details to update the selected mood. All fields are required.
                </p>
            </div>
            <MoodsForm moods={moods} />
        </div>
    )
}

export default MoodsPage
