import React, { useState, useMemo, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

const STORAGE_KEY = "streamhub_search_history"
const MAX_HISTORY = 10

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
  `,

  centerSection: `
    relative
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
  `,

  searchInput: `
    flex-1 bg-transparent
    px-4 py-2
    text-[#F4F4F4]
    outline-none
  `,

  searchButton: `
    px-4 py-2
    bg-[#1D546C]
    text-[#F4F4F4]
  `,

  suggestionBox: `
    absolute
    top-full
    mt-2
    w-full
    bg-[#0C2B4E]
    border border-[#1A3D64]
    rounded-lg
    shadow-lg shadow-black/40
    overflow-hidden
    z-50
  `,

  suggestionItem: `
    px-4 py-2
    text-[#F4F4F4]
    hover:bg-[#1D546C]
    cursor-pointer
  `,

  rightSection: `
    flex items-center gap-3
  `,

  uploadButton: `
    hidden sm:block
    px-4 py-2
    bg-[#F4F4F4]
    text-[#0C2B4E]
    rounded-full
  `,

  profileButton: `
    w-9 h-9
    bg-[#1D546C]
    rounded-full
  `
}

export default function Navbar() {

  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const [history, setHistory] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const history = () =>{const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setHistory(JSON.parse(stored))
    }}
    history();
  }, [])

  const suggestions = useMemo(() => {

    if (!query.trim()) return history

    return history.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    )

  }, [query, history])

  const saveSearch = (term) => {

    let newHistory = history.filter(item => item !== term)

    newHistory.unshift(term)

    if (newHistory.length > MAX_HISTORY) {
      newHistory = newHistory.slice(0, MAX_HISTORY)
    }

    setHistory(newHistory)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
  }

  const handleSearch = (e) => {

    e.preventDefault()

    const trimmed = query.trim()

    if (!trimmed) return

    saveSearch(trimmed)

    setShowSuggestions(false)

    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const handleSuggestionClick = (term) => {

    setQuery(term)

    saveSearch(term)

    setShowSuggestions(false)

    navigate(`/search?q=${encodeURIComponent(term)}`)
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
            value={query}
            placeholder="Search"
            className={styles.searchInput}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />

          <button
            type="submit"
            className={styles.searchButton}
          >
            Search
          </button>

        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestionBox}>

            {suggestions.map((item, index) => (
              <div
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </div>
            ))}

          </div>
        )}

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
