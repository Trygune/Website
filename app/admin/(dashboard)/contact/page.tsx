'use client'

import { useEffect, useState } from 'react'
import {
  Check,
  Mail,
  MailOpen,
  MoreHorizontal,
  Search,
  Trash2,
  User,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import {
  useContactMessages,
  useDeleteContactMessage,
  useUpdateContactMessage,
} from '@/hooks/useContact'

import type { ContactMessage } from '@/types/contact'

import DeleteDialog from '@/components/admin/shared/DeleteDialog'

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date))
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const ContactMessagesPage = () => {
  const { data, isPending, isError } = useContactMessages()

  const deleteMutation = useDeleteContactMessage()
  const updateMutation = useUpdateContactMessage()

  const messages = data?.data ?? []

  const [selectedId, setSelectedId] = useState<string | null>(
    messages.length > 0 ? messages[0].id : null
  )
  const [deleteMessage, setDeleteMessage] = useState<ContactMessage | null>(
    null
  )
  const [search, setSearch] = useState('')

  const selectedMessage = messages.find((message) => message.id === selectedId)

  const filteredMessages = messages.filter((message) => {
    const query = search.toLowerCase().trim()

    if (!query) {
      return true
    }

    return (
      message.name.toLowerCase().includes(query) ||
      message.email.toLowerCase().includes(query) ||
      message.subject.toLowerCase().includes(query) ||
      message.message.toLowerCase().includes(query)
    )
  })

  const unreadCount = messages.filter((message) => !message.isRead).length

  const handleSelectMessage = async (message: ContactMessage) => {
    setSelectedId(message.id)

    if (message.isRead) {
      return
    }

    try {
      await updateMutation.mutateAsync({
        id: message.id,
        data: {
          isRead: true,
        },
      })
    } catch {
      // Error handling can be connected to your toast system.
    }
  }

  const toggleReadStatus = async (message: ContactMessage) => {
    try {
      await updateMutation.mutateAsync({
        id: message.id,
        data: {
          isRead: !message.isRead,
        },
      })
    } catch {
      // Error handling can be connected to your toast system.
    }
  }

  const handleDelete = async () => {
    if (!deleteMessage) {
      return
    }

    await deleteMutation.mutateAsync(deleteMessage.id)

    if (selectedId === deleteMessage.id) {
      setSelectedId(null)
    }

    setDeleteMessage(null)
  }

  if (isError) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">Failed to load messages</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />

        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Management</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Messages</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage messages sent through your contact form.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit gap-1.5">
          <Mail className="size-3.5" />
          {unreadCount} unread
        </Badge>
      </div>

      {/* Main inbox */}
      <Card className="overflow-hidden">
        <div className="grid min-h-[650px] lg:grid-cols-[360px_1fr]">
          {/* Message list */}
          <div className="flex min-h-0 flex-col border-b lg:border-b-0 lg:border-r">
            <CardHeader className="space-y-4 pb-4">
              <CardTitle className="text-base">Inbox</CardTitle>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search messages..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>

            <Separator />

            <ScrollArea className="flex-1">
              <div className="divide-y">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => {
                    const isSelected = message.id === selectedId

                    return (
                      <button
                        key={message.id}
                        type="button"
                        onClick={() => handleSelectMessage(message)}
                        className={`w-full text-left transition-colors hover:bg-muted/60 ${
                          isSelected ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex gap-3 p-4">
                          <Avatar className="mt-0.5 size-9 shrink-0">
                            <AvatarFallback>
                              {getInitials(message.name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`truncate text-sm ${
                                  message.isRead
                                    ? 'font-medium'
                                    : 'font-semibold'
                                }`}
                              >
                                {message.name}
                              </p>

                              <span className="shrink-0 text-[11px] text-muted-foreground">
                                {formatDate(message.createdAt)}
                              </span>
                            </div>

                            <p
                              className={`mt-1 truncate text-sm ${
                                message.isRead
                                  ? 'text-muted-foreground'
                                  : 'font-medium'
                              }`}
                            >
                              {message.subject}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                              {message.message}
                            </p>

                            {!message.isRead && (
                              <Badge
                                variant="default"
                                className="mt-2 h-5 px-1.5 text-[10px]"
                              >
                                Unread
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="mb-3 rounded-full bg-muted p-3">
                      <Mail className="size-5 text-muted-foreground" />
                    </div>

                    <p className="text-sm font-medium">No messages found</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {search
                        ? 'Try another search term.'
                        : 'Your inbox is empty.'}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Message details */}
          <div className="min-w-0">
            {selectedMessage ? (
              <div className="flex h-full flex-col">
                {/* Message header */}
                <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
                  <div className="flex min-w-0 gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback>
                        {getInitials(selectedMessage.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">
                        {selectedMessage.subject}
                      </h2>

                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span>{selectedMessage.name}</span>

                        <span>•</span>

                        <span>{selectedMessage.email}</span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                        >
                          <MoreHorizontal className="size-4" />

                          <span className="sr-only">Message actions</span>
                        </Button>
                      }
                    />

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => toggleReadStatus(selectedMessage)}
                      >
                        {selectedMessage.isRead ? (
                          <>
                            <Mail className="mr-2 size-4" />
                            Mark as unread
                          </>
                        ) : (
                          <>
                            <MailOpen className="mr-2 size-4" />
                            Mark as read
                          </>
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleteMessage(selectedMessage)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Separator />

                {/* Sender info */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 text-xs text-muted-foreground sm:px-6">
                  <div className="flex items-center gap-2">
                    <User className="size-3.5" />

                    <span>{selectedMessage.name}</span>
                  </div>

                  <span>{selectedMessage.email}</span>

                  <span>{formatDate(selectedMessage.createdAt)}</span>

                  {selectedMessage.isRead && (
                    <Badge variant="outline" className="gap-1 text-[10px]">
                      <Check className="size-3" />
                      Read
                    </Badge>
                  )}
                </div>

                <Separator />

                {/* Message content */}
                <CardContent className="flex-1 p-5 sm:p-6">
                  <p className="max-w-3xl whitespace-pre-wrap text-sm leading-7 text-foreground">
                    {selectedMessage.message}
                  </p>
                </CardContent>

                {/* Actions */}
                <div className="border-t p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => toggleReadStatus(selectedMessage)}
                      disabled={updateMutation.isPending}
                    >
                      {selectedMessage.isRead ? (
                        <>
                          <Mail className="mr-2 size-4" />
                          Mark as unread
                        </>
                      ) : (
                        <>
                          <MailOpen className="mr-2 size-4" />
                          Mark as read
                        </>
                      )}
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteMessage(selectedMessage)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[500px] flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <MailOpen className="size-6 text-muted-foreground" />
                </div>

                <h2 className="font-semibold">No message selected</h2>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Select a message from your inbox to read its contents.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Delete dialog */}
      <DeleteDialog
        open={Boolean(deleteMessage)}
        title="Delete message"
        description="This message will be permanently removed from your inbox."
        itemName={deleteMessage?.name}
        onClose={() => setDeleteMessage(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default ContactMessagesPage
