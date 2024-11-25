import Thumbnails from "./thumbnails";

export default async function Subscriptions(props: {channelVideos: any}) {
    const {channelVideos} = props;
    return (
        <div className="h-full w-full overflow-scroll overflow-x-hidden rounded bg-valentino-700">
            {
                channelVideos.reduce((accum, channelInfo) => {
                    accum.push(channelInfo.items.map(item => {
                        return <Thumbnails
                            key={item.id}
                            id={item?.contentDetails?.videoId}
                            title={item.snippet.title}
                            description={item.snippet.description}
                            thumbnail={item.snippet.thumbnails.medium} />
                    }));
                    return accum;
                }, [])
            }
        </div>
    );
};
