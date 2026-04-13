"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Brain, CreditCard, FileCheck, Lock, Zap, Music, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const features = [
  {
    icon: Brain,
    title: "AI Track Splitting",
    description:
      "Leverages Claude AI to autonomously analyze music stems, determine ownership splits, and execute registering the correct hashes — fully automated.",
    tag: "AI Agent",
    color: "text-primary",
    bg: "bg-primary/7",
    border: "border-primary/15",
  },
  {
    icon: CreditCard,
    title: "x402 Autopayments",
    description:
      "Native HTTP paywall integration. When the agent hits a 402 Payment Required response for on-chain indexing, the SDK automates the micropayment.",
    tag: "Payments",
    color: "text-accent",
    bg: "bg-accent/7",
    border: "border-accent/15",
  },
  {
    icon: FileCheck,
    title: "Smart Contracts",
    description:
      "Immutable music IP registration on Stellar. Track hashes are permanently recorded on-chain with dual-signature cryptographic proof.",
    tag: "Blockchain",
    color: "text-success",
    bg: "bg-success/7",
    border: "border-success/15",
  },
  {
    icon: Lock,
    title: "Ed25519 Security",
    description:
      "Military-grade cryptography using Ed25519 with Stellar keys. Every AI payment transaction is signed and verified before confirmation.",
    tag: "Security",
    color: "text-warning",
    bg: "bg-warning/7",
    border: "border-warning/15",
  },
  {
    icon: Zap,
    title: "Zero-Click Flow",
    description:
      "Zero configuration required for the music agent. The SDK wraps fetch() with x402 middleware — intercepts, signs, and retries natively.",
    tag: "Automation",
    color: "text-chart-4",
    bg: "bg-chart-4/7",
    border: "border-chart-4/15",
  },
  {
    icon: Music,
    title: "Creator Economy",
    description:
      "Designed for the new generation of autonomous AI artists. No APIs, no human-in-the-loop — agents transact like humans, only faster.",
    tag: "Future-proof",
    color: "text-chart-5",
    bg: "bg-chart-5/7",
    border: "border-chart-5/15",
  },
]

export function FeaturesSection() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Header animation
    gsap.fromTo(
      ".gsap-feat-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".gsap-feat-header",
          start: "top 85%",
        }
      }
    )

    // Grid animation
    gsap.fromTo(
      ".gsap-feat-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    )
  }, { scope: container })

  return (
    <section id="features" ref={container} className="relative py-24 sm:py-32 section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 gsap-feat-header opacity-0">
          <span className="section-label">
            <Zap className="h-3.5 w-3.5" />
            Features
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
            Everything Musical AI Agents Need{" "}
            <span className="gradient-text">to Transact on Stellar</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            A complete ecosystem for autonomous machine-to-machine payments,
            x402 paywalls, and music stem recording — in one TypeScript package.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`gsap-feat-card opacity-0 group relative rounded-2xl border ${f.border} bg-card p-6 card-sdk cursor-default`}
            >
              {/* Tag */}
              <span className={`absolute top-5 right-5 text-[10px] font-semibold uppercase tracking-wider ${f.color} ${f.bg} px-2 py-0.5 rounded-full`}>
                {f.tag}
              </span>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${f.bg} border ${f.border} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
