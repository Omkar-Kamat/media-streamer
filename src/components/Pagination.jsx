import React from "react"

const styles = {
  container: `
    flex
    justify-center
    items-center
    gap-4
    py-6
  `,

  button: `
    px-4 py-2
    bg-[#1D546C]
    text-[#F4F4F4]
    rounded-lg
    border border-[#1A3D64]
    shadow-md shadow-[#0C2B4E]/20
    hover:bg-[#0C2B4E]
    hover:shadow-lg hover:shadow-[#0C2B4E]/40
    transition-all duration-200
    disabled:opacity-40
    disabled:cursor-not-allowed
    disabled:hover:bg-[#1D546C]
  `,

  pageIndicator: `
    text-[#1D546C]
    text-sm
    font-medium
    px-2
  `
}

export default function Pagination({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  page
}) {

  return (
    <div className={styles.container}>

      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={onPrev}
      >
        Previous
      </button>

      <div className={styles.pageIndicator}>
        Page {page}
      </div>

      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
      </button>

    </div>
  )
}
