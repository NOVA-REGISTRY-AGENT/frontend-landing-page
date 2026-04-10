"use client"

import { cn } from "@/lib/utils"
import { FileCheck2, ExternalLink, Music, Hash, Calendar, User, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CertificateCardProps {
  certificateId: string
  contentHash: string
  title: string
  genre: string
  aiModel: string
  timestamp: Date
  txHash: string
  className?: string
}

export function CertificateCard({
  certificateId,
  contentHash,
  title,
  genre,
  aiModel,
  timestamp,
  txHash,
  className
}: CertificateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-2xl border border-success/40 bg-gradient-to-br from-success/10 via-success/5 to-transparent overflow-hidden",
        className
      )}
    >
      {/* Success celebration effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-success/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-success/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="relative p-6">
        {/* Header with badge */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-success/20 border border-success/30"
            >
              <FileCheck2 className="h-7 w-7 text-success" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                IP Certificate
                <Sparkles className="h-4 w-4 text-success" />
              </h3>
              <p className="text-sm text-success">Successfully Registered</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/20 border border-success/30">
            <Shield className="h-3.5 w-3.5 text-success" />
            <span className="text-xs font-medium text-success">Verified</span>
          </div>
        </div>

        {/* Certificate details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-3 rounded-xl bg-card/50 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <Music className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Title</span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">{title}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-3 rounded-xl bg-card/50 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <User className="h-3.5 w-3.5 text-accent" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Genre</span>
              </div>
              <p className="text-sm font-medium text-foreground">{genre}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-3 rounded-xl bg-card/50 border border-border/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <Hash className="h-3.5 w-3.5 text-warning" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Content Hash (SHA-256)</span>
            </div>
            <code className="text-xs font-mono text-foreground break-all leading-relaxed block p-2 rounded-lg bg-terminal-bg">
              {contentHash}
            </code>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50"
          >
            <Calendar className="h-4 w-4 text-success shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Registration Timestamp</p>
              <p className="text-sm font-medium text-foreground">
                {timestamp.toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "medium",
                })}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4 border-t border-border/50 space-y-3"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Certificate ID</span>
              <code className="text-foreground font-mono bg-card/50 px-2 py-1 rounded">{certificateId}</code>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">AI Model</span>
              <span className="text-primary font-medium">{aiModel}</span>
            </div>
          </motion.div>
        </div>

        {/* Verify button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <Button
            asChild
            className="w-full h-12 bg-success/20 hover:bg-success/30 text-success border border-success/30 hover:border-success/50"
            variant="ghost"
          >
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Verify on Stellar Expert
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
