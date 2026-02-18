import { useState, useEffect } from "react"
import VideoGrid from "../components/VideoGrid"
import Pagination from "../components/Pagination"

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
  `
}

export default function Home() {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [tokens, setTokens] = useState([null])
  const [nextToken, setNextToken] = useState(null)

  const currentToken = tokens[tokens.length - 1]

  useEffect(() => {

    const fetchVideos = async () => {

      try {

        setLoading(true)
        setError(null)

        const url =
          `https://www.googleapis.com/youtube/v3/videos` +
          `?part=snippet,statistics` +
          `&chart=mostPopular` +
          `&regionCode=US` +
          `&maxResults=16` +
          `${currentToken ? `&pageToken=${currentToken}` : ""}` +
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

        setVideos(formattedVideos)

        setNextToken(data.nextPageToken || null)

      } catch (err) {

        setError(err.message)

      } finally {

        setLoading(false)

      }
    }

    fetchVideos()

  }, [currentToken])

  const handleNext = () => {

    if (!nextToken) return

    setTokens(prev => [...prev, nextToken])
  }

  const handlePrev = () => {

    if (tokens.length <= 1) return

    setTokens(prev => prev.slice(0, -1))
  }

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

      <Pagination
        hasPrev={tokens.length > 1}
        hasNext={!!nextToken}
        onPrev={handlePrev}
        onNext={handleNext}
        page={tokens.length}
      />

    </div>
  )
}
