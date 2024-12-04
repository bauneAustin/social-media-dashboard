import { getVideos } from "./lib/actions";
import Subscriptions from "./ui/youtube/subscriptions";
import Video from "./ui/youtube/video";
import { useSearchParams } from "next/navigation";
import TodoGrid from "./ui/todo/todoGrid";
import AddMenu from "./ui/todo/addMenu";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const vid = (await searchParams).vid
  const channelVideos: any = await getVideos();
  const defaultVideoId = channelVideos[0]?.items[0]?.snippet?.resourceId?.videoId;

  return (
    <div className="flex min-h-screen flex-col p-6 pl-20 bg-valentino-950">
      <main className="flex flex-col h-full gap-8 items-center sm:items-start text-slate-50">
        <div className="text-3xl">
          <h1>Media Dashboard</h1>
        </div>
        <div className="flex flex-row bg-valentino-900 rounded w-full h-96 outline outlnie-4 outline-valentino-900">
          <div className="">
            <Video videoId={vid || defaultVideoId} />
          </div>
          <div className="h-full overflow-hidden p-4">
            <Subscriptions channelVideos={channelVideos} />
          </div>
        </div>
        <div className='flex flex-row w-full h-full rounded bg-valentino-900 outline outlnie-4 outline-valentino-900'>
          <TodoGrid />
        </div>
      </main>
    </div>
  );
}
