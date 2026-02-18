import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import VideoGrid from "../components/VideoGrid"
import Pagination from "../components/Pagination"

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

  const [tokens, setTokens] = useState([null])
  const [nextToken, setNextToken] = useState(null)

  const currentToken = tokens[tokens.length - 1]

  useEffect(() => {

    setTokens([null])
    setNextToken(null)

  }, [query])

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

        const url =
          `https://youtube.googleapis.com/youtube/v3/search` +
          `?part=snippet` +
          `&type=video` +
          `&maxResults=12` +
          `&q=${encodeURIComponent(query)}` +
          `${currentToken ? `&pageToken=${currentToken}` : ""}` +
          `&key=${import.meta.env.VITE_YT_API_KEY}`

        const res = await fetch(url)

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

        setNextToken(data.nextPageToken || null)

      } catch (err) {

        setError(err.message)

      } finally {

        setLoading(false)

      }
    }

    fetchSearchResults()

  }, [query, currentToken])

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
