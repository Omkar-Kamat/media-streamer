import { useState, useEffect } from "react"

export default function useRelatedVideos(videoTitle) {

  const [videos, setVideos] = useState([null])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    if (!videoTitle) {
      setVideos([])
      return
    }

    const fetchRelated = async () => {

      try {

        setLoading(true)
        setError(null)

        const url =
          `https://youtube.googleapis.com/youtube/v3/search` +
          `?part=snippet` +
          `&type=video` +
          `&maxResults=7` +
          `&q=${encodeURIComponent(videoTitle)}` +
          `&key=${import.meta.env.VITE_YT_API_KEY}`

        const res = await fetch(url)

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error?.message || "Failed to fetch related videos")
        }

        const formattedVideos =
          data.items
            .slice(1)
            .map(video => ({
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

    fetchRelated()

  }, [videoTitle])

  return { videos, loading, error }
}
