// Home Page
'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Bookmark, MessageSquare, Files, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { format, differenceInDays, parseISO } from "date-fns";
import { useUserStore } from "@/store/userStore"


export default function Dashboard() {
  const { user } = useUserStore()

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-[#191919]">Hello, {user?.name.split(" ")[0]}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Upcoming Deadlines
              <Calendar className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {deadlines.map((deadline, i) => {

                const daysLeft = differenceInDays(parseISO(deadline.date), new Date());
                const formattedDate = format(deadline.date, "MMM d");

                return (
                  // flex items-start justify-between gap-4 border-b pb-4 last:border-0"
                  <div key={i} className="flex items-start justify-between gap-4 pb-4">
                    <div className="flex gap-3">
                      <Image
                        src={"/next.svg"}
                        alt={deadline.institution}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      {/* max-h-14 is 56px, as defined in the figma design */}
                      <div className="max-h-14 overflow-hidden">
                        <p className="font-medium line-clamp-2">{deadline.details}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-3 text-center self-end ">
                      <p className="text-sm">{formattedDate}</p>
                      <p className={`text-sm ${daysLeft <= 7 ? 'text-red-500' : 'text-amber-500'} w-8`}>
                        {daysLeft} Days
                      </p>
                    </div>
                  </div>
                )}
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/saved">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Messages
              <MessageSquare className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {messages.map((message, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-4">
                  <div className="flex gap-3">
                    <Image
                      src={"/next.svg"}
                      alt={message.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{message.content}</p>
                      <p className="text-sm text-muted-foreground">{message.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">{message.time} ago</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/saved">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Applications
              <Files className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {applications.map((app, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-4">
                  <div className="flex gap-3">
                    <Image
                      src={"/next.svg"}
                      alt={app.university}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{app.program}</p>
                      <p className="text-sm text-muted-foreground">{app.university}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/saved">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Saved
              <Bookmark className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {saved.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-4">
                  <div className="flex gap-3">
                    <Image
                      src={"/next.svg"}
                      alt={item.university}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{item.program}</p>
                      <p className="text-sm text-muted-foreground">{item.university}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/saved">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

const deadlines = [
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    institution: "University of British Columbia",
    details: "Deadline Details Deadline Details Deadline Details Deadline Details",
    date: "2025-03-14", // ISO format: YYYY-MM-DD
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    institution: "University of Calgary",
    details: "These are more than just application deadlines, but genera...",
    date: "2025-08-12",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    institution: "University of British Columbia",
    details: "deadlines for any tasks related to an application set by the user",
    date: "2025-03-24",
  },
]

const messages = [
  {
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Vanessa Hu",
    content: "Message Content",
    time: "7h",
  },
  {
    avatar: "/placeholder.svg?height=40&width=40",
    name: "Vanessa Hu",
    content: "Replied to your thread in UBC Housing",
    time: "1h",
  },
]

const applications = [
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    program: "Software Engineering",
    university: "McGill University",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    program: "Electrical Engineering",
    university: "University of Calgary",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    program: "Integrated Sciences",
    university: "University of British Columbia",
  },
]

const saved = [
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    program: "Life Sciences",
    university: "McGill University",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    program: '"engineering montreal"',
    university: "Search Result",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    program: "Kinesiology",
    university: "University of British Columbia",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    program: "Kinesiology",
    university: "University of British Columbia",
  },
]



