"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number | string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) || 0 : value
  const isDecimal = String(value).includes(".")
  const hasLessThan = String(value).startsWith("<")

  useEffect(() => {
    if (!isInView) return
    
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0
    
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutProgress = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = numericValue * easeOutProgress
      
      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(2))
      } else {
        setDisplayValue(Math.floor(currentValue).toString())
      }
      
      if (currentStep >= steps) {
        clearInterval(timer)
        if (isDecimal) {
          setDisplayValue(numericValue.toFixed(2))
        } else {
          setDisplayValue(numericValue.toString())
        }
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [isInView, numericValue, duration, isDecimal])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {hasLessThan && "<"}
      {displayValue}
      {suffix}
    </span>
  )
}
