import React from "react"
import { Link } from "react-router-dom"

const styles = {
  card: `
    flex flex-col
    w-full
    cursor-pointer
  `,
  thumbnail: `
    w-full
    aspect-video
    rounded-lg
    object-cover
  `,
  infoContainer: `
    flex flex-col
    mt-3
  `,
  title: `
    text-[#0C2B4E]
    text-sm
    font-semibold
    line-clamp-2
  `,
  channel: `
    text-[#1D546C]
    text-xs
    mt-1
  `,
  views: `
    text-[#1D546C]
    text-xs
    mt-1
  `
}

export default function VideoCard({ video }) {

  return (
    <Link
      to={`/watch/${video.id}`}
      className={styles.card}
    >
      
      <img
        src={video.thumbnail}
        alt={video.videoTitle}
        className={styles.thumbnail}
      />

      <div className={styles.infoContainer}>
        
        <div className={styles.title}>
          {video.videoTitle}
        </div>

        <div className={styles.channel}>
          {video.channelTitle}
        </div>

        <div className={styles.views}>
          {video.viewCount} views
        </div>

      </div>

    </Link>
  )
}
