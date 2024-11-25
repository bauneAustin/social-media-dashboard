'use client';
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
export default function Thumbnails(props: { thumbnail: any, title: string, description: string | undefined, id: string }) {
    const {thumbnail, title, description, id} = props;
    const pathname = usePathname();
    const router = useRouter();

    const onVideoClick = () => {
        const params = new URLSearchParams();
        params.set('vid', id);
        router.push(pathname + '?'+ params.toString());
    }
    return (
        <div className="flex flex-row m-4 cursor-pointer" onClick={onVideoClick}>
            <Image
                alt="Thumbnail"
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
            />
            <div className="flex flex-col m-3 w-full rounded p-6 bg-valentino-600">
                <span className='text-2xl font-bold'>{title}</span>
                <p className='font-semibold w-full h-18 line-clamp-3 mt-4'>{description}</p>
            </div>
        </div>
    );
};
