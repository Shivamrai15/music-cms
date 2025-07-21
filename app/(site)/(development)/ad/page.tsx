import { AdForm } from "@/components/development/form/ad-form"


const AdPage = () => {
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari Ads</h1>
                <p className="text-sm text-zinc-700">Fill in the required fields below to add a new ad to the database.</p>
            </div>
            <AdForm/>
        </div>
    )
}

export default AdPage