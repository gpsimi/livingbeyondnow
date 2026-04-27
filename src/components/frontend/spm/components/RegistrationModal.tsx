'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { REGISTER_URL, BANK_DETAILS } from '@/components/frontend/spm/data/constants'
import { Building2, ExternalLink, Copy, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'

export const RegistrationModal = ({
  children,
  className,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && (
        <DialogTrigger asChild>
          <div className={cn('inline-block', className)}>{children}</div>
        </DialogTrigger>
      )}
      {/* 
        max-w-lg from default shadcn dialog is overridden by sm:max-w-4xl 
        Added max-h-[90vh] and overflow-y-auto for scrollability on smaller screens
      */}
      <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border p-6 md:p-8 gap-0">
        <DialogHeader className="mb-6 md:mb-8 md:text-center">
          <DialogTitle className="font-heading text-2xl md:text-4xl text-foreground">
            Choose Payment Method
          </DialogTitle>
          <DialogDescription className="font-body text-muted-foreground text-sm md:text-base mt-2">
            Secure your seat for SPM 2.0. Choose your preferred way to pay.
          </DialogDescription>
        </DialogHeader>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch">
          {/* Option 1: Selfany */}
          <div className="flex-1 flex flex-col gap-4 p-5 md:p-6 rounded-2xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors shadow-none">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-lg md:text-xl text-foreground">
                Pay via Selfany
              </h4>
              <span className="bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                Instant
              </span>
            </div>

            <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
              Secure online payment via credit/debit card. Best for quick registration and instant
              seat confirmation.
            </p>

            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 group relative inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-body font-bold text-sm px-6 py-4 rounded-md uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_hsl(212,100%,46%,0.3)] w-full"
            >
              <span className="relative z-10 w-full text-center">Proceed to Selfany</span>
              <ExternalLink className="relative z-10 w-4 h-4 shrink-0" />
              <div className="absolute inset-0 bg-linear-to-r from-secondary to-[hsl(195,100%,50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Divider Custom: Horizontal on Mobile, Vertical on Desktop */}
          <div className="relative flex md:flex-col items-center justify-center py-2 md:py-0">
            <div className="absolute inset-0 flex items-center justify-center md:flex-col">
              <span className="w-full md:w-px h-px md:h-full border-t md:border-t-0 md:border-l border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase bg-background px-4 md:px-0 md:py-4">
              <span className="text-muted-foreground font-bold tracking-widest">Or</span>
            </div>
          </div>

          {/* Option 2: Bank Transfer */}
          <div className="flex-1 flex flex-col gap-4 p-5 md:p-6 rounded-2xl border border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-foreground/80" />
              <h4 className="font-heading font-bold text-lg md:text-xl text-foreground">
                Alternative Payment Option
              </h4>
            </div>

            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              If you experience any issues with the online payment link, you may complete your
              registration via direct bank transfer to our official business account.
            </p>

            <div className="font-body text-sm font-semibold text-foreground bg-secondary/10 border border-secondary/20 p-3 rounded-lg shadow-sm">
              <span className="text-secondary text-xs font-black uppercase tracking-wider block mb-1">
                Important:
              </span>
              Kindly use your full name as the payment reference to ensure your seat is correctly
              allocated.
            </div>

            <div className="bg-background border border-border rounded-xl p-4 space-y-3 mt-2 shadow-sm">
              {[
                { label: 'Bank', value: BANK_DETAILS.bankName, id: 'bank', copyable: false },
                { label: 'Name', value: BANK_DETAILS.accountName, id: 'name', copyable: false },
                {
                  label: 'Account',
                  value: BANK_DETAILS.accountNumber,
                  id: 'account',
                  copyable: true,
                },
                { label: 'Sort Code', value: BANK_DETAILS.sortCode, id: 'sort', copyable: true },
              ].map((detail) => (
                <div key={detail.id} className="flex items-center justify-between py-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="font-body font-bold text-sm md:text-base text-foreground">
                      {detail.value}
                    </p>
                  </div>

                  {detail.copyable && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors shrink-0"
                      onClick={() => handleCopy(detail.value, detail.id)}
                      title="Copy"
                    >
                      <AnimatePresence mode="wait">
                        {copied === detail.id ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Copy className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-xs text-muted-foreground font-body leading-relaxed">
              <p>
                After making payment, please email proof of transfer to:{' '}
                <a
                  href="mailto:info@primecounsel.co.uk"
                  className="font-medium text-secondary hover:underline transition-colors block sm:inline mt-1 sm:mt-0"
                >
                  info@primecounsel.co.uk
                </a>
              </p>
              <p className="mt-2 font-medium text-foreground/80">
                Your seat will be confirmed once payment is verified.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
