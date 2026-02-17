import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import VideoGrid from "../components/VideoGrid"

const styles = {
  container: `
    w-full
    min-h-full
  `,
  heading: `
    text-[#0C2B4E]
    text-lg
    font-semibold
    mb-6
  `,
  error: `
    text-red-600
    text-lg
    font-medium
  `
}

export default function Search() {

  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    if (!query) {
      setVideos([])
      setLoading(false)
      return
    }

    const fetchSearchResults = async () => {

      try {

        setLoading(true)
        setError(null)

        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${query}&key=${import.meta.env.VITE_YT_API_KEY}`
        )

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error?.message || "Search failed")
        }

        const formattedVideos = data.items.map(video => ({
          id: video.id.videoId,
          videoTitle: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
          thumbnail: video.snippet.thumbnails.high.url,
          viewCount: ""
        }))

        setVideos(formattedVideos)

      } catch (err) {

        setError(err.message)

      } finally {

        setLoading(false)

      }
    }

    fetchSearchResults()

  }, [query])

  return (
    <div className={styles.container}>

      {query && (
        <div className={styles.heading}>
          Search results for "{query}"
        </div>
      )}

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
