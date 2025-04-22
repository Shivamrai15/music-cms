import { VideoForm } from '@/components/development/form/video-form';
import { getGenreWithoutVideo } from '@/server/genre';


const VideoPage = async() => {
    
    const genre = await getGenreWithoutVideo();
    
    return (
        <div className='h-full flex items-center justify-center  py-10'>
            <VideoForm genre={genre} />
        </div>
    )
}

export default VideoPage;