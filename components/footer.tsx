import Link from "next/link"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"

const product = [
  { href: "#features",     label: "Features" },
  { href: "#architecture", label: "Architecture" },
  { href: "#sdk",          label: "SDK" },
  { href: "#api",          label: "API Reference" },
  { href: "/simulation",   label: "Live Demo" },
]

const resources = [
  { href: "https://stellar.org",                                                     label: "Stellar Network",       ext: true },
  { href: "https://soroban.stellar.org",                                              label: "Soroban Docs",          ext: true },
  { href: "https://stellar.expert/explorer/testnet/contract/CDNBMD3AA6QPW4SR2RSG2BO46X4SFKA6N4GLVDEGCANYTBWX57M7YNLD", label: "Contract Explorer",     ext: true },
  { href: "https://github.com/nova-registry",                                        label: "GitHub",                ext: true },
]

const stack = [
  { label: "x402 Protocol",    href: "#" },
  { label: "Soroban Wasm",     href: "#" },
  { label: "Ed25519 / Stellar",href: "#" },
  { label: "NestJS",           href: "#" },
  { label: "Claude AI",        href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden>
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="leading-none">
                <p className="font-bold text-sm text-foreground tracking-tight">
                  Nova <span className="text-primary">Registry</span>
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">SDK · Stellar · x402</p>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Enabling the machine economy through autonomous AI payments and
              on-chain IP registration on Stellar blockchain.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/nova-registry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map(s => (
                <span key={s.label} className="inline-flex items-center px-2.5 py-1 rounded-full border border-border bg-secondary text-xs text-muted-foreground">
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              {product.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resources.map(l => (
                <li key={l.label}>
                  {l.ext ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-50" />
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Nova Registry. Built for{" "}
            <span className="text-foreground font-medium">Stellar Hacks: Agentic AI Hackathon 2026</span>.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>MIT License</span>
            <span>·</span>
            <a
              href="https://stellar.expert/explorer/testnet/contract/CDNBMD3AA6QPW4SR2RSG2BO46X4SFKA6N4GLVDEGCANYTBWX57M7YNLD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              Testnet Live
              <span className="h-1.5 w-1.5 rounded-full bg-success ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
