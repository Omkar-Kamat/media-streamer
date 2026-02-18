import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useRelatedVideos from "../hooks/useRelatedVideo"

const WATCH_HISTORY_KEY = "streamhub_watch_history"
const MAX_HISTORY = 50

const styles = {
  container: `
    w-full
    grid
    grid-cols-1
    lg:grid-cols-[1fr_360px]
    gap-6
  `,

  playerSection: `
    flex flex-col
    w-full
  `,

  playerFrame: `
    w-full
    aspect-video
    rounded-xl
    overflow-hidden
    bg-[#0C2B4E]
    border border-[#1A3D64]
    shadow-lg shadow-[#0C2B4E]/40
  `,

  iframe: `
    w-full
    h-full
  `,

  metaCard: `
    mt-4
    bg-[#F4F4F4]
    rounded-xl
    p-4
    shadow-md shadow-[#0C2B4E]/10
  `,

  title: `
    text-[#0C2B4E]
    text-lg
    font-semibold
    leading-snug
  `,

  channelRow: `
    flex items-center
    gap-3
    mt-4
  `,

  profileImage: `
    w-10 h-10
    rounded-full
    object-cover
    border border-[#1A3D64]
  `,

  channelName: `
    text-[#1D546C]
    text-sm
    font-medium
  `,

  description: `
    text-[#1D546C]
    text-sm
    mt-3
    leading-relaxed
    line-clamp-4
  `,

  sidebar: `
    hidden lg:flex
    flex-col
    gap-4
  `,

  recommendationCard: `
    flex gap-3
    bg-[#F4F4F4]
    rounded-xl
    p-2
    shadow-md shadow-[#0C2B4E]/10
    hover:shadow-lg hover:shadow-[#0C2B4E]/20
    transition-all duration-200
    cursor-pointer
  `,

  recThumbnail: `
    w-40
    aspect-video
    rounded-lg
    object-cover
    bg-[#1A3D64]
  `,

  recMeta: `
    flex flex-col
    justify-center
    flex-1
  `,

  recTitle: `
    text-[#0C2B4E]
    text-sm
    font-medium
    line-clamp-2
  `,

  recChannel: `
    text-[#1D546C]
    text-xs
    mt-1
  `,

  recTitleShimmer: `
    h-4
    bg-[#1D546C]
    rounded
    animate-pulse
    w-full
  `,

  recChannelShimmer: `
    h-3
    bg-[#1D546C]
    rounded
    animate-pulse
    w-2/3
    mt-2
  `,

  shimmerFrame: `
    w-full
    aspect-video
    bg-[#1A3D64]
    animate-pulse
    rounded-xl
  `,

  shimmerTextLarge: `
    h-5
    bg-[#1D546C]
    rounded
    w-3/4
    mt-4
    animate-pulse
  `,

  shimmerCircle: `
    w-10 h-10
    rounded-full
    bg-[#1D546C]
    animate-pulse
  `,

  shimmerTextSmall: `
    h-4
    bg-[#1D546C]
    rounded
    w-1/2
    animate-pulse
  `
}

export default function Watch() {

  const { id } = useParams()

  const [videoDetails, setVideoDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  const { videos: relatedVideos, loading: relatedLoading } =
    useRelatedVideos(videoDetails?.title)

  const saveWatchHistory = (video, channelImage) => {

    if (!video) return

    const entry = {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      channelTitle: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.high.url,
      channelImage,
      watchedAt: Date.now()
    }

    const existing =
      JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY)) || []

    const filtered =
      existing.filter(item => item.id !== entry.id)

    const updated =
      [entry, ...filtered].slice(0, MAX_HISTORY)

    localStorage.setItem(
      WATCH_HISTORY_KEY,
      JSON.stringify(updated)
    )
  }

  useEffect(() => {

    const fetchVideoAndChannel = async () => {

      try {

        setLoading(true)

        const videoRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${import.meta.env.VITE_YT_API_KEY}`
        )

        const videoData = await videoRes.json()

        const video = videoData.items[0]

        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=${import.meta.env.VITE_YT_API_KEY}`
        )

        const channelData = await channelRes.json()

        const channel = channelData.items[0]

        const details = {
          title: video.snippet.title,
          description: video.snippet.description,
          channelTitle: video.snippet.channelTitle,
          channelImage: channel.snippet.thumbnails.default.url
        }

        setVideoDetails(details)

        saveWatchHistory(video, details.channelImage)

      } finally {

        setLoading(false)

      }
    }

    fetchVideoAndChannel()

  }, [id])

  const embedUrl =
    `https://www.youtube.com/embed/${id}` +
    `?autoplay=1` +
    `&controls=1` +
    `&color=white` +
    `&rel=0` +
    `&playsinline=1` +
    `&iv_load_policy=3`

  return (
    <div className={styles.container}>

      <div className={styles.playerSection}>

        {loading ? (
          <>
            <div className={styles.shimmerFrame}></div>

            <div className={styles.metaCard}>

              <div className={styles.shimmerTextLarge}></div>

              <div className={styles.channelRow}>
                <div className={styles.shimmerCircle}></div>
                <div className={styles.shimmerTextSmall}></div>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className={styles.playerFrame}>

              <iframe
                className={styles.iframe}
                src={embedUrl}
                allowFullScreen
              />

            </div>

            <div className={styles.metaCard}>

              <div className={styles.title}>
                {videoDetails?.title}
              </div>

              <div className={styles.channelRow}>

                <img
                  src={videoDetails?.channelImage}
                  className={styles.profileImage}
                />

                <div className={styles.channelName}>
                  {videoDetails?.channelTitle}
                </div>

              </div>

              <div className={styles.description}>
                {videoDetails?.description}
              </div>

            </div>
          </>
        )}

      </div>

      <div className={styles.sidebar}>

        {relatedLoading
          ? Array(6).fill(0).map((_, index) => (

              <div key={index} className={styles.recommendationCard}>

                <div className={styles.recThumbnail}></div>

                <div className={styles.recMeta}>
                  <div className={styles.recTitleShimmer}></div>
                  <div className={styles.recChannelShimmer}></div>
                </div>

              </div>

            ))
          : relatedVideos?.map(video =>{
              console.log(video);
            return (
              <Link
                key={video.id}
                to={`/watch/${video.id}`}
                className={styles.recommendationCard}
              >

                <img
                  src={video.thumbnail}
                  className={styles.recThumbnail}
                />

                <div className={styles.recMeta}>

                  <div className={styles.recTitle}>
                    {video.videoTitle}
                  </div>

                  <div className={styles.recChannel}>
                    {video.channelTitle}
                  </div>

                </div>

              </Link>

            )})
        }

      </div>

    </div>
  )
}
