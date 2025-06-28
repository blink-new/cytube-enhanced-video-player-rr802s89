// ==UserScript==
// @name         CyTube Inject Enhanced Player
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Injects the enhanced React player from your live site into CyTube
// @author       You
// @match        https://cytu.be/*
// @match        https://*.cytu.be/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // URL of your live React player bundle
  const playerUrl = 'https://cytube-enhanced-video-player-rr802s89.live.blink.new/assets/index-DAk9sLCk.js';
  const playerCssUrl = 'https://cytube-enhanced-video-player-rr802s89.live.blink.new/assets/index-BAn12H4p.css';

  // Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = playerCssUrl;
  document.head.appendChild(link);

  // Inject root container
  const playerRoot = document.createElement('div');
  playerRoot.id = 'root';
  playerRoot.style.position = 'fixed';
  playerRoot.style.top = '10px';
  playerRoot.style.right = '10px';
  playerRoot.style.width = '400px';
  playerRoot.style.height = '225px';
  playerRoot.style.zIndex = '9999';
  document.body.appendChild(playerRoot);

  // Inject React player script
  const script = document.createElement('script');
  script.type = 'module';
  script.src = playerUrl;
  document.body.appendChild(script);

  // TODO: Add logic to hide CyTube default player and sync video URLs
})();
