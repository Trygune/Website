'use client'

import { useState } from 'react'
import { AlertTriangle, Check, Loader2, X } from 'lucide-react'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'danger'
  onClose: () => void
  onConfirm: () => Promise<void> | void
}

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  const [isConfirming, setIsConfirming] = useState(false)

  if (!open) {
    return null
  }

  const handleConfirm = async () => {
    try {
      setIsConfirming(true)

      await onConfirm()

      onClose()
    } finally {
      setIsConfirming(false)
    }
  }

  const isDanger = variant === 'danger'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        disabled={isConfirming}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-xl border bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div className="flex items-start gap-3">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                isDanger
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-muted text-foreground'
              }`}
            >
              <AlertTriangle className="size-5" />
            </div>

            <div>
              <h2 id="confirm-dialog-title" className="font-semibold">
                {title}
              </h2>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isConfirming}
            aria-label="Close"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isConfirming}
            className="inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-opacity disabled:pointer-events-none disabled:opacity-50 ${
              isDanger
                ? 'bg-destructive text-white hover:opacity-90'
                : 'bg-foreground text-background hover:opacity-90'
            }`}
          >
            {isConfirming ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="size-4" />
                {confirmLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
