import React from "react"
import VideoCard from "./VideoCard"
import ShimmerCard from "./ShimmerCard"

const styles = {
  grid: `
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-6
    w-full
  `
}

export default function VideoGrid({ videos, loading }) {

  return (
    <div className={styles.grid}>

      {loading
        ? Array(12).fill(0).map((_, index) => (
            <ShimmerCard key={index} />
          ))
        : videos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))
      }

    </div>
  )
}
