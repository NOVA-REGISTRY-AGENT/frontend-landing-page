"use client"

import { cn } from "@/lib/utils"

interface AuroraProps {
  className?: string
}

export function Aurora({ className }: AuroraProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -inset-[10px] opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 211, 238, 0.3), transparent),
            radial-gradient(ellipse 60% 30% at 80% 50%, rgba(139, 92, 246, 0.15), transparent),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(34, 211, 238, 0.2), transparent)
          `,
        }}
      />
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
    </div>
  )
}
