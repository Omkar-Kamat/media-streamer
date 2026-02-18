import React from "react"
import VideoCard from "./VideoCard"
import ShimmerCard from "./ShimmerCard"

const styles = {
  grid: `
    w-full
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-x-6
    gap-y-8
    transition-all duration-300
  `,

  item: `
    transform
    transition-transform duration-200
  `
}

export default function VideoGrid({ videos, loading }) {

  const items = loading
    ? Array(12).fill(null)
    : videos

  return (
    <div className={styles.grid}>

      {items.map((video) => (
        <div key={video?.id} className={styles.item}>
          
          {loading
            ? <ShimmerCard />
            : <VideoCard video={video} />
          }

        </div>
      ))}

    </div>
  )
}
