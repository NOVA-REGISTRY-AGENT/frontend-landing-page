"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export interface TerminalLine {
  id: string
  type: "input" | "output" | "error" | "success" | "warning" | "info" | "system"
  content: string
  timestamp?: Date
}

interface TerminalProps {
  title: string
  lines: TerminalLine[]
  className?: string
  showTimestamp?: boolean
  maxHeight?: string
  variant?: "default" | "primary" | "accent" | "success"
}

export function Terminal({
  title,
  lines,
  className,
  showTimestamp = false,
  maxHeight = "h-80",
  variant = "default",
}: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [lines])

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-terminal-prompt"
      case "output":
        return "text-terminal-text"
      case "error":
        return "text-terminal-error"
      case "success":
        return "text-terminal-success"
      case "warning":
        return "text-terminal-warning"
      case "info":
        return "text-primary"
      case "system":
        return "text-muted-foreground"
      default:
        return "text-terminal-text"
    }
  }

  const getPrefix = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "$ "
      case "error":
        return "[ERROR] "
      case "success":
        return "[OK] "
      case "warning":
        return "[WARN] "
      case "info":
        return "[INFO] "
      case "system":
        return ">> "
      default:
        return ""
    }
  }

  const getHeaderColor = () => {
    switch (variant) {
      case "primary":
        return "border-primary/30 bg-primary/5"
      case "accent":
        return "border-accent/30 bg-accent/5"
      case "success":
        return "border-success/30 bg-success/5"
      default:
        return "border-border bg-card/50"
    }
  }

  const getGlowStyle = () => {
    switch (variant) {
      case "primary":
        return "shadow-[0_0_30px_rgba(34,211,238,0.1)]"
      case "accent":
        return "shadow-[0_0_30px_rgba(139,92,246,0.1)]"
      case "success":
        return "shadow-[0_0_30px_rgba(34,197,94,0.1)]"
      default:
        return ""
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border overflow-hidden bg-terminal-bg relative",
        getGlowStyle(),
        className
      )}
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10" />

      {/* Terminal header */}
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3 border-b",
          getHeaderColor()
        )}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors" />
          <div className="w-3 h-3 rounded-full bg-warning/80 hover:bg-warning transition-colors" />
          <div className="w-3 h-3 rounded-full bg-success/80 hover:bg-success transition-colors" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-muted-foreground font-mono px-3 py-1 rounded-full bg-background/50">
            {title}
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* Terminal content */}
      <div
        ref={scrollRef}
        className={cn(
          "p-4 overflow-y-auto font-mono text-sm leading-relaxed relative",
          maxHeight
        )}
      >
        {lines.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-terminal-prompt">$</span>
            <span className="w-2.5 h-5 bg-terminal-prompt cursor-blink rounded-sm" />
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3"
                >
                  {showTimestamp && line.timestamp && (
                    <span className="text-muted-foreground/40 text-xs shrink-0 font-mono tabular-nums pt-0.5">
                      {line.timestamp.toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  )}
                  <span
                    className={cn(
                      "whitespace-pre-wrap break-all",
                      getLineColor(line.type)
                    )}
                  >
                    <span className="opacity-50">{getPrefix(line.type)}</span>
                    {line.content}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Active cursor at end */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-terminal-prompt"
            >
              <span>$</span>
              <span className="w-2.5 h-5 bg-terminal-prompt cursor-blink rounded-sm" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-terminal-bg to-transparent pointer-events-none" />
    </div>
  )
}
