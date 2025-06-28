import { useState, useEffect } from 'react'
import { VideoPlayer } from './components/VideoPlayer'

function SimplePlayer() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <VideoPlayer src={currentVideo} title="CyTube Enhanced Player" />
      </div>
    </div>
  )
}

export default SimplePlayer