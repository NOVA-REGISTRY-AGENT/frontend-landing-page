"use client"

import { cn } from "@/lib/utils"
import { Bot, Server, Wallet, Database, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import type { AgentState } from "./agent-status"

interface FlowDiagramProps {
  currentState: AgentState
  className?: string
}

const steps = [
  { id: "agent", label: "AI Agent", sublabel: "Claude Haiku", icon: Bot, states: ["thinking", "generating", "hashing"] },
  { id: "api", label: "API Server", sublabel: "x402 Middleware", icon: Server, states: ["requesting"] },
  { id: "payment", label: "Payment", sublabel: "Ed25519 Signing", icon: Wallet, states: ["paying"] },
  { id: "blockchain", label: "Soroban", sublabel: "Smart Contract", icon: Database, states: ["registering"] },
  { id: "complete", label: "Complete", sublabel: "IP Registered", icon: CheckCircle2, states: ["completed"] },
]

export function FlowDiagram({ currentState, className }: FlowDiagramProps) {
  const getStepStatus = (step: typeof steps[0]) => {
    if (step.states.includes(currentState)) return "active"
    
    const currentIndex = steps.findIndex(s => s.states.includes(currentState))
    const stepIndex = steps.findIndex(s => s.id === step.id)
    
    if (stepIndex < currentIndex || currentState === "completed") {
      return "completed"
    }
    
    return "pending"
  }

  const getCompletedLineProgress = () => {
    const currentIndex = steps.findIndex(s => s.states.includes(currentState))
    if (currentState === "completed") return 100
    if (currentIndex === -1) return 0
    return (currentIndex / (steps.length - 1)) * 100
  }

  return (
    <div className={cn("relative", className)}>
      {/* Progress line background */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-border hidden sm:block" />
      
      {/* Animated progress line */}
      <motion.div
        className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success hidden sm:block"
        initial={{ width: "0%" }}
        animate={{ width: `${getCompletedLineProgress()}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          boxShadow: "0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3)",
        }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step)
          const Icon = step.icon

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-1 flex flex-row sm:flex-col items-center sm:items-center gap-3 sm:gap-2"
            >
              {/* Glowing ring for active state */}
              {status === "active" && (
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-primary/20 sm:-top-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
              {/* Icon container */}
              <motion.div
                className={cn(
                  "relative z-10 flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-500",
                  status === "active" && "border-primary bg-primary/20 shadow-[0_0_30px_rgba(34,211,238,0.4)]",
                  status === "completed" && "border-success bg-success/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]",
                  status === "pending" && "border-border/50 bg-card"
                )}
                animate={status === "active" ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-300",
                    status === "active" && "text-primary",
                    status === "completed" && "text-success",
                    status === "pending" && "text-muted-foreground/50"
                  )}
                />
              </motion.div>

              {/* Labels */}
              <div className="flex flex-col items-start sm:items-center">
                <span
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300",
                    status === "active" && "text-primary",
                    status === "completed" && "text-success",
                    status === "pending" && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
                <span className="text-xs text-muted-foreground/60 hidden sm:block">
                  {step.sublabel}
                </span>
              </div>

              {/* Step number badge */}
              <div
                className={cn(
                  "absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center sm:hidden",
                  status === "active" && "bg-primary text-primary-foreground",
                  status === "completed" && "bg-success text-success-foreground",
                  status === "pending" && "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
