import { useState, useEffect, useRef, useCallback } from "react"
import VideoGrid from "../components/VideoGrid"

const styles = {
  container: `
    w-full
    min-h-full
    bg-[#F4F4F4]
    flex flex-col
  `,

  error: `
    text-red-600
    text-lg
    font-medium
    px-4 py-2
  `,

  sentinel: `
    w-full
    h-10
  `
}

export default function Home() {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [nextToken, setNextToken] = useState(null)
  const [initialLoad, setInitialLoad] = useState(true)

  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  const fetchVideos = useCallback(async () => {

    if (loading) return

    try {

      setLoading(true)
      setError(null)

      const url =
        `https://www.googleapis.com/youtube/v3/videos` +
        `?part=snippet,statistics` +
        `&chart=mostPopular` +
        `&regionCode=US` +
        `&maxResults=16` +
        `${nextToken ? `&pageToken=${nextToken}` : ""}` +
        `&key=${import.meta.env.VITE_YT_API_KEY}`

      const res = await fetch(url)

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

      setVideos(prev =>
        initialLoad
          ? formattedVideos
          : [...prev, ...formattedVideos]
      )

      setNextToken(data.nextPageToken || null)
      setInitialLoad(false)

    } catch (err) {

      setError(err.message)

    } finally {

      setLoading(false)

    }

  }, [nextToken, loading, initialLoad])

  useEffect(() => {

    fetchVideos()

  }, [])

  useEffect(() => {

    const observer = new IntersectionObserver(
      entries => {

        const entry = entries[0]

        if (entry.isIntersecting && nextToken && !loading) {
          fetchVideos()
        }

      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0
      }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    observerRef.current = observer

    return () => observer.disconnect()

  }, [fetchVideos, nextToken, loading])

  return (
    <div className={styles.container}>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <VideoGrid
        videos={videos}
        loading={initialLoad && loading}
      />

      <div ref={sentinelRef} className={styles.sentinel} />

    </div>
  )
}
