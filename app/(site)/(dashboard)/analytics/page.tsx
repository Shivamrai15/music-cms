
import { Suspense } from "react";
import { Music, Users, Album, Mic2, Loader } from "lucide-react";
import { getAnalyticsData, getNewUsersChartData, getSongListensChartData, getRevenueChartData } from "@/server/analytics";
import { AnalyticsCard } from "@/components/analytics/analytics-cards";
import { NewUsersChart } from "@/components/analytics/new-users-chart";
import { SongListensChart } from "@/components/analytics/song-listens-chart";
import { RevenueChart } from "@/components/analytics/revenue-chart";

const Page = () => {
    return (
        <Suspense fallback={
            <div className="size-full flex items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        }> 
            <main className="space-y-8 w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-zinc-700">Analytics Dashboard</h1>
                </div>
                <ServerComponent />
            </main>
        </Suspense>
    )
}

const ServerComponent = async() => {

    const [data, newUsersData, songListensData, revenueData] = await Promise.all([
        getAnalyticsData(),
        getNewUsersChartData(),
        getSongListensChartData(),
        getRevenueChartData()
    ]);

    return (
        <div className="w-full space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AnalyticsCard
                    title="Total Users"
                    value={data.totalUsers}
                    subtitle={`${data.activeUsers} active in last 30 days`}
                    icon={<Users className="h-5 w-5" />}
                    colorScheme="blue"
                    trend={{
                        value: Math.round(data.trends.users),
                        isPositive: data.trends.users >= 0
                    }}
                />
                
                <AnalyticsCard
                    title="Total Songs"
                    value={data.totalSongs}
                    subtitle="Available in library"
                    icon={<Music className="h-5 w-5" />}
                    colorScheme="green"
                />
                
                <AnalyticsCard
                    title="Total Albums"
                    value={data.totalAlbums}
                    subtitle="Available in catalog"
                    icon={<Album className="h-5 w-5" />}
                    colorScheme="purple"
                />
                
                <AnalyticsCard
                    title="Total Artists"
                    value={data.totalArtists}
                    subtitle="In the platform"
                    icon={<Mic2 className="h-5 w-5" />}
                    colorScheme="orange"
                />
            </div>
            
            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <NewUsersChart data={newUsersData} />
                <SongListensChart data={songListensData} />
            </div>
            
            {/* Revenue Chart - Full Width */}
            <RevenueChart data={revenueData} />
        </div>
    )
}

export default Page;
