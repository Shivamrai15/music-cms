import { LoaderIcon } from "lucide-react"


const Loader = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <LoaderIcon className="animate-spin"/>
        </div>
    )
}

export default Loader
