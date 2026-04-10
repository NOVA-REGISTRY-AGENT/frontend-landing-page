"use client"

import { cn } from "@/lib/utils"
import { CreditCard, ArrowRight, CheckCircle2, Loader2, Clock, ExternalLink, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export type PaymentState = "pending" | "signing" | "settling" | "confirmed" | "failed"

interface PaymentCardProps {
  state: PaymentState
  amount: string
  from: string
  to: string
  txHash?: string
  className?: string
}

const stateConfig: Record<PaymentState, { label: string; color: string; bgColor: string }> = {
  pending: { label: "Awaiting Payment", color: "text-muted-foreground", bgColor: "bg-muted/20" },
  signing: { label: "Signing with Ed25519...", color: "text-warning", bgColor: "bg-warning/10" },
  settling: { label: "Settling on-chain...", color: "text-primary", bgColor: "bg-primary/10" },
  confirmed: { label: "Payment Confirmed", color: "text-success", bgColor: "bg-success/10" },
  failed: { label: "Payment Failed", color: "text-destructive", bgColor: "bg-destructive/10" },
}

export function PaymentCard({ state, amount, from, to, txHash, className }: PaymentCardProps) {
  const config = stateConfig[state]
  const isProcessing = state === "signing" || state === "settling"

  return (
    <motion.div
      layout
      className={cn(
        "relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-500",
        state === "confirmed" && "border-success/50",
        state === "failed" && "border-destructive/50",
        isProcessing && "border-warning/50",
        state === "pending" && "border-border/50",
        config.bgColor,
        className
      )}
    >
      {/* Background animation for processing states */}
      {isProcessing && (
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.1) 50%, transparent 70%)",
              "linear-gradient(45deg, transparent 50%, rgba(251, 191, 36, 0.1) 70%, transparent 90%)",
              "linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.1) 50%, transparent 70%)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <CreditCard className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground">x402 Payment</span>
              <span className="text-xs text-muted-foreground block">Stellar Network</span>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={state}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn("flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full", config.bgColor, config.color)}
            >
              {isProcessing && <Loader2 className="h-3 w-3 animate-spin" />}
              {state === "confirmed" && <CheckCircle2 className="h-3 w-3" />}
              {state === "pending" && <Clock className="h-3 w-3" />}
              {state === "signing" && <Lock className="h-3 w-3" />}
              <span>{config.label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Amount */}
        <div className="text-center py-6 relative">
          <AnimatePresence mode="wait">
            {state === "confirmed" ? (
              <motion.div
                key="confirmed"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="text-4xl font-bold text-success">{amount}</span>
                <span className="text-lg text-success/70 ml-2">USDC</span>
              </motion.div>
            ) : (
              <motion.div key="amount" initial={{ opacity: 1 }}>
                <span className="text-4xl font-bold text-foreground">{amount}</span>
                <span className="text-lg text-muted-foreground ml-2">USDC</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Processing indicator dots */}
          {isProcessing && (
            <motion.div
              className="flex justify-center gap-1.5 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-warning"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* From/To with visual connection */}
        <div className="relative flex items-center justify-between text-xs pt-4 border-t border-border/50">
          <div className="flex-1">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider">From (Agent)</span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <code className="text-foreground font-mono text-xs">{from}</code>
            </div>
          </div>
          
          <div className="px-4">
            <motion.div
              animate={isProcessing ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <ArrowRight className={cn("h-5 w-5", isProcessing ? "text-warning" : "text-muted-foreground")} />
            </motion.div>
          </div>
          
          <div className="flex-1 text-right">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider">To (Registry)</span>
            <div className="flex items-center gap-1.5 mt-1 justify-end">
              <code className="text-foreground font-mono text-xs">{to}</code>
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
          </div>
        </div>

        {/* Transaction hash */}
        <AnimatePresence>
          {txHash && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Transaction Hash</span>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-mono group"
                >
                  {txHash.slice(0, 8)}...{txHash.slice(-8)}
                  <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
