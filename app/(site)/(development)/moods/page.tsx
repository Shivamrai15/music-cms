import { MoodsForm } from "@/components/development/form/moods-form";
import { getMoods } from "@/server/moods";


const MoodsPage = async() => {

    const moods = await getMoods();

    return (
        <div className="h-full flex items-center justify-center py-10 overflow-y-auto">
            <MoodsForm moods={moods} />
        </div>
    )
}

export default MoodsPage
