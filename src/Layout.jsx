import React, { useState } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

const styles = {
  layout: `
    bg-[#F4F4F4]
    min-h-screen
  `,
  body: `
    flex
  `,
  main: `
    flex-1
    mt-16
    p-4 sm:p-6 md:p-8
    transition-all duration-300
  `
}

export default function Layout({ children }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className={styles.layout}>
      
      <Navbar />

      <div className={styles.body}>
        
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        <main className={styles.main}>
          {children}
        </main>

      </div>

    </div>
  )
}