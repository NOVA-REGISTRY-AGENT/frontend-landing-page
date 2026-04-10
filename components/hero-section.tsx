"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, Shield, Cpu, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Particles } from "@/components/ui/particles"
import { Aurora } from "@/components/ui/aurora"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { GlowingCard } from "@/components/ui/glowing-card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <Aurora />
      <Particles
        className="absolute inset-0"
        quantity={80}
        staticity={40}
        color="#22d3ee"
        ease={80}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-sm text-primary font-medium tracking-wide">
                Stellar Hacks 2026 Hackathon
              </span>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
          >
            <span className="text-foreground">The First Autonomous</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              AI Payment Agent
            </span>
            <br />
            <span className="text-foreground">on Stellar</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            AI agents that reason, pay, and register intellectual property autonomously.
            No credit cards. No subscriptions. Just machine-to-machine micropayments
            powered by the <span className="text-primary font-medium">x402 protocol</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="glow-primary animate-pulse-glow px-8 h-12 text-base font-medium"
            >
              <Link href="/simulation" className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch Live Demo
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 h-12 text-base font-medium border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
            >
              <Link href="#how-it-works" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <GlowingCard
              className="p-8"
              containerClassName="transform hover:scale-105 transition-transform duration-300"
              glowColor="rgba(34, 211, 238, 0.2)"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={5} prefix="<" suffix="ms" />
                </span>
                <span className="text-sm text-muted-foreground mt-1">Payment Latency</span>
              </div>
            </GlowingCard>

            <GlowingCard
              className="p-8"
              containerClassName="transform hover:scale-105 transition-transform duration-300"
              glowColor="rgba(139, 92, 246, 0.2)"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <span className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={0.10} prefix="$" />
                </span>
                <span className="text-sm text-muted-foreground mt-1">Per Registration</span>
              </div>
            </GlowingCard>

            <GlowingCard
              className="p-8"
              containerClassName="transform hover:scale-105 transition-transform duration-300"
              glowColor="rgba(34, 197, 94, 0.2)"
            >
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-xl bg-success/10 border border-success/20 mb-4">
                  <Cpu className="h-6 w-6 text-success" />
                </div>
                <span className="text-3xl font-bold text-foreground">
                  <AnimatedCounter value={100} suffix="%" />
                </span>
                <span className="text-sm text-muted-foreground mt-1">Autonomous</span>
              </div>
            </GlowingCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
