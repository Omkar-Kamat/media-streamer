import { useState, useEffect } from "react"
import VideoGrid from "../components/VideoGrid"

const styles = {
  container: `
    w-full
    min-h-full
    bg-[#F4F4F4]
  `,
  error: `
    text-red-600
    text-lg
    font-medium
    px-4 py-2
  `
}

export default function Home() {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchVideos = async () => {

      try {

        setLoading(true)

        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=16&key=${import.meta.env.VITE_YT_API_KEY}`
        )

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error?.message || "API error")
        }

        const formattedVideos = data.items.map(video => ({
          id: video.id,
          channelTitle: video.snippet.channelTitle,
          videoTitle: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high.url,
          viewCount: video.statistics?.viewCount || "0"
        }))

        setVideos(formattedVideos)

      } catch (err) {

        setError(err.message)

      } finally {

        setLoading(false)

      }
    }

    fetchVideos()

  }, [])

  return (
    <div className={styles.container}>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <VideoGrid
        videos={videos}
        loading={loading}
      />

    </div>
  )
}
