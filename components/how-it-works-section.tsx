"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Disc, Server, Wallet, FileCheck2, Layers, ArrowDown, ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CONTRACT_ID = "CDNBMD3AA6QPW4SR2RSG2BO46X4SFKA6N4GLVDEGCANYTBWX57M7YNLD"
const ADMIN_ADDRESS = "GC6XSCIHDDZYO46E2VKCCFH7SEPGZACWO6YX4ARN7ALVACGAL2NRKIR4"
const EXPLORER_URL = `https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`

const steps = [
  {
    number: "01",
    icon: Disc,
    title: "AI Musician Compiles Track",
    description:
      "Claude Haiku generates a final music compilation and computes its SHA-256 hash. The agent calls registerAsset() from the SDK to claim the IP.",
    detail: "sdk.registerAsset({ contentHash: 'sha256:...' })",
    color: "text-primary",
    bg: "bg-primary/8",
    border: "border-primary/20",
  },
  {
    number: "02",
    icon: Server,
    title: "402 Payment Required",
    description:
      "The NextJS backend responds with HTTP 402, including payment details: amount ($0.10 USDC), nonce, expiresAt, and Stellar indexing address.",
    detail: "HTTP 402 · payment_required · USDC 0.10",
    color: "text-destructive",
    bg: "bg-destructive/8",
    border: "border-destructive/20",
  },
  {
    number: "03",
    icon: Wallet,
    title: "OpenZeppelin Facilitator",
    description:
      "The agent triggers the OpenZeppelin L402 plugin proxy via the testnet facilitator. It negotiates the payment terms and provides the signed authorization token.",
    detail: "GET .../plugins/x402/call/supported",
    color: "text-accent",
    bg: "bg-accent/8",
    border: "border-accent/20",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Immutable IP Record",
    description:
      "Admin validates payment and co-signs. The smart contract stores the music track's hash with owner + admin dual-authorization.",
    detail: "register_hash(hash, owner) · dual-auth",
    color: "text-success",
    bg: "bg-success/8",
    border: "border-success/20",
  },
]

const layers = [
  {
    emoji: "🎵",
    label: "AI Musician",
    sublabel: "nova-agent",
    desc: "Claude Haiku · Stem generation & IP decisions",
    color: "border-primary/20 bg-primary/4",
  },
  {
    emoji: "📦",
    label: "TypeScript SDK",
    sublabel: "@nova-registry/sdk-ts",
    desc: "OpenZeppelin facilitator · x402 middleware",
    color: "border-accent/20 bg-accent/4",
  },
  {
    emoji: "🔧",
    label: "Backend API",
    sublabel: "nova-backend",
    desc: "402 validation · payment verification",
    color: "border-warning/20 bg-warning/4",
  },
  {
    emoji: "⛓️",
    label: "IP Smart Contract",
    sublabel: "nova-registry-contracts",
    desc: "register_hash · dual-auth · music storage",
    color: "border-success/20 bg-success/4",
  },
]

export function HowItWorksSection() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".gsap-arch-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        }
      }
    )

    gsap.fromTo(
      ".gsap-arch-step",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gsap-arch-step",
          start: "top 80%",
        }
      }
    )

    gsap.fromTo(
      ".gsap-arch-right",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gsap-arch-right",
          start: "top 80%",
        }
      }
    )
  }, { scope: container })

  return (
    <section id="architecture" ref={container} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 line-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 gsap-arch-header opacity-0">
          <span className="section-label">
            <Layers className="h-3.5 w-3.5" />
            Architecture
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
            From Musical Creation to{" "}
            <span className="gradient-text">Blockchain Rights</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            A 4-step autonomous flow — from music generation to immutable Soroban rights record.
            No human intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Steps */}
          <div className="space-y-5">
            {steps.map((s, i) => (
              <div
                key={s.number}
                className={`gsap-arch-step opacity-0 relative rounded-2xl border ${s.border} bg-card p-5 card-sdk`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${s.bg} border ${s.border}`}>
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-6 mt-2 arch-connector" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold ${s.color} ${s.bg} px-2 py-0.5 rounded-md border ${s.border}`}>
                        {s.number}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {s.description}
                    </p>
                    <code className={`inline-block text-[11px] font-mono break-all ${s.color} ${s.bg} px-2.5 py-1 rounded-lg border ${s.border}`}>
                      {s.detail}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Architecture stack */}
          <div className="space-y-5">
            <div className="gsap-arch-right opacity-0 rounded-2xl border border-border bg-card p-6 card-sdk">
              <h4 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                Polyrepo Architecture
              </h4>
              <div className="space-y-2">
                {layers.map((l, i) => (
                  <div key={l.label}>
                    <div className={`arch-layer rounded-xl p-4 border ${l.color}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl" role="img" aria-label={l.label}>{l.emoji}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{l.label}</span>
                            <code className="contract-id hidden sm:inline-block">{l.sublabel}</code>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{l.desc}</p>
                        </div>
                      </div>
                    </div>
                    {i < layers.length - 1 && (
                      <div className="flex justify-center my-1">
                        <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live contract info */}
            <div className="gsap-arch-right opacity-0 rounded-2xl border border-success/20 bg-success/4 p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-semibold text-success uppercase tracking-wider">Live on Testnet</span>
              </div>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-muted-foreground mb-1 font-medium">Contract ID</dt>
                  <dd>
                    <code className="contract-id block text-[11px] text-foreground break-all">
                      {CONTRACT_ID}
                    </code>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground mb-1 font-medium">Admin (Backend API)</dt>
                  <dd>
                    <code className="contract-id block text-[11px] text-foreground break-all">
                      {ADMIN_ADDRESS}
                    </code>
                  </dd>
                </div>
              </dl>
              <a
                href={EXPLORER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-success hover:underline underline-offset-2 transition-colors"
              >
                View on Stellar Expert
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
