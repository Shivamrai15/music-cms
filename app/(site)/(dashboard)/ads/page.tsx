import { AdCard } from "@/components/dashboard/ad-card";
import { getAds } from "@/server/ads"


const Page = async() => {

    const ads = await getAds();

    return (
        <div className="p-6 lg:px-16 h-full w-full flex flex-col gap-y-12 overflow-y-auto">
            <h1 className="text-2xl font-bold text-zinc-800">Safari Advertisements</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ads.map(ad=>(
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </div>
        </div>
    )
}

export default Page
