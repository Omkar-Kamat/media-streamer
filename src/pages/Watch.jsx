import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const styles = {
  container: `
    w-full
    grid
    grid-cols-1
    lg:grid-cols-[1fr_320px]
    gap-6
  `,
  playerSection: `
    flex flex-col
    w-full
  `,
  iframe: `
    w-full
    aspect-video
    rounded-lg
  `,
  title: `
    text-[#0C2B4E]
    text-lg
    font-semibold
    mt-4
  `,
  channelRow: `
    flex items-center
    gap-3
    mt-3
  `,
  profileImage: `
    w-10 h-10
    rounded-full
    object-cover
  `,
  channelName: `
    text-[#1D546C]
    text-sm
    font-medium
  `,
  sidebar: `
    hidden lg:flex
    flex-col
    gap-4
  `,
  shimmerBox: `
    w-full
    aspect-video
    bg-[#1A3D64]
    animate-pulse
    rounded-lg
  `,
  shimmerCircle: `
    w-10 h-10
    rounded-full
    bg-[#1D546C]
    animate-pulse
  `,
  shimmerTextLarge: `
    h-5
    bg-[#1D546C]
    rounded
    w-3/4
    mt-4
    animate-pulse
  `,
  shimmerTextSmall: `
    h-4
    bg-[#1D546C]
    rounded
    w-1/2
    animate-pulse
  `,
  shimmerSidebarItem: `
    w-full
    h-24
    bg-[#1A3D64]
    rounded-lg
    animate-pulse
  `
}

export default function Watch() {

  const { id } = useParams()

  const [videoDetails, setVideoDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchVideoAndChannel = async () => {

      try {

        setLoading(true)

        const videoRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${import.meta.env.VITE_YT_API_KEY}`
        )

        const videoData = await videoRes.json()

        const video = videoData.items[0]

        const channelId = video.snippet.channelId

        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${import.meta.env.VITE_YT_API_KEY}`
        )

        const channelData = await channelRes.json()

        const channel = channelData.items[0]

        setVideoDetails({
          title: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
          channelImage: channel.snippet.thumbnails.default.url
        })

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }
    }

    fetchVideoAndChannel()

  }, [id])

  return (
    <div className={styles.container}>

      <div className={styles.playerSection}>

        {loading ? (
          <>
            <div className={styles.shimmerBox}></div>
            <div className={styles.shimmerTextLarge}></div>

            <div className={styles.channelRow}>
              <div className={styles.shimmerCircle}></div>
              <div className={styles.shimmerTextSmall}></div>
            </div>
          </>
        ) : (
          <>
            <iframe
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${id}`}
              allowFullScreen
            />

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
          </>
        )}

      </div>

      <div className={styles.sidebar}>
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className={styles.shimmerSidebarItem}></div>
        ))}
      </div>

    </div>
  )
}
