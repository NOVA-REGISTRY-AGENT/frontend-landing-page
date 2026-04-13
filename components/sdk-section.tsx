"use client"

import { useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Copy, Check, Terminal, Package, Code2, Sparkles, ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const quickstart = `import { NovaRegistrySDK } from '@nova-registry/sdk-ts';
import crypto from 'node:crypto';

const sdk = new NovaRegistrySDK({
  stellarSecret: process.env.AGENT_STELLAR_SECRET!,
  registryUrl:   'https://api.novaregistry.com',
  network:       'testnet',
  timeoutMs:     20_000,
});

async function protectMusic() {
  const audio  = Buffer.from('...binary_audio...');
  const hash   = crypto.createHash('sha256')
                       .update(audio).digest('hex');

  // 402 is handled automatically — SDK signs & retries
  const receipt = await sdk.registerAsset({
    contentHash: \`sha256:\${hash}\`,
    fileName:    'cybernetic-lullaby.wav',
    title:       'Cybernetic Lullaby',
    artist:      'Nova Agent',
    metadata: {
      genre:   'Synthwave',
      aiModel: 'Claude Haiku',
    },
  });

  console.log('requestId:', receipt.requestId);

  const status = await sdk.getRegistrationStatus(receipt.requestId);
  console.log('txHash:', status.txHash);
}

protectMusic();`

const errorHandling = `import { NovaRegistrySDK, NovaRegistryError }
  from '@nova-registry/sdk-ts';

try {
  const cert = await sdk.getCertificate(certificateId);
  console.log('On-chain since:', cert.registeredAt);

} catch (error) {
  if (error instanceof NovaRegistryError) {
    console.error('HTTP status:', error.status);
    console.error('Details:',    error.details);
  } else if (error.message.includes('timed out')) {
    console.error('Network timeout — increase timeoutMs');
  } else {
    throw error;
  }
}`

const checkHash = `// Verify if a hash is already registered
const result = await sdk.getCertificateByHash(
  'sha256:a1b2c3d4...'
);

if (result.exists) {
  console.log('Already registered!');
  console.log('Certificate ID:', result.certificateId);
} else {
  console.log('Hash not found — safe to register');
}`

const tabs = [
  { id: "quickstart",    label: "Quick Start",     code: quickstart },
  { id: "errors",        label: "Error Handling",  code: errorHandling },
  { id: "check-hash",    label: "Check Hash",      code: checkHash },
]

const apiMethods = [
  {
    method: "registerAsset",
    returns: "Promise<RegisterAcceptedResponse>",
    desc: "Registers a digital music asset. Automatically handles HTTP 402 → signs with Ed25519 → retries. Returns requestId for polling.",
    params: [
      { name: "contentHash", type: "string", required: true,  note: "sha256:... prefix" },
      { name: "title",       type: "string", required: false, note: "" },
      { name: "artist",      type: "string", required: false, note: "" },
    ],
  },
  {
    method: "getRegistrationStatus",
    returns: "Promise<RegisterStatusResponse>",
    desc: "Polls registration status. Statuses: queued → processing → confirmed | failed.",
    params: [
      { name: "requestId", type: "string", required: true, note: "" },
    ],
  },
  {
    method: "getCertificate",
    returns: "Promise<CertificateResponse>",
    desc: "Fetches the final rights certificate once confirmed.",
    params: [
      { name: "certificateId", type: "string", required: true, note: "" },
    ],
  },
]

function SyntaxLine({ line }: { line: string }) {
  let l = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  l = l.replace(/(\/\/.*)$/, '<span class="tok-comment">$1</span>')
  l = l.replace(/(`[^`]*`|'[^']*'|"[^"]*")/g, '<span class="tok-string">$1</span>')
  const kw = ['import', 'from', 'const', 'let', 'async', 'await', 'function', 'return', 'try', 'catch', 'throw', 'new', 'if', 'else']
  kw.forEach(k => { l = l.replace(new RegExp(`\\b(${k})\\b`, 'g'), `<span class="tok-keyword">${k}</span>`) })
  l = l.replace(/\b(\d[\d_]*)\b/g, '<span class="tok-number">$1</span>')
  return <span dangerouslySetInnerHTML={{ __html: l }} />
}

export function SDKSection() {
  const container = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<string>("quickstart")
  const [copiedCode, setCopiedCode] = useState(false)
  const currentCode = tabs.find(t => t.id === activeTab)?.code ?? quickstart

  useGSAP(() => {
    gsap.fromTo(
      ".gsap-sdk-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: ".gsap-sdk-header", start: "top 85%" } }
    )

    gsap.fromTo(
      ".gsap-sdk-panel",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: ".gsap-sdk-panel", start: "top 80%" } }
    )
    
    gsap.fromTo(
      ".gsap-api-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: ".gsap-api-card", start: "top 85%" } }
    )
  }, { scope: container })

  return (
    <section id="sdk" ref={container} className="relative py-24 sm:py-32 section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 gsap-sdk-header opacity-0">
          <span className="section-label">
            <Code2 className="h-3.5 w-3.5" />
            Developer SDK
          </span>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
                Build Music Agents{" "}
                <span className="gradient-text">in Minutes</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl text-pretty leading-relaxed">
                Install the SDK, provide your Stellar key, and your agent handles
                payments and on-chain track registration automatically.
              </p>
            </div>
            <Button asChild size="sm" variant="outline" className="btn-ghost shrink-0 h-9 px-4 text-sm font-medium rounded-lg">
              <Link href="/simulation" className="flex items-center gap-2">Live Demo <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Left Panel */}
          <div className="space-y-6 gsap-sdk-panel opacity-0">
            <div className="rounded-2xl border border-border bg-card p-6 card-sdk">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Installation</span>
              </div>
              <div className="space-y-3">
                {["npm", "yarn"].map(pm => (
                  <div key={pm} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3 group hover:border-primary/20 transition-colors">
                    <Terminal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <code className="text-sm font-mono text-foreground flex-1">
                      {pm} {pm === "npm" ? "install" : "add"} <span className="text-primary">@nova-registry/sdk-ts</span>
                    </code>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 card-sdk">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">SDK Highlights</span>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { key: "registerAsset()", desc: "Core method — auto-handles 402 + payment" },
                  { key: "getRegistrationStatus()", desc: "Poll until confirmed | failed" }
                ].map(({ key, desc }) => (
                  <div key={key} className="flex gap-3 items-start">
                    <code className="text-xs font-mono text-primary bg-primary/7 border border-primary/15 px-2 py-0.5 rounded-md shrink-0 mt-0.5">{key}</code>
                    <span className="text-xs text-muted-foreground leading-relaxed">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel (Code Editor) */}
          <div className="rounded-2xl border border-[oklch(0.24_0.025_258)] overflow-hidden shadow-xl gsap-sdk-panel opacity-0" style={{ background: 'oklch(0.138 0.020 258)' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[oklch(0.24_0.025_258)]">
              <div className="flex gap-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === tab.id ? "bg-white/10 text-white" : "text-[oklch(0.60_0.008_255)] hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5 overflow-x-auto max-h-[480px] overflow-y-auto">
              <pre className="text-sm leading-relaxed font-mono">
                <code style={{ color: 'oklch(0.875 0.008 240)' }}>
                  {currentCode.split('\n').map((line, i) => (
                    <div key={i} className="flex hover:bg-white/4 transition-colors -mx-5 px-5 py-0.5">
                      <span className="select-none w-8 text-right pr-4 mr-2 border-r border-[oklch(0.24_0.025_258)]" style={{ color: 'oklch(0.38 0.010 260)' }}>
                        {i + 1}
                      </span>
                      <span className="whitespace-pre"><SyntaxLine line={line} /></span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="mt-16" id="api">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-bold text-foreground">API Reference</h3>
            <span className="badge-sdk ml-1">v1.0</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiMethods.map((api) => (
              <div key={api.method} className="gsap-api-card opacity-0 rounded-xl border border-border bg-card p-5 card-sdk">
                <div className="flex items-start gap-3 mb-3">
                  <code className="text-sm font-mono font-semibold text-primary bg-primary/7 border border-primary/15 px-2.5 py-1 rounded-lg">.{api.method}()</code>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{api.desc}</p>
                <div className="space-y-1.5">
                  {api.params.map(p => (
                    <div key={p.name} className="flex items-start gap-2 text-xs">
                      <code className="font-mono shrink-0 px-1.5 py-0.5 rounded text-[11px] bg-secondary text-muted-foreground border border-border">{p.name}</code>
                      <span className="text-muted-foreground font-mono text-[11px] mt-0.5">{p.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
