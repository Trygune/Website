'use client'

import { useState } from 'react'
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react'

type DeleteDialogProps = {
  open: boolean
  title?: string
  description?: string
  itemName?: string
  onClose: () => void
  onConfirm: () => Promise<void> | void
}

const DeleteDialog = ({
  open,
  title = 'Delete item',
  description = 'This action cannot be undone.',
  itemName,
  onClose,
  onConfirm,
}: DeleteDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!open) {
    return null
  }

  const handleConfirm = async () => {
    try {
      setIsDeleting(true)

      await onConfirm()

      onClose()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        disabled={isDeleting}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-xl border bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="size-5" />
            </div>

            <div>
              <h2 id="delete-dialog-title" className="font-semibold">
                {title}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          {itemName && (
            <div className="rounded-lg border bg-muted/40 px-3 py-2.5">
              <p className="truncate text-sm font-medium">{itemName}</p>
            </div>
          )}

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Are you sure you want to delete this item? This action is permanent
            and the data will be removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-destructive px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteDialog
