import { useState } from 'react'
import { VideoPlayer } from './VideoPlayer'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface DemoSectionProps {
  currentVideo: string
  setCurrentVideo: (video: string) => void
}

export function DemoSection({ currentVideo, setCurrentVideo }: DemoSectionProps) {
  const [customUrl, setCustomUrl] = useState('')

  const sampleVideos = [
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Big Buck Bunny',
      description: 'Open source animated short film'
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: 'Elephants Dream',
      description: 'Creative Commons animated film'
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'For Bigger Blazes',
      description: 'Sample video content'
    }
  ]

  const handleLoadCustomVideo = () => {
    if (customUrl.trim()) {
      setCurrentVideo(customUrl.trim())
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <VideoPlayer 
          src={currentVideo} 
          title={sampleVideos.find(v => v.url === currentVideo)?.title || 'Custom Video'}
        />
      </div>

      {/* Controls Panel */}
      <div className="space-y-6">
        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">Video Source</h3>
          
          <Tabs defaultValue="samples" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="samples" className="text-white data-[state=active]:bg-blue-600">
                Samples
              </TabsTrigger>
              <TabsTrigger value="custom" className="text-white data-[state=active]:bg-blue-600">
                Custom URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="samples" className="space-y-3">
              {sampleVideos.map((video, index) => (
                <div key={index} className="space-y-2">
                  <Button
                    variant={currentVideo === video.url ? "default" : "outline"}
                    className={`w-full justify-start text-left ${
                      currentVideo === video.url 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                    onClick={() => setCurrentVideo(video.url)}
                  >
                    <div>
                      <div className="font-medium">{video.title}</div>
                      <div className="text-xs opacity-80">{video.description}</div>
                    </div>
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div>
                <Label htmlFor="custom-url" className="text-white">Video URL</Label>
                <Input
                  id="custom-url"
                  type="url"
                  placeholder="https://example.com/video.mp4"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="mt-2 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Button 
                onClick={handleLoadCustomVideo}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!customUrl.trim()}
              >
                Load Video
              </Button>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6 bg-slate-800 border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">Player Features</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Custom video controls
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Speed adjustment (0.5x - 2x)
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Volume control & mute
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Skip forward/backward (10s)
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Fullscreen support
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Progress bar with seeking
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Responsive design
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}