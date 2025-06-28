import { useState, useEffect } from 'react'

import { InstallationGuide } from './components/InstallationGuide'
import { DemoSection } from './components/DemoSection'
import { Header } from './components/Header'
import { Card } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            CyTube Enhanced Player
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A modern, feature-rich video player replacement for CyTube with enhanced controls, 
            better performance, and seamless synchronization.
          </p>
        </div>

        <Tabs defaultValue="demo" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger value="demo" className="text-white data-[state=active]:bg-blue-600">
              Live Demo
            </TabsTrigger>
            <TabsTrigger value="installation" className="text-white data-[state=active]:bg-blue-600">
              Installation
            </TabsTrigger>
            <TabsTrigger value="features" className="text-white data-[state=active]:bg-blue-600">
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="space-y-8">
            <DemoSection currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
          </TabsContent>

          <TabsContent value="installation">
            <InstallationGuide />
          </TabsContent>

          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Enhanced Controls</h3>
                <p className="text-slate-300">
                  Advanced playback controls with speed adjustment, quality selection, and intuitive UI.
                </p>
              </Card>
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Multi-Source Support</h3>
                <p className="text-slate-300">
                  Supports YouTube, Vimeo, direct video URLs, and more streaming platforms.
                </p>
              </Card>
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Synchronized Playback</h3>
                <p className="text-slate-300">
                  Perfect synchronization with CyTube's room system for seamless group watching.
                </p>
              </Card>
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Responsive Design</h3>
                <p className="text-slate-300">
                  Works perfectly on desktop, tablet, and mobile devices with adaptive layouts.
                </p>
              </Card>
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Performance Optimized</h3>
                <p className="text-slate-300">
                  Lightweight and fast with minimal impact on CyTube's performance.
                </p>
              </Card>
              <Card className="p-6 bg-slate-800 border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Easy Integration</h3>
                <p className="text-slate-300">
                  Simple installation process with detailed documentation and support.
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App