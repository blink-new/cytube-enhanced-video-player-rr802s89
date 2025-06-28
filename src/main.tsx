import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { VideoPlayer } from './components/VideoPlayer'
import './index.css'

function MainPlayer() {
  const [currentVideo, setCurrentVideo] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ url: string }>
      if (custom.detail && custom.detail.url) {
        setCurrentVideo(custom.detail.url)
      }
    }
    const root = document.getElementById('root')
    if (root) root.addEventListener('cytube-enhanced-set-video', handler as EventListener)
    return () => {
      if (root) root.removeEventListener('cytube-enhanced-set-video', handler as EventListener)
    }
  }, [])

  return (
    <VideoPlayer src={currentVideo} title="CyTube Enhanced Player" />
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainPlayer />
  </React.StrictMode>,
)
