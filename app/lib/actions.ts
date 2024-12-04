'use server'

import { google } from "googleapis";
import { revalidatePath } from "next/cache";

const youtube = google.youtube({
    version: "v3",
    key: process.env.GOOGLE_API_KEY
});

export const getYoutube = async () => {
    return youtube;
};

export const getVideos = async () => {
    // const {data } = subs; //await youtube.subscriptions.list({ key: process.env.GOOGLE_API_KEY, part: ['snippet'], channelId: 'UCsS7SwtOUQfgISr0yZKb_Vg'});
    const {data } = await youtube.subscriptions.list({ key: process.env.GOOGLE_API_KEY, part: ['snippet'], channelId: 'UCsS7SwtOUQfgISr0yZKb_Vg'});

    const subscriptionChannelIds = data?.items?.map(item => {
        return item?.snippet?.resourceId?.channelId || '';
    });

    const channelData: any = await youtube.channels.list({
        key: process.env.GOOGLE_API_KEY,
        id: subscriptionChannelIds,
        part: ['contentDetails']
    });

    const uploadChannelId = channelData.data.items.map(item => item.contentDetails.relatedPlaylists.uploads);

    if(uploadChannelId.length) {
        const channels = await Promise.all(uploadChannelId.map(id =>
            youtube.playlistItems.list({
                key: process.env.GOOGLE_API_KEY,
                part: ['snippet,contentDetails'],
                playlistId: id,
                maxResults: 5
            })));

        return channels.map(channel => channel.data);
    }
    return [];
};

export const getVideo = async (id) => {
    const details = await youtube.videos.list({
        id: [id],
        key: process.env.GOOGLE_API_KEY,
        part: ['snippet,player'],
        maxHeight: 320,
        maxWidth: 700
    });

    return details.data;
};

export const addTodo = async () => {
    revalidatePath('/', 'page');
}

