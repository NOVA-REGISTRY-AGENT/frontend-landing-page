"use client"

import { useState, useCallback, useRef } from "react"
import type { TerminalLine } from "@/components/simulation/terminal"
import type { AgentState } from "@/components/simulation/agent-status"
import type { PaymentState } from "@/components/simulation/payment-card"

interface SimulationState {
  agentState: AgentState
  paymentState: PaymentState
  agentLines: TerminalLine[]
  apiLines: TerminalLine[]
  blockchainLines: TerminalLine[]
  isRunning: boolean
  certificate: {
    certificateId: string
    contentHash: string
    title: string
    genre: string
    aiModel: string
    timestamp: Date
    txHash: string
  } | null
}

// Simulated data
const SONG_TITLE = "Cybernetic Lullaby"
const SONG_GENRE = "Synthwave"
const AI_MODEL = "Claude 3.5 Sonnet"
const CONTENT_HASH = "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
const AGENT_WALLET = "GCTX...7K3M"
const REGISTRY_WALLET = "GDNR...9PQ2"
const TX_HASH = "a3f7c8e9d2b1a5f4c7e8d9b2a1f5c4e7d8b9a2f1c5e4d7b8a9c2f1e5d4c7b8a9"
const CERTIFICATE_ID = "NOVA-2026-" + Math.random().toString(36).substring(2, 10).toUpperCase()

export function useSimulation() {
  const [state, setState] = useState<SimulationState>({
    agentState: "idle",
    paymentState: "pending",
    agentLines: [],
    apiLines: [],
    blockchainLines: [],
    isRunning: false,
    certificate: null,
  })

  const lineIdRef = useRef(0)

  const addLine = useCallback((
    terminal: "agent" | "api" | "blockchain",
    type: TerminalLine["type"],
    content: string
  ) => {
    const line: TerminalLine = {
      id: `${terminal}-${lineIdRef.current++}`,
      type,
      content,
      timestamp: new Date(),
    }

    setState(prev => ({
      ...prev,
      [`${terminal}Lines`]: [...prev[`${terminal}Lines` as keyof SimulationState] as TerminalLine[], line],
    }))
  }, [])

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const runSimulation = useCallback(async () => {
    // Reset state
    setState({
      agentState: "idle",
      paymentState: "pending",
      agentLines: [],
      apiLines: [],
      blockchainLines: [],
      isRunning: true,
      certificate: null,
    })
    lineIdRef.current = 0

    await delay(500)

    // Phase 1: Agent thinking
    setState(prev => ({ ...prev, agentState: "thinking" }))
    addLine("agent", "system", "Initializing Nova Registry Agent...")
    await delay(800)
    addLine("agent", "info", "Claude Haiku model loaded")
    await delay(600)
    addLine("agent", "input", "Task received: Protect music IP")
    await delay(1000)
    addLine("agent", "output", "Analyzing task requirements...")
    await delay(800)
    addLine("agent", "output", `Decision: Register "${SONG_TITLE}" on Stellar`)

    // Phase 2: Generating hash
    await delay(600)
    setState(prev => ({ ...prev, agentState: "generating" }))
    addLine("agent", "info", "Loading audio file...")
    await delay(500)
    addLine("agent", "output", "Audio file loaded: 3.2MB WAV format")

    await delay(400)
    setState(prev => ({ ...prev, agentState: "hashing" }))
    addLine("agent", "input", "crypto.createHash('sha256').update(audioData)")
    await delay(800)
    addLine("agent", "success", `Hash computed: ${CONTENT_HASH}`)
    await delay(400)
    addLine("agent", "output", `Preparing metadata: { title: "${SONG_TITLE}", genre: "${SONG_GENRE}" }`)

    // Phase 3: API Request
    await delay(600)
    setState(prev => ({ ...prev, agentState: "requesting" }))
    addLine("agent", "input", "sdk.registerAsset({ contentHash, metadata })")
    await delay(300)
    
    addLine("api", "system", "Incoming request: POST /v1/register")
    await delay(400)
    addLine("api", "info", "Validating request payload...")
    await delay(300)
    addLine("api", "output", "Content hash: valid SHA-256 format")
    await delay(400)
    addLine("api", "warning", "No payment signature detected")
    await delay(300)
    addLine("api", "error", "HTTP 402 Payment Required")
    await delay(200)
    addLine("api", "output", "PaymentRequirement: { amount: '0.10', asset: 'USDC', nonce: 'n7x9k2...' }")

    // Phase 4: SDK intercepts and pays
    await delay(500)
    addLine("agent", "warning", "Received HTTP 402 - Payment barrier detected")
    await delay(300)
    addLine("agent", "info", "NovaSDK intercepting payment requirement...")
    await delay(400)
    
    setState(prev => ({ ...prev, agentState: "paying", paymentState: "signing" }))
    addLine("agent", "output", "Constructing payment payload...")
    await delay(300)
    addLine("agent", "output", "Sorting fields alphabetically (x402 spec)")
    await delay(400)
    addLine("agent", "input", "keypair.sign(payloadHash) // Ed25519")
    await delay(600)
    addLine("agent", "success", "Payment signature generated")

    await delay(300)
    setState(prev => ({ ...prev, paymentState: "settling" }))
    addLine("agent", "info", "Sending to OpenZeppelin Facilitator...")
    await delay(400)
    addLine("api", "info", "Received payment signature")
    await delay(300)
    addLine("api", "output", "Verifying Ed25519 signature...")
    await delay(400)
    addLine("api", "success", "Signature valid - Payer: " + AGENT_WALLET)
    await delay(300)
    addLine("api", "info", "Requesting settlement from facilitator...")

    await delay(600)
    addLine("blockchain", "system", "OpenZeppelin Facilitator invoked")
    await delay(400)
    addLine("blockchain", "info", "Checking agent balance: 50.00 USDC")
    await delay(300)
    addLine("blockchain", "output", "Transferring 0.10 USDC...")
    await delay(500)
    addLine("blockchain", "success", "Settlement confirmed on Stellar Testnet")
    
    setState(prev => ({ ...prev, paymentState: "confirmed" }))
    await delay(300)
    addLine("api", "success", "Payment settled - Proceeding with registration")

    // Phase 5: Soroban registration
    await delay(400)
    setState(prev => ({ ...prev, agentState: "registering" }))
    addLine("api", "info", "Enqueueing Soroban registration job (BullMQ)")
    await delay(300)
    addLine("api", "output", "HTTP 202 Accepted - Job ID: job_8x7k2n")

    await delay(500)
    addLine("blockchain", "system", "BullMQ Worker: Processing job_8x7k2n")
    await delay(400)
    addLine("blockchain", "info", "Connecting to Soroban RPC...")
    await delay(300)
    addLine("blockchain", "output", "Contract ID: CDLZ...Q9VN")
    await delay(400)
    addLine("blockchain", "input", "contract.invoke('register', hash, payer, metadata)")
    await delay(800)
    addLine("blockchain", "info", "Transaction submitted to Stellar network")
    await delay(600)
    addLine("blockchain", "output", "Waiting for ledger confirmation...")
    await delay(700)
    addLine("blockchain", "success", `Transaction confirmed: ${TX_HASH.slice(0, 16)}...`)
    await delay(300)
    addLine("blockchain", "success", `Certificate ID: ${CERTIFICATE_ID}`)

    // Phase 6: Complete
    await delay(400)
    addLine("api", "success", "Registration complete - Notifying agent")
    await delay(300)
    addLine("agent", "success", "Music IP successfully registered on Stellar!")
    await delay(200)
    addLine("agent", "info", `Certificate: ${CERTIFICATE_ID}`)
    addLine("agent", "info", `Verify: https://stellar.expert/explorer/testnet/tx/${TX_HASH}`)

    setState(prev => ({
      ...prev,
      agentState: "completed",
      isRunning: false,
      certificate: {
        certificateId: CERTIFICATE_ID,
        contentHash: CONTENT_HASH,
        title: SONG_TITLE,
        genre: SONG_GENRE,
        aiModel: AI_MODEL,
        timestamp: new Date(),
        txHash: TX_HASH,
      },
    }))
  }, [addLine])

  const resetSimulation = useCallback(() => {
    setState({
      agentState: "idle",
      paymentState: "pending",
      agentLines: [],
      apiLines: [],
      blockchainLines: [],
      isRunning: false,
      certificate: null,
    })
    lineIdRef.current = 0
  }, [])

  return {
    ...state,
    runSimulation,
    resetSimulation,
    wallets: { agent: AGENT_WALLET, registry: REGISTRY_WALLET },
  }
}
