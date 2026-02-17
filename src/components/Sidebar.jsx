import React from "react"
import { Link, useLocation } from "react-router-dom"

const styles = {
  sidebar: `
    mt-16
    h-[calc(100vh-4rem)]
    bg-[#0C2B4E]
    border-r border-[#1A3D64]
    flex flex-col
    transition-all duration-300
    flex-shrink-0
  `,
  expanded: `
    w-56 sm:w-64
  `,
  collapsed: `
    w-14
  `,
  toggleContainer: `
    flex items-center justify-end
    h-14
    px-3
  `,
  toggleButton: `
    text-[#F4F4F4]
    hover:bg-[#1A3D64]
    px-2 py-1
    rounded
    cursor-pointer
    transition
  `,
  tabContainer: `
    flex flex-col
    mt-2
    gap-1
    px-2
  `,
  tab: `
    flex items-center
    px-3 py-3
    rounded-lg
    text-[#F4F4F4]
    hover:bg-[#1D546C]
    cursor-pointer
    transition
    whitespace-nowrap
    overflow-hidden
  `,
  activeTab: `
    bg-[#1D546C]
  `,
  label: `
    text-sm font-medium
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
    { name: "Trending", path: "/" },
    { name: "Watch", path: "/" },
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
