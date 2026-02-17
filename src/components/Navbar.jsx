import React from "react"

const styles = {
  navbar: `
    fixed top-0 left-0 w-full h-16
    bg-[#0C2B4E]
    flex items-center justify-between
    px-3 sm:px-4 md:px-6 lg:px-10
    z-50
  `,
  leftSection: `
    flex items-center gap-2 sm:gap-3
    cursor-pointer
    flex-shrink-0
  `,
  logo: `
    text-[#F4F4F4]
    text-base sm:text-lg md:text-xl lg:text-2xl
    font-bold tracking-wide
  `,
  centerSection: `
    flex items-center justify-center
    flex-1
    max-w-[200px] sm:max-w-sm md:max-w-md lg:max-w-2xl
    mx-2 sm:mx-4 md:mx-6
  `,
  searchContainer: `
    flex items-center w-full
    bg-[#1A3D64]
    border border-[#1D546C]
    rounded-full overflow-hidden
    focus-within:border-[#F4F4F4]
    transition
  `,
  searchInput: `
    flex-1 bg-transparent
    px-3 sm:px-4 md:px-5
    py-1.5 sm:py-2
    text-[#F4F4F4]
    outline-none
    placeholder-[#F4F4F4]/60
    text-sm sm:text-base
  `,
  searchButton: `
    px-3 sm:px-4 md:px-6
    py-1.5 sm:py-2
    bg-[#1D546C]
    text-[#F4F4F4]
    hover:bg-[#1A3D64]
    transition font-medium
    text-sm sm:text-base
  `,
  rightSection: `
    flex items-center gap-2 sm:gap-3 md:gap-4
    flex-shrink-0
  `,
  uploadButton: `
    hidden sm:block
    px-3 md:px-4 lg:px-5
    py-1.5 md:py-2
    bg-[#F4F4F4]
    text-[#0C2B4E]
    rounded-full font-semibold
    hover:bg-[#1D546C]
    hover:text-[#F4F4F4]
    transition
    text-sm md:text-base
  `,
  profileButton: `
    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
    bg-[#1D546C]
    rounded-full
    hover:bg-[#1A3D64]
    transition cursor-pointer
  `
}

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          StreamX
        </div>
      </div>

      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.uploadButton}>
          Upload
        </button>
        <div className={styles.profileButton}></div>
      </div>

    </div>
  )
}

export default Navbar