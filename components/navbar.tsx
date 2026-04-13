"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X, Github, ExternalLink, ChevronRight, Music } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#features",     label: "Features" },
  { href: "#architecture", label: "Architecture" },
  { href: "#sdk",          label: "SDK" },
  { href: "#api",          label: "API" },
  { href: "/simulation",   label: "Live Demo", external: false },
]

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-[0_1px_0_oklch(0_0_0/0.05)]"
          : "bg-white/0"
      )}
    >
      {/* Announcement bar */}
      <div className="announcement-bar border-b border-border/60 hidden sm:block bg-[#F8F9FA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-xs">
          <Music className="h-3 w-3 text-primary" />
          <span className="text-muted-foreground">
            <span className="text-foreground font-medium">Music IP Registration</span>
            {" · "}Nova Registry SDK is live for AI-Agent Musicians
          </span>
          <a
            href="#sdk"
            className="inline-flex items-center gap-0.5 text-primary font-medium hover:underline underline-offset-2 transition-colors"
          >
            Get started
            <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" id="nav-logo">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105 border border-border">
              <Image 
                src="/nova_sdk.png" 
                alt="Nova SDK Logo" 
                width={32} 
                height={32} 
                className="object-cover"
              />
            </div>
            <div className="leading-none">
              <p className="font-bold text-sm text-foreground tracking-tight">
                Nova <span className="text-primary">Registry</span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">
                Music IP · Stellar · x402
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-md transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/NOVA-REGISTRY-AGENT/nova-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-150"
            >
              <Github className="h-4 w-4" />
              <span className="hidden lg:inline font-medium">GitHub</span>
            </a>
            <div className="h-4 w-px bg-border" />
            <Button
              asChild
              size="sm"
              className="btn-primary h-8 px-4 text-sm font-medium rounded-lg"
            >
              <Link href="/simulation">Live Demo</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
