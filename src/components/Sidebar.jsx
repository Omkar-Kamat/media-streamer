import React from "react"
import { Link, useLocation } from "react-router-dom"

const styles = {
  sidebar: `
    mt-16
    h-[calc(100vh-4rem)]
    bg-gradient-to-b from-[#0C2B4E] to-[#0A2542]
    shadow-lg shadow-[#0C2B4E]/40
    flex flex-col
    transition-all duration-300
    flex-shrink-0
  `,

  expanded: `
    w-56 sm:w-64
  `,

  collapsed: `
    w-16
  `,

  toggleContainer: `
    flex items-center justify-end
    h-14
    px-3
  `,

  toggleButton: `
    text-[#F4F4F4]
    bg-[#1A3D64]/40
    hover:bg-[#1D546C]
    hover:shadow-md hover:shadow-[#0C2B4E]/40
    px-2 py-1
    rounded-lg
    cursor-pointer
    transition-all duration-200
  `,

  tabContainer: `
    flex flex-col
    mt-3
    gap-1
    px-2
  `,

  tab: `
    flex items-center
    px-3 py-3
    rounded-xl
    text-[#F4F4F4]
    hover:bg-[#1A3D64]
    hover:shadow-md hover:shadow-[#0C2B4E]/30
    cursor-pointer
    transition-all duration-200
    whitespace-nowrap
    overflow-hidden
  `,

  activeTab: `
    bg-[#1A3D64]
    shadow-inner shadow-black/30
  `,

  label: `
    text-sm font-medium
    tracking-wide
  `,

  hiddenLabel: `
    hidden
  `,

  visibleLabel: `
    block
  `
}

export default function Sidebar({ isOpen, setIsOpen }) {

  const location = useLocation()

  const tabs = [
    { name: "Home", path: "/" },
    { name: "Trending", path: "/trending" },
    { name: "Watch History", path: "/watch-history"},
    { name: "Upload", path: "/upload" },
    { name: "Profile", path: "/profile" }
  ]

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.expanded : styles.collapsed}`}>
      
      <div className={styles.toggleContainer}>
        <div
          className={styles.toggleButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>
      </div>

      <div className={styles.tabContainer}>
        {tabs.map((tab, index) => {

          const isActive = location.pathname === tab.path

          return (
            <Link
              key={index}
              to={tab.path}
              className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
            >
              <div className={`${styles.label} ${isOpen ? styles.visibleLabel : styles.hiddenLabel}`}>
                {tab.name}
              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}
