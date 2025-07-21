import { VideoForm } from '@/components/development/form/video-form';
import { getGenreWithoutVideo } from '@/server/genre';


const VideoPage = async() => {
    
    const genre = await getGenreWithoutVideo();
    
    return (
        <div className="flex flex-col items-center py-10 space-y-10" >
            <div className="w-full text-left max-w-md space-y-2">
                <h1 className="text-2xl font-bold text-zinc-800">Safari Genre Video</h1>
                <p className="text-sm text-zinc-700">
                   Add the following details to update the selected genre video. All fields are required.
                </p>
            </div>
            <VideoForm genre={genre} />
        </div>
    )
}

export default VideoPage;