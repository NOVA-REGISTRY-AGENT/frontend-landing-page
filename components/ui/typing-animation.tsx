"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  text: string
  duration?: number
  className?: string
  delay?: number
  onComplete?: () => void
}

export function TypingAnimation({
  text,
  duration = 50,
  className,
  delay = 0,
  onComplete,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStarted(true)
    }, delay)
    
    return () => clearTimeout(delayTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
        onComplete?.()
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [text, duration, started, onComplete])

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-pulse" />
    </span>
  )
}
