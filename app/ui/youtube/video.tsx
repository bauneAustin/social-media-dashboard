import { getVideo } from "@/app/lib/actions";
import parse from 'html-react-parser';
export default async function Video (props: {videoId: string} ) {
    const {videoId} = props;
    const data: any = await getVideo(videoId);
    return (
        <div className="flex justify-center mt-4 ml-6 mr-8">
            <div className="bg-valentino-700 p-4 rounded">
                {parse(data?.items[0]?.player.embedHtml)}
            </div>
        </div>
    );
};
