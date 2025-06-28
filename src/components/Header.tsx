import { Github, Download } from 'lucide-react'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CP</span>
          </div>
          <span className="text-white font-semibold text-lg">CyTube Player</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#demo" className="text-slate-300 hover:text-white transition-colors">
            Demo
          </a>
          <a href="#installation" className="text-slate-300 hover:text-white transition-colors">
            Install
          </a>
          <a href="#features" className="text-slate-300 hover:text-white transition-colors">
            Features
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </header>
  )
}