import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"

interface LayoutPageProps {
    children : React.ReactNode
}

const LayoutPage = ({
    children
} : LayoutPageProps ) => {
    return (
        <div className="flex h-full w-full">
            <div className="h-full w-64 p-6 overflow-y-auto border-r border-zinc-200 max-md:hidden">
                <Sidebar/>
            </div>
            <main className="h-full w-full md:w-[calc(100%-16rem)] p-6 bg-zinc-50 overflow-y-auto">
                <Topbar />
                {children}
            </main>
        </div>
    )
}

export default LayoutPage