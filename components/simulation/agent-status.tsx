"use client"

import { cn } from "@/lib/utils"
import { Brain, Loader2, CheckCircle2, XCircle, Clock, Cpu } from "lucide-react"
import { motion } from "framer-motion"

export type AgentState = 
  | "idle" 
  | "thinking" 
  | "generating" 
  | "hashing" 
  | "requesting" 
  | "paying" 
  | "registering" 
  | "completed" 
  | "error"

interface AgentStatusProps {
  state: AgentState
  currentStep?: string
  className?: string
}

const stateConfig: Record<AgentState, { label: string; sublabel: string; color: string; bgColor: string; icon: React.ComponentType<{ className?: string }> }> = {
  idle: { label: "Standby", sublabel: "Waiting for command", color: "text-muted-foreground", bgColor: "bg-muted/20", icon: Clock },
  thinking: { label: "Claude is reasoning...", sublabel: "Analyzing music content", color: "text-primary", bgColor: "bg-primary/10", icon: Brain },
  generating: { label: "Generating fingerprint...", sublabel: "Creating unique identifier", color: "text-primary", bgColor: "bg-primary/10", icon: Cpu },
  hashing: { label: "Computing SHA-256...", sublabel: "Creating content hash", color: "text-warning", bgColor: "bg-warning/10", icon: Loader2 },
  requesting: { label: "Connecting to API...", sublabel: "Sending registration request", color: "text-accent", bgColor: "bg-accent/10", icon: Loader2 },
  paying: { label: "Processing payment...", sublabel: "Signing with Ed25519 keypair", color: "text-warning", bgColor: "bg-warning/10", icon: Loader2 },
  registering: { label: "Writing to Soroban...", sublabel: "Invoking smart contract", color: "text-success", bgColor: "bg-success/10", icon: Loader2 },
  completed: { label: "Registration complete", sublabel: "IP successfully protected", color: "text-success", bgColor: "bg-success/10", icon: CheckCircle2 },
  error: { label: "Error occurred", sublabel: "Operation failed", color: "text-destructive", bgColor: "bg-destructive/10", icon: XCircle },
}

export function AgentStatus({ state, className }: AgentStatusProps) {
  const config = stateConfig[state]
  const Icon = config.icon
  const isAnimating = ["thinking", "generating", "hashing", "requesting", "paying", "registering"].includes(state)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 backdrop-blur-sm",
        config.bgColor,
        className
      )}
    >
      {/* Background animation */}
      {isAnimating && (
        <motion.div
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.1) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 100%, rgba(34, 211, 238, 0.1) 150%, transparent 200%)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      <div className="relative flex items-center gap-4 p-5">
        {/* Icon with glow */}
        <div className="relative">
          {isAnimating && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <div
            className={cn(
              "relative flex items-center justify-center w-14 h-14 rounded-xl",
              state === "completed" ? "bg-success/20 border border-success/30" : 
              state === "error" ? "bg-destructive/20 border border-destructive/30" : 
              "bg-card border border-primary/30"
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6",
                config.color,
                isAnimating && state !== "thinking" && "animate-spin"
              )}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <motion.p
            key={config.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn("text-lg font-semibold", config.color)}
          >
            {config.label}
          </motion.p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {config.sublabel}
          </p>
        </div>

        {/* Activity indicator */}
        {isAnimating && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Success checkmark animation */}
        {state === "completed" && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle2 className="h-8 w-8 text-success" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
