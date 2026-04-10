"use client"

import { useSimulation } from "@/hooks/use-simulation"
import { Terminal } from "@/components/simulation/terminal"
import { AgentStatus } from "@/components/simulation/agent-status"
import { PaymentCard } from "@/components/simulation/payment-card"
import { CertificateCard } from "@/components/simulation/certificate-card"
import { FlowDiagram } from "@/components/simulation/flow-diagram"
import { Button } from "@/components/ui/button"
import { Particles } from "@/components/ui/particles"
import Link from "next/link"
import { Play, RotateCcw, ArrowLeft, Zap, Bot, Server, Database, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function SimulationPage() {
  const {
    agentState,
    paymentState,
    agentLines,
    apiLines,
    blockchainLines,
    isRunning,
    certificate,
    runSimulation,
    resetSimulation,
    wallets,
  } = useSimulation()

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg opacity-20" />
      <Particles
        className="fixed inset-0 opacity-50"
        quantity={40}
        staticity={60}
        color="#22d3ee"
        ease={100}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm hidden sm:inline">Back</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
                  <span className="text-primary font-mono text-sm font-bold">N</span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-foreground tracking-tight block">
                    Live <span className="text-primary">Simulation</span>
                  </span>
                  <span className="text-xs text-muted-foreground">Autonomous AI Agent Demo</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isRunning && agentState !== "completed" && (
                <Button onClick={runSimulation} className="glow-primary animate-pulse-glow">
                  <Play className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Start Simulation</span>
                  <span className="sm:hidden">Start</span>
                </Button>
              )}
              {(agentState === "completed" || agentLines.length > 0) && !isRunning && (
                <Button onClick={resetSimulation} variant="outline" className="border-border/50">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
              {isRunning && (
                <div className="flex items-center gap-3 text-sm text-primary px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  </span>
                  <span className="font-medium">Running...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
        >
          <h2 className="text-sm font-medium text-muted-foreground mb-6 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Autonomous Registration Flow
          </h2>
          <FlowDiagram currentState={agentState} />
        </motion.div>

        {/* Agent Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <AgentStatus state={agentState} />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Terminals Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                AI Agent (Claude Haiku + Nova SDK)
              </h3>
              <Terminal
                title="agent@nova-registry:~"
                lines={agentLines}
                showTimestamp
                maxHeight="h-72"
                variant="primary"
              />
            </motion.div>

            {/* API Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-accent/10">
                  <Server className="h-4 w-4 text-accent" />
                </div>
                API Server (Express + x402 Middleware)
              </h3>
              <Terminal
                title="api@nova-registry:~"
                lines={apiLines}
                showTimestamp
                maxHeight="h-56"
                variant="accent"
              />
            </motion.div>

            {/* Blockchain Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-success/10">
                  <Database className="h-4 w-4 text-success" />
                </div>
                Blockchain (Soroban + BullMQ Worker)
              </h3>
              <Terminal
                title="worker@stellar-testnet:~"
                lines={blockchainLines}
                showTimestamp
                maxHeight="h-56"
                variant="success"
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                x402 Payment Status
              </h3>
              <PaymentCard
                state={paymentState}
                amount="0.10"
                from={wallets.agent}
                to={wallets.registry}
                txHash={paymentState === "confirmed" ? certificate?.txHash : undefined}
              />
            </motion.div>

            {/* Certificate */}
            {certificate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-success" />
                  Issued Certificate
                </h3>
                <CertificateCard {...certificate} />
              </motion.div>
            )}

            {/* Info Card when idle */}
            {agentState === "idle" && agentLines.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6"
              >
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  About This Demo
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Watch an autonomous AI agent register music intellectual property
                  on the Stellar blockchain. The simulation demonstrates:
                </p>
                <ul className="text-sm text-muted-foreground space-y-3">
                  {[
                    "Claude AI deciding to protect music IP",
                    "SHA-256 hash computation",
                    "HTTP 402 payment barrier detection",
                    "Autonomous Ed25519 payment signing",
                    "Soroban smart contract registration",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button
                  onClick={runSimulation}
                  className="w-full mt-6 glow-primary animate-pulse-glow h-12"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Simulation
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
        >
          <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Technical Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "AI Engine", value: "Claude 3.5 Haiku", color: "text-primary" },
              { label: "Payment Protocol", value: "x402 + Ed25519", color: "text-warning" },
              { label: "Smart Contracts", value: "Soroban (Rust)", color: "text-accent" },
              { label: "Settlement", value: "OpenZeppelin", color: "text-success" },
            ].map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                <p className={`font-semibold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
