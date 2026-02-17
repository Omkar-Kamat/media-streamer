import React, { useState } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

const styles = {
  layout: `
    h-screen
    overflow-hidden
    bg-[#F4F4F4]
  `,
  body: `
    flex
    h-full
  `,
  main: `
    flex-1
    mt-16
    h-[calc(100vh-4rem)]
    overflow-y-auto
    p-4 sm:p-6 md:p-8
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
