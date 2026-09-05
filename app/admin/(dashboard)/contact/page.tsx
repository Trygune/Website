'use client'

import { useMemo, useState } from 'react'
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

type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

const mockMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Ali Ahmadi',
    email: 'ali@example.com',
    subject: 'Frontend Development Opportunity',
    message:
      'Hi Farbod, I came across your portfolio and really liked your work with React and Next.js. We are looking for a frontend developer to join our team. I would love to discuss the opportunity with you.',
    createdAt: '2026-09-06T10:30:00',
    read: false,
  },
  {
    id: '2',
    name: 'Sara Mohammadi',
    email: 'sara@example.com',
    subject: 'Project Collaboration',
    message:
      'Hello, I am working on a new web application and I am interested in collaborating with you on the frontend part of the project.',
    createdAt: '2026-09-05T18:45:00',
    read: false,
  },
  {
    id: '3',
    name: 'Reza Karimi',
    email: 'reza@example.com',
    subject: 'Question about your project',
    message:
      'I really liked the architecture of your portfolio project. Could you tell me more about how you implemented the authentication system?',
    createdAt: '2026-09-04T14:20:00',
    read: true,
  },
  {
    id: '4',
    name: 'Nima Hosseini',
    email: 'nima@example.com',
    subject: 'Freelance Project',
    message:
      'We have a freelance project involving Next.js and TypeScript and would like to know if you are available for new projects.',
    createdAt: '2026-09-03T11:10:00',
    read: true,
  },
  {
    id: '5',
    name: 'Mina Rahimi',
    email: 'mina@example.com',
    subject: 'Portfolio Feedback',
    message:
      'Your portfolio looks great. I especially liked the projects section and the clean UI. Just wanted to share some feedback.',
    createdAt: '2026-09-01T09:15:00',
    read: true,
  },
]

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
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages)

  const [selectedId, setSelectedId] = useState<string | null>(
    mockMessages[0]?.id ?? null
  )

  const [search, setSearch] = useState('')

  const selectedMessage = messages.find((message) => message.id === selectedId)

  const filteredMessages = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return messages

    return messages.filter(
      (message) =>
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
    )
  }, [messages, search])

  const unreadCount = messages.filter((message) => !message.read).length

  const handleSelectMessage = (message: ContactMessage) => {
    setSelectedId(message.id)

    // TODO: Connect to API later
    setMessages((current) =>
      current.map((item) =>
        item.id === message.id ? { ...item, read: true } : item
      )
    )
  }

  const toggleReadStatus = (id: string) => {
    // TODO: Connect to API later
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, read: !message.read } : message
      )
    )
  }

  const deleteMessage = (id: string) => {
    // TODO: Connect to API later
    setMessages((current) => current.filter((message) => message.id !== id))

    if (selectedId === id) {
      setSelectedId(null)
    }
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
                                  message.read ? 'font-medium' : 'font-semibold'
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
                                message.read
                                  ? 'text-muted-foreground'
                                  : 'font-medium'
                              }`}
                            >
                              {message.subject}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                              {message.message}
                            </p>

                            {!message.read && (
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
                      Try another search term.
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
                        onClick={() => toggleReadStatus(selectedMessage.id)}
                      >
                        {selectedMessage.read ? (
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
                        onClick={() => deleteMessage(selectedMessage.id)}
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

                  {selectedMessage.read && (
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
                      onClick={() => toggleReadStatus(selectedMessage.id)}
                    >
                      {selectedMessage.read ? (
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
                      onClick={() => deleteMessage(selectedMessage.id)}
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
    </div>
  )
}

export default ContactMessagesPage
