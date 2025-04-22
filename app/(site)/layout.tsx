import { Sidebar } from "@/components/sidebar"

interface LayoutPageProps {
    children : React.ReactNode
}

const LayoutPage = ({
    children
} : LayoutPageProps ) => {
    return (
        <div className="flex h-full w-full">
            <Sidebar/>
            <main className="h-full w-[calc(100%-16rem)] p-6 bg-zinc-50 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}

export default LayoutPage