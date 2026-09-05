'use client'

import { Mail } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { useState } from 'react'
import ContactForm from './ContactForm'

const ContactCard = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6 sm:p-8">
        {isSubmitted ? (
          <div className="flex min-h-125 flex-col items-center justify-center text-center">
            <div className="flex size-12 items-center justify-center rounded-full border">
              <Mail className="size-5" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Message sent successfully
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Thanks for reaching out. I&apos;ll get back to you as soon as
              possible.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={() => setIsSubmitted(false)}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <ContactForm setIsSubmitted={setIsSubmitted} />
        )}
      </CardContent>
    </Card>
  )
}

export default ContactCard
