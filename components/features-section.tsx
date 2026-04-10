"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Brain, CreditCard, FileCheck, Lock, Zap, Globe } from "lucide-react"
import type { MouseEvent } from "react"

const features = [
  {
    icon: Brain,
    title: "Claude AI Powered",
    description: "Leverages Claude Haiku for intelligent decision-making. The agent autonomously decides when and how to register your music IP.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    glowColor: "34, 211, 238"
  },
  {
    icon: CreditCard,
    title: "x402 Protocol",
    description: "Native HTTP payment barriers. When the agent hits a 402 Payment Required response, it automatically handles micropayments.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    glowColor: "139, 92, 246"
  },
  {
    icon: FileCheck,
    title: "Soroban Smart Contracts",
    description: "Immutable registration on Stellar blockchain. Your music hash is permanently recorded with cryptographic proof of timestamp.",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    glowColor: "34, 197, 94"
  },
  {
    icon: Lock,
    title: "Ed25519 Signatures",
    description: "Military-grade cryptography for payment signing. Every transaction is secured with Stellar-native asymmetric encryption.",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    glowColor: "251, 191, 36"
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "Payments settle in milliseconds through OpenZeppelin Facilitator. No waiting for blockchain confirmations during the HTTP flow.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/30",
    glowColor: "168, 85, 247"
  },
  {
    icon: Globe,
    title: "Machine Economy",
    description: "Built for the future where AI agents transact autonomously. No API keys, no subscriptions, just pay-per-use on every request.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    borderColor: "border-chart-5/30",
    glowColor: "34, 211, 238"
  }
]

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative p-6 rounded-2xl border ${feature.borderColor} bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-opacity-60`}
    >
      {/* Spotlight effect on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(${feature.glowColor}, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} border ${feature.borderColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className={`h-7 w-7 ${feature.color}`} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Corner decoration */}
      <div className={`absolute -bottom-2 -right-2 w-24 h-24 rounded-full ${feature.bgColor} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4" />
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Everything AI Agents Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transact
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            A complete ecosystem for autonomous machine-to-machine payments,
            designed specifically for the Stellar blockchain.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
