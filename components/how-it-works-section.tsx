"use client"

import { motion } from "framer-motion"
import { Bot, Server, Wallet, FileCheck2, ArrowRight, Sparkles } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Bot,
    title: "AI Agent Creates Music",
    description: "Claude Haiku generates or receives a music file and computes its SHA-256 hash. The agent decides autonomously to protect the IP.",
    detail: "tool_use: register_certificate(hash)",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    glowColor: "rgba(34, 211, 238, 0.3)"
  },
  {
    number: "02",
    icon: Server,
    title: "402 Payment Required",
    description: "The API returns HTTP 402 with payment details: cost ($0.10 USDC), nonce (anti-replay), and Stellar address for payment.",
    detail: "HTTP 402 + PaymentRequirement header",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    glowColor: "rgba(239, 68, 68, 0.3)"
  },
  {
    number: "03",
    icon: Wallet,
    title: "SDK Signs & Pays",
    description: "The Nova SDK intercepts the 402, constructs the payment payload, signs it with Ed25519, and sends to OpenZeppelin for on-chain settlement.",
    detail: "Ed25519 signature + on-chain settlement",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    glowColor: "rgba(251, 191, 36, 0.3)"
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Immutable Registration",
    description: "Payment confirmed, the Soroban smart contract stores the music hash permanently. The agent receives a verifiable certificate.",
    detail: "txHash stored on Stellar ledger",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    glowColor: "rgba(34, 197, 94, 0.3)"
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/0 via-card/50 to-card/0" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4" />
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            How Autonomous Registration{" "}
            <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            From AI decision to blockchain confirmation in milliseconds,
            completely without human intervention.
          </p>
        </motion.div>

        {/* Steps - Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Animated connection line */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-[2px] -translate-y-1/2 z-0 hidden md:block">
            <div className="absolute inset-0 bg-border/50" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-warning to-success"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}
            />
          </div>

          <div className="flex justify-between items-stretch relative z-10 w-full gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center flex-1 px-2 h-full"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative z-10 flex shrink-0 items-center justify-center w-20 h-20 rounded-2xl ${step.bgColor} border-2 ${step.borderColor} bg-background mb-6`}
                  style={{ boxShadow: `0 0 30px ${step.glowColor}` }}
                >
                  <step.icon className={`h-9 w-9 ${step.color}`} />
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-lg ${step.bgColor} ${step.borderColor} border flex items-center justify-center`}>
                    <span className={`text-xs font-mono font-bold ${step.color}`}>{step.number}</span>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex flex-col items-center text-center flex-1 w-full">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{step.description}</p>
                  <code className={`inline-block text-[11px] font-mono ${step.color} ${step.bgColor} px-3 py-1.5 rounded-lg border ${step.borderColor} mt-auto break-all`}>
                    {step.detail}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile Vertical */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 -bottom-8 w-0.5 bg-border/50 z-0">
                  <motion.div
                    className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary to-success"
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              )}

              <div className="flex gap-6 relative z-10">
                {/* Icon */}
                <div className={`relative shrink-0 flex items-center justify-center w-16 h-16 rounded-xl ${step.bgColor} border ${step.borderColor}`}>
                  <step.icon className={`h-7 w-7 ${step.color}`} />
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-md ${step.bgColor} ${step.borderColor} border flex items-center justify-center`}>
                    <span className={`text-[10px] font-mono font-bold ${step.color}`}>{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 pb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                  <code className={`inline-block text-[11px] font-mono break-all ${step.color} ${step.bgColor} px-3 py-1.5 rounded-lg border ${step.borderColor}`}>
                    {step.detail}
                  </code>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
