"use client"

import { useEffect } from 'react'

export default function BookingWidget() {
  useEffect(() => {
    // Check if script is already loaded
    if (!document.querySelector('script[src="https://collegemastermind.trafft.com/embed.js"]')) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://collegemastermind.trafft.com/embed.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div 
      className="embedded-booking" 
      data-url="https://collegemastermind.trafft.com" 
      data-query="&t=s&uuid=dac35b76-c97a-438f-a112-e5bf52318eb4" 
      data-lang="en" 
      data-autoresize="0" 
      data-showsidebar="1" 
      style={{ minWidth: '320px', height: '768px' }}
    />
  )
}