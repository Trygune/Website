import Link from 'next/link'
import { ArrowUpRight, FileText, MessageCircle } from 'lucide-react'
import EmptyState from '../shared/EmptyState'
import { ContactMessage } from '@/types/contact'

type RecentMessagesProps = {
  messages: ContactMessage[]
}

const formatDate = (date: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const RecentMessages = ({ messages }: RecentMessagesProps) => {
  return (
    <section className="rounded-xl border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h3 className="font-semibold">Recent messages</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Your latest blog posts.
          </p>
        </div>

        <Link
          href="/admin/contact"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Posts */}
      {messages.length > 0 ? (
        <div className="divide-y">
          {messages.map((message) => (
            <Link
              key={message.id}
              href="/admin/contact"
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30"
            >
              {/* Icon */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/20">
                <MessageCircle className="size-4 text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium">
                    {message.name}
                  </h3>
                  <span>·</span>
                  <span className="hidden shrink-0 text-[11px] font-medium sm:inline-flex">
                    {message.email.slice(0, 12)}...
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{message.subject.slice(0, 28)}...</span>
                </div>
              </div>

              <span className="hidden shrink-0 text-[11px] font-medium sm:inline-flex">
                {formatDate(message.createdAt)}
              </span>

              {/* Arrow */}
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No posts yet"
          description="Start writing your first article for your blog."
          noBorder
          action={{
            label: 'Create post',
            href: '/admin/posts/new',
          }}
        />
      )}
    </section>
  )
}

export default RecentMessages
