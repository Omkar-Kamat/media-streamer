import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const styles = {
  navbar: `
    fixed top-0 left-0 w-full h-16
    bg-gradient-to-b from-[#0C2B4E] to-[#0A2542]
    border-b border-[#1A3D64]
    shadow-lg shadow-[#0C2B4E]/40
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
    hover:text-white
    transition-colors duration-200
  `,

  centerSection: `
    flex items-center justify-center
    flex-1
    max-w-[200px] sm:max-w-sm md:max-w-md lg:max-w-2xl
    mx-2 sm:mx-4 md:mx-6
  `,

  searchContainer: `
    flex items-center w-full
    bg-[#1A3D64]/60
    border border-[#1D546C]
    rounded-full
    overflow-hidden
    shadow-inner shadow-black/30
    focus-within:shadow-md focus-within:shadow-[#0C2B4E]/40
    transition-all duration-200
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
    border-l border-[#1A3D64]
    text-[#F4F4F4]
    hover:bg-[#163F55]
    hover:shadow-inner hover:shadow-black/30
    transition-all duration-200
    font-medium
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
    rounded-full
    font-semibold
    border border-transparent
    shadow-md shadow-[#0C2B4E]/20
    hover:bg-[#1D546C]
    hover:text-[#F4F4F4]
    hover:border-[#1A3D64]
    hover:shadow-lg hover:shadow-[#0C2B4E]/40
    transition-all duration-200
    text-sm md:text-base
  `,

  profileButton: `
    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
    bg-[#1D546C]
    border border-[#1A3D64]
    rounded-full
    shadow-md shadow-[#0C2B4E]/20
    hover:bg-[#163F55]
    hover:shadow-lg hover:shadow-[#0C2B4E]/40
    transition-all duration-200
    cursor-pointer
  `
}

const Navbar = () => {

  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()

    const trimmed = query.trim()

    if (!trimmed) return

    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className={styles.navbar}>
      
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          StreamHub
        </Link>
      </div>

      <form
        className={styles.centerSection}
        onSubmit={handleSearch}
      >
        <div className={styles.searchContainer}>
          
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />

          <button
            type="submit"
            className={styles.searchButton}
          >
            Search
          </button>

        </div>
      </form>

      <div className={styles.rightSection}>
        <Link to="/upload" className={styles.uploadButton}>
          Upload
        </Link>
        <Link to="/profile" className={styles.profileButton}></Link>
      </div>

    </div>
  )
}

export default Navbar
