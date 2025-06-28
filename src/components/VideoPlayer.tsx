import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { Card } from './ui/card'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  src: string
  title?: string
}

export function VideoPlayer({ src, title = "Video Player" }: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5) // react-player volume is 0-1
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    // Reset states when src changes
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setIsLoading(true)
    setHasError(false)
  }, [src])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds)
  }
  const handleDuration = (duration: number) => setDuration(duration)
  const handleEnded = () => setIsPlaying(false)
  const handleError = () => setHasError(true)
  const handleReady = () => setIsLoading(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const seekTo = (value[0] / 100) * duration
    playerRef.current?.seekTo(seekTo, 'seconds')
    setCurrentTime(seekTo)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.5) // Restore to a default volume
      setIsMuted(false)
    } else {
      setVolume(0)
      setIsMuted(true)
    }
  }

  const skipTime = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
    playerRef.current?.seekTo(newTime, 'seconds')
    setCurrentTime(newTime)
  }

  const toggleFullscreen = () => {
    const playerElement = playerRef.current?.wrapperRef.current
    if (playerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        playerElement.requestFullscreen()
      }
    }
  }

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="bg-black overflow-hidden group">
      <div className="relative aspect-video">
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <div className="text-center text-white p-8">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-2">Unable to Play Video</h3>
              <p className="text-slate-400 text-sm">
                The provided URL could not be loaded or is not supported.
              </p>
            </div>
          </div>
        ) : (
          <>
            <ReactPlayer
              ref={playerRef}
              url={src}
              playing={isPlaying}
              volume={volume}
              muted={isMuted}
              playbackRate={playbackRate}
              width="100%"
              height="100%"
              onPlay={handlePlay}
              onPause={handlePause}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onEnded={handleEnded}
              onError={handleError}
              onReady={handleReady}
              config={{
                youtube: {
                  playerVars: { showinfo: 1, enablejsapi: 1, origin: window.location.origin }
                },
                vimeo: {
                  playerOptions: { controls: 1 }
                }
              }}
            />

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-lg">
                Loading video...
              </div>
            )}

            {/* Controls Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 z-20 ${showControls ? 'opacity-100' : 'opacity-0'}`}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-black/50 hover:bg-black/70 text-white"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                {/* Progress Bar */}
                <div className="space-y-1">
                  <Slider
                    value={[duration ? (currentTime / duration) * 100 : 0]}
                    onValueChange={handleSeek}
                    className="w-full"
                    max={100}
                    step={0.1}
                  />
                  <div className="flex justify-between text-xs text-white/80">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => skipTime(-10)}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => skipTime(10)}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <div className="w-20">
                        <Slider
                          value={[volume * 100]}
                          onValueChange={handleVolumeChange}
                          max={100}
                          step={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={playbackRate}
                      onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                      className="bg-black/50 text-white text-xs rounded px-2 py-1 border border-white/20"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Video Title */}
      <div className="p-4 bg-slate-900">
        <h3 className="text-white font-medium">{title}</h3>
      </div>
    </Card>
  )
}