import { useState } from 'react'
import { Copy, Check, Code, Download, Settings, Zap } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'

export function InstallationGuide() {
  const [copiedStep, setCopiedStep] = useState<string | null>(null)

  const handleCopy = async (text: string, stepId: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedStep(stepId)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const userscriptCode = `// ==UserScript==
// @name         CyTube Enhanced Video Player
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Enhanced video player for CyTube with better controls and performance
// @author       CyTube Enhanced Team
// @match        https://cytu.be/*
// @match        https://*.cytu.be/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Enhanced player injection code
    const enhancedPlayerCSS = \`
        .enhanced-player {
            position: relative;
            background: #000;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .enhanced-controls {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            padding: 16px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .enhanced-player:hover .enhanced-controls {
            opacity: 1;
        }
    \`;
    
    // Inject styles
    const style = document.createElement('style');
    style.textContent = enhancedPlayerCSS;
    document.head.appendChild(style);
    
    // Replace default player
    function replacePlayer() {
        const playerContainer = document.getElementById('videowrap');
        if (playerContainer && !playerContainer.classList.contains('enhanced')) {
            playerContainer.classList.add('enhanced', 'enhanced-player');
            console.log('CyTube Enhanced Player: Player replaced successfully');
        }
    }
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replacePlayer);
    } else {
        replacePlayer();
    }
    
    // Also replace when navigating within CyTube
    const observer = new MutationObserver(replacePlayer);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
})();`

  const bookmarkletCode = `javascript:(function(){
    const script = document.createElement('script');
    script.src = 'https://your-cdn.com/cytube-enhanced-player.js';
    document.head.appendChild(script);
    alert('CyTube Enhanced Player loaded!');
})();`

  const browserExtensionSteps = [
    {
      title: "Download Extension",
      description: "Download the TamperMonkey browser extension",
      code: "Chrome Web Store / Firefox Add-ons"
    },
    {
      title: "Install Extension",
      description: "Click 'Add to Chrome' or 'Add to Firefox' to install"
    },
    {
      title: "Visit CyTube",
      description: "Navigate to any CyTube room and the enhanced player will activate automatically"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Installation Guide</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Choose your preferred installation method to start using the enhanced video player on CyTube.
        </p>
      </div>

      <Tabs defaultValue="userscript" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="userscript" className="text-white data-[state=active]:bg-blue-600">
            <Code className="w-4 h-4 mr-2" />
            Userscript
          </TabsTrigger>
          <TabsTrigger value="extension" className="text-white data-[state=active]:bg-blue-600">
            <Download className="w-4 h-4 mr-2" />
            Extension
          </TabsTrigger>
          <TabsTrigger value="bookmarklet" className="text-white data-[state=active]:bg-blue-600">
            <Zap className="w-4 h-4 mr-2" />
            Bookmarklet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="userscript" className="space-y-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Userscript Installation</h3>
              <Badge variant="secondary" className="bg-green-600">Recommended</Badge>
            </div>
            <p className="text-slate-300 mb-6">
              Install via Tampermonkey, Greasemonkey, or any userscript manager.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white font-medium">Step 1: Install a Userscript Manager</h4>
                <p className="text-slate-300 text-sm">
                  Install Tampermonkey (Chrome/Firefox) or Greasemonkey (Firefox) from your browser's extension store.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium">Step 2: Add the Script</h4>
                <p className="text-slate-300 text-sm">
                  Copy the script below and create a new userscript in your manager:
                </p>
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto max-h-64">
                    <code>{userscriptCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    onClick={() => handleCopy(userscriptCode, 'userscript')}
                    className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600"
                  >
                    {copiedStep === 'userscript' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium">Step 3: Save & Activate</h4>
                <p className="text-slate-300 text-sm">
                  Save the script and make sure it's enabled. The enhanced player will activate automatically on CyTube.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="extension" className="space-y-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Browser Extension</h3>
              <Badge variant="secondary" className="bg-blue-600">Easy Install</Badge>
            </div>
            <p className="text-slate-300 mb-6">
              One-click installation from your browser's extension store.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-slate-700 border-slate-600">
                <h4 className="text-white font-medium mb-2">Download Extension</h4>
                <p className="text-slate-300 text-sm mb-4">
                  Download the TamperMonkey browser extension
                </p>
                <a
                  href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Add Tampermonkey to Chrome"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Add to Chrome
                  </Button>
                </a>
              </Card>

              <Card className="p-4 bg-slate-700 border-slate-600">
                <h4 className="text-white font-medium mb-2">Download Extension</h4>
                <p className="text-slate-300 text-sm mb-4">
                  Download the TamperMonkey browser extension
                </p>
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Add Tampermonkey to Firefox"
                >
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Download className="w-4 h-4 mr-2" />
                    Add to Firefox
                  </Button>
                </a>
              </Card>
            </div>

            <div className="mt-6 space-y-4">
              {browserExtensionSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{step.title}</h4>
                    <p className="text-slate-300 text-sm">{step.description}</p>
                    {step.code && (
                      <code className="text-xs bg-slate-900 text-blue-400 px-2 py-1 rounded mt-1 inline-block">
                        {step.code}
                      </code>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarklet" className="space-y-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Bookmarklet</h3>
              <Badge variant="secondary" className="bg-purple-600">Quick Access</Badge>
            </div>
            <p className="text-slate-300 mb-6">
              Add a bookmark that instantly loads the enhanced player on any CyTube page.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white font-medium">Bookmarklet Code</h4>
                <p className="text-slate-300 text-sm">
                  Drag this link to your bookmarks bar or copy the code:
                </p>
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{bookmarkletCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    onClick={() => handleCopy(bookmarkletCode, 'bookmarklet')}
                    className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600"
                  >
                    {copiedStep === 'bookmarklet' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-medium">How to Use</h4>
                <ol className="list-decimal list-inside text-slate-300 text-sm space-y-1">
                  <li>Copy the bookmarklet code above</li>
                  <li>Create a new bookmark in your browser</li>
                  <li>Paste the code as the bookmark URL</li>
                  <li>Name it "CyTube Enhanced Player"</li>
                  <li>Click the bookmark when on any CyTube page</li>
                </ol>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700">
        <div className="flex items-start space-x-4">
          <Settings className="w-6 h-6 text-blue-400 mt-1" />
          <div>
            <h3 className="text-white font-semibold mb-2">Need Help?</h3>
            <p className="text-slate-300 text-sm mb-4">
              If you encounter any issues during installation or have questions about the enhanced player, 
              check our troubleshooting guide or contact our support team.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                Documentation
              </Button>
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                Support
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}