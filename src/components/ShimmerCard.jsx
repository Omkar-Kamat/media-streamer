import React from "react"

const styles = {
  card: `
    flex flex-col
    w-full
    animate-pulse
  `,
  thumbnail: `
    w-full
    aspect-video
    bg-[#1A3D64]
    rounded-lg
  `,
  infoContainer: `
    flex flex-col
    mt-3
    gap-2
  `,
  title: `
    h-4
    bg-[#1D546C]
    rounded
    w-11/12
  `,
  subtitle: `
    h-3
    bg-[#1D546C]
    rounded
    w-7/12
  `,
  views: `
    h-3
    bg-[#1D546C]
    rounded
    w-5/12
  `
}

export default function ShimmerCard() {

  return (
    <div className={styles.card}>
      
      <div className={styles.thumbnail}></div>

      <div className={styles.infoContainer}>
        <div className={styles.title}></div>
        <div className={styles.subtitle}></div>
        <div className={styles.views}></div>
      </div>

    </div>
  )
}
