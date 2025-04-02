"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addNotification } from "@/lib/api/fetchers/call_to_action"

export default function CallToActionPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [notification, setNotification] = useState("beta")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, notification })
    // Handle form submission
    if (!name || !email) {
      console.error("Name and email are required")
      return
    }
    addNotification(name, email, notification)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 md:px-12 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Form */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0d2d52] mb-4">
              Ease your stress.
              <br />
              Sign up today.
            </h1>

            <p className="text-xl md:text-2xl text-[#0d2d52] mb-10">
              Enter your email to stay updated on our beta release!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-[#0d2d52] font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-0 border-b border-gray-300 focus:border-purple-light focus:ring-0 px-0 py-2 bg-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-[#0d2d52] font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 border-b border-gray-300 focus:border-[#9175e5] focus:ring-0 px-0 py-2 bg-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#0d2d52] font-medium">I&apos;d like to be notified for...</label>
                <Select value={notification} onValueChange={setNotification}>
                  <SelectTrigger className="w-full border-0 border-b border-gray-300 rounded-none focus:ring-0 px-0 py-2 bg-transparent">
                    <SelectValue placeholder="Beta Testing, Student Help, Newsletter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beta">Beta Testing</SelectItem>
                    <SelectItem value="student">Student Help</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="all">All of the above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="bg-[#9175e5] hover:bg-[#7d63d1] text-white px-6 py-2 rounded-md flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>

          {/* Right side - Illustration */}
          <div className="flex justify-center">
            <Image
              src="/landing/cartoon_books.png"
              alt="Person carrying boxes illustration"
              width={400}
              height={500}
              className="max-w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

