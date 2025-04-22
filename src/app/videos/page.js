// app/videos/page.js (SSR + CSR YouTube video listeleme)
import VideoListClient from './VideoListClient';
import './videos.css';

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
    const channelId = "UCxzvHwrzD7qld4JzuoI9frA"; // doğru hali
    const apiKey = process.env.YOUTUBE_API_KEY;

    // 1. Kanalın uploads playlist ID'sini al
    const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );
    const channelData = await channelRes.json();

    const uploadsId =
        channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsId) {
        return <div className="videoContainer"><h2>Kanal bulunamadı</h2></div>;
    }

    // 2. Uploads playlistinden ilk 10 videoyu al
    const playlistRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=10&key=${apiKey}`
    );
    const playlistData = await playlistRes.json();

    const initialVideos = playlistData?.items || [];
    const nextPageToken = playlistData?.nextPageToken || null;

    return (
        <div className="videoContainer">
            <h2>Videolar</h2>
            <VideoListClient
                initialVideos={initialVideos}
                nextPageToken={nextPageToken}
                uploadsId={uploadsId}
            />
        </div>
    );
}
