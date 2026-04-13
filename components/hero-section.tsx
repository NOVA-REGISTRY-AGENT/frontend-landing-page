"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, Shield, Sparkles, AudioWaveform, Headphones, Disc, Terminal, Music } from "lucide-react"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const stats = [
  { icon: AudioWaveform, value: "< 5ms",  label: "Audio Hashing",   color: "text-primary",  bg: "bg-primary/8",  border: "border-primary/15" },
  { icon: Shield,        value: "$0.10",  label: "Per Registration", color: "text-accent",   bg: "bg-accent/8",   border: "border-accent/15" },
  { icon: Disc,          value: "100%",   label: "Immutable Tracks", color: "text-success",  bg: "bg-success/8",  border: "border-success/15" },
]

import Image from "next/image"

export function HeroSection() {
  const container = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    // Smooth GSAP Entrance
    const tl = gsap.timeline()
    tl.fromTo(
      ".gsap-item",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.1 }
    )
    
    // Floating animation
    gsap.to(".card-sdk", {
      y: -10,
      duration: 2.5,
      stagger: { each: 0.2, from: "center" },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // Scroll dot
    gsap.to(".gsap-scroll-dot", {
      y: 12,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })
    
    gsap.fromTo(".gsap-scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.5 })
  }, { scope: container })

  return (
    <section
      id="hero"
      ref={container}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-background"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fondo_portada.png"
          alt="Nova Background"
          fill
          priority
          className="object-cover opacity-[0.08]"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <div className="mb-8 gsap-item opacity-0">
          <span className="badge-sdk">
            <span className="dot-ping">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Music className="h-3 w-3" />
            Music IP Agent Track
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-balance leading-[1.08] gsap-item opacity-0">
          <span className="text-foreground">The SDK for</span>
          <br />
          <span className="gradient-text animate-gradient">Autonomous Music IPs</span>
          <br />
          <span className="text-foreground">on Stellar</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed gsap-item opacity-0">
          One TypeScript SDK gives AI agents the ability to register music stems and albums on-chain —
          automatically handling <span className="font-medium text-foreground">HTTP 402 paywalls</span>,{" "}
          <span className="font-medium text-foreground">Ed25519 signing</span>, and{" "}
          <span className="font-medium text-foreground">Soroban smart contracts</span>.
        </p>

        {/* Install snippet */}
        <div className="mt-10 flex justify-center gsap-item opacity-0">
          <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm hover:shadow-md transition-shadow group">
            <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
            <code className="text-sm font-mono text-foreground">
              npm install{" "}
              <a href="https://www.npmjs.com/package/@nova-registry/sdk-ts" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                @nova-registry/sdk-ts
              </a>
            </code>
            <button
              onClick={() => navigator.clipboard.writeText("npm install @nova-registry/sdk-ts")}
              className="ml-2 text-xs text-muted-foreground hover:text-primary transition-colors font-medium opacity-0 group-hover:opacity-100"
            >
              Copy
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 gsap-item opacity-0">
          <Button
            asChild
            size="lg"
            className="btn-primary px-8 h-11 text-sm font-semibold rounded-lg animate-pulse-glow"
          >
            <Link href="/simulation" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Listen & Verify Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="btn-ghost px-8 h-11 text-sm font-semibold rounded-lg"
          >
            <Link href="#sdk" className="flex items-center gap-2">
              Read the Docs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Trust signals */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground gsap-item opacity-0">
          <span className="flex items-center gap-1.5">
            <AudioWaveform className="h-3.5 w-3.5 text-primary/60" />
            WAV & MP3 Supported
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-warning/80" />
            Claude AI Integration
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-success/70" />
            On-Chain Rights
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto gsap-item opacity-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`card-sdk rounded-2xl p-6 flex flex-col items-center gap-3 ${s.bg} border ${s.border}`}
            >
              <div className={`p-2.5 rounded-xl bg-white/70 border border-white shadow-sm`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold tracking-tight ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="gsap-scroll-indicator opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-9 rounded-full border border-border/70 flex items-start justify-center p-1.5">
          <div
            className="gsap-scroll-dot w-1 h-1 rounded-full bg-primary"
          />
        </div>
      </div>
    </section>
  )
}
