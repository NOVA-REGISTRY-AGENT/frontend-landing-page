"use client"

import { motion } from "framer-motion"
import { Copy, Check, Terminal, Package, Code2, Sparkles, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const codeExample = `import { NovaRegistrySDK } from '@nova-registry/sdk-ts';
import crypto from 'crypto';

// Initialize SDK with your Stellar wallet
const sdk = new NovaRegistrySDK({
  stellarSecret: process.env.AGENT_STELLAR_SECRET,
  registryUrl: 'https://api.novaregistry.com',
  network: 'testnet'
});

async function protectMusic() {
  // Your AI-generated music file
  const audioFile = Buffer.from("...binary audio data...");
  
  // Calculate SHA-256 hash
  const hash = crypto.createHash('sha256')
    .update(audioFile).digest('hex');

  // Register autonomously - SDK handles 402 & payment
  const receipt = await sdk.registerAsset({
    contentHash: \`sha256:\${hash}\`,
    metadata: {
      title: "Cybernetic Lullaby",
      genre: "Synthwave",
      aiModel: "Claude 3.5 Sonnet"
    }
  });

  console.log(\`Certificate: \${receipt.certificateId}\`);
  console.log(\`Verify: \${receipt.stellarExplorerUrl}\`);
}

protectMusic();`

const features = [
  {
    icon: Package,
    title: "Zero Configuration",
    description: "Just provide your Stellar secret key and you are ready to go."
  },
  {
    icon: Code2,
    title: "TypeScript Native",
    description: "Full type safety with auto-completion and inline docs."
  },
  {
    icon: Sparkles,
    title: "Auto Payment Handling",
    description: "402 errors are intercepted and resolved automatically."
  }
]

export function SDKSection() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm install @nova-registry/sdk-ts")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="sdk" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Code2 className="h-4 w-4" />
              Developer SDK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Build Autonomous Agents in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Minutes
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed">
              Our TypeScript SDK abstracts all the complexity of Stellar transactions,
              x402 protocol handling, and cryptographic signing. Your AI agent gets
              native payment capabilities with just a few lines of code.
            </p>

            {/* Install command */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-4 rounded-xl border border-primary/30 bg-terminal-bg px-5 py-4">
                <Terminal className="h-5 w-5 text-primary" />
                <code className="text-sm font-mono text-foreground flex-1">npm install @nova-registry/sdk-ts</code>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className="shrink-0 h-14 w-14 border-primary/30 hover:bg-primary/10"
              >
                {copied ? <Check className="h-5 w-5 text-success" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>

            {/* Feature list */}
            <div className="mt-10 space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button asChild size="lg" className="glow-primary">
                <Link href="/simulation" className="flex items-center gap-2">
                  Try Live Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: Code example */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-3xl -z-10" />
            
            <div className="rounded-2xl border border-border/50 overflow-hidden bg-terminal-bg shadow-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-card/30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-destructive/80 hover:bg-destructive transition-colors" />
                    <div className="w-3.5 h-3.5 rounded-full bg-warning/80 hover:bg-warning transition-colors" />
                    <div className="w-3.5 h-3.5 rounded-full bg-success/80 hover:bg-success transition-colors" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono px-3 py-1 rounded-full bg-background/50">
                    register-music.ts
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(codeExample)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5 text-success" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
                    </>
                  )}
                </Button>
              </div>

              {/* Code content */}
              <div className="p-5 overflow-x-auto max-h-[500px]">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-terminal-text">
                    {codeExample.split('\n').map((line, i) => (
                      <div key={i} className="flex hover:bg-white/5 transition-colors">
                        <span className="text-muted-foreground/40 w-10 shrink-0 select-none text-right pr-4 border-r border-border/30 mr-4">
                          {i + 1}
                        </span>
                        <span className="whitespace-pre">
                          {highlightSyntax(line)}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Scanlines effect */}
              <div className="absolute inset-0 scanlines pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function highlightSyntax(line: string) {
  const keywords = ['import', 'from', 'const', 'async', 'function', 'await', 'return']
  const strings = line.match(/'[^']*'|"[^"]*"|`[^`]*`/g) || []
  const comments = line.match(/\/\/.*/g) || []

  let result = line

  comments.forEach(comment => {
    result = result.replace(comment, `<span class="text-muted-foreground italic">${comment}</span>`)
  })

  strings.forEach(str => {
    result = result.replace(str, `<span class="text-success">${str}</span>`)
  })

  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    result = result.replace(regex, `<span class="text-primary font-medium">${keyword}</span>`)
  })

  return <span dangerouslySetInnerHTML={{ __html: result }} />
}
