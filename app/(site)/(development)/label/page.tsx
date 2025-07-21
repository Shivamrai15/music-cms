import { LabelForm } from "@/components/development/form/label-form"

const LabelPage = async() => {
    
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari Labels</h1>
                <p className="text-sm text-zinc-700">Fill in the required fields below to add a new label to the database. A label is a company that produces music.</p>
            </div>
            <LabelForm/>
        </div>
    )
}

export default LabelPage