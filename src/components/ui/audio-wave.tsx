"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const AudioWaveSpinner = () => {
  const animationContainer = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (
      isClient &&
      animationContainer.current &&
      animationContainer.current.childNodes.length === 0
    ) {
      import("lottie-web").then((lottie) => {
        lottie.default.loadAnimation({
          container: animationContainer.current!,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/vMImG9Teup.json", // Update this path if necessary
        })
      })
    }
  }, [isClient])

  return (
    <div ref={animationContainer} className="w-10 h-10 overflow-hidden"></div>
  )
}

export default dynamic(() => Promise.resolve(AudioWaveSpinner), { ssr: false })
