import React, { useState, useEffect } from "react"
import VideoGrid from "../components/VideoGrid"

const WATCH_HISTORY_KEY = "streamhub_watch_history"

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

  empty: `
    text-[#1D546C]
    text-sm
  `
}

export default function WatchHistory() {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const history = () =>{
        const stored =
      JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY)) || []

    const formatted = stored.map(video => ({
      id: video.id,
      videoTitle: video.title,
      channelTitle: video.channelTitle,
      thumbnail: video.thumbnail,
      viewCount: ""
    }))

    setVideos(formatted)

    setLoading(false)
    }
    history();
  }, [])

  return (
    <div className={styles.container}>

      <div className={styles.heading}>
        Watch History
      </div>

      {!loading && videos.length === 0 && (
        <div className={styles.empty}>
          No watch history yet
        </div>
      )}

      <VideoGrid
        videos={videos}
        loading={loading}
      />

    </div>
  )
}
