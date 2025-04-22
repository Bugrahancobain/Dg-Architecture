'use client';

import React, { useState } from 'react';

export default function VideoListClient({ initialVideos, nextPageToken: initialToken, uploadsId }) {
    const [videos, setVideos] = useState(initialVideos);
    const [nextPageToken, setNextPageToken] = useState(initialToken);
    const [loadingMore, setLoadingMore] = useState(false);

    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const fetchMore = async () => {
        if (!nextPageToken) return;

        setLoadingMore(true);

        try {
            const res = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=10&pageToken=${nextPageToken}&key=${apiKey}`
            );
            const data = await res.json();

            if (data.items) {
                setVideos((prev) => [...prev, ...data.items]);
                setNextPageToken(data.nextPageToken || null);
            }
        } catch (error) {
            console.error("Video yüklenirken hata oluştu:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <>
            {videos.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "40px", fontWeight: "500", fontSize: "18px" }}>
                    Şu anda gösterilecek video bulunmuyor...
                </p>
            ) : (
                <div className="videoGrid">
                    {videos.map((video, index) => (
                        <div key={video.id + index} className="videoItem">
                            <iframe
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video.snippet.title}
                            ></iframe>
                            <p>{video.snippet.title}</p>
                        </div>
                    ))}
                </div>
            )}

            {nextPageToken && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={fetchMore}
                        disabled={loadingMore}
                        className="loadMoreBtn"
                    >
                        {loadingMore ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
                    </button>
                </div>
            )}
        </>
    );
}
