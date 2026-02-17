import Layout from "./Layout"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Upload from "./pages/Upload"
import Profile from "./pages/Profile"
import { Route, Routes } from 'react-router-dom'
import Trending from "./pages/Trending"
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/trending" element={<Trending/>}/>
        <Route path="/watch/:id" element={<Watch/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Layout>
  )
}
