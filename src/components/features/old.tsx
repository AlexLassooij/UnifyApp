// Home Page
'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Bookmark, MessageSquare, Files } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-[#191919]">Hello, User</h1>

      <div className="grid gap-6 md:grid-cols-2">
      {/* // First card - Saved */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Saved
              <Bookmark className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {saved.slice(0, 4).map((item, i) => (
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
          <CardFooter className="border-t pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/saved">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* // Second card - Deadlines */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Deadlines
              <Calendar className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {deadlines.slice(0, 4).map((deadline, i) => (
                <div key={i} className="flex items-center justify-between gap-4 pb-4">
                  <div className="flex gap-3">
                    <Image
                      src={deadline.logo}
                      alt={deadline.institution}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{deadline.title}</p>
                      <p className="text-sm text-muted-foreground">{deadline.institution}</p>
                      <p className="text-xs mt-1 text-red-500">{deadline.date}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/deadlines">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* // Third card - Universities */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Universities
              <GraduationCap className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {universities.slice(0, 4).map((university, i) => (
                <div key={i} className="flex items-center justify-between gap-4 pb-4">
                  <div className="flex gap-3">
                    <Image
                      src={university.logo}
                      alt={university.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{university.name}</p>
                      <p className="text-sm text-muted-foreground">{university.location}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/universities">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* // Fourth card - Programs */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Programs
              <BookOpen className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="h-[260px] overflow-y-auto pr-1 space-y-4">
              {programs.slice(0, 4).map((program, i) => (
                <div key={i} className="flex items-center justify-between gap-4 pb-4">
                  <div className="flex gap-3">
                    <Image
                      src={program.logo}
                      alt={program.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{program.name}</p>
                      <p className="text-sm text-muted-foreground">{program.university}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/programs">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
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
    date: "Mar 24",
    daysLeft: "6",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    institution: "University of Calgary",
    details: "These are more than just application deadlines, but genera...",
    date: "Jan 12",
    daysLeft: "12",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/revisions_stage2-JxrLHC2XYcEfUf6qHTuwGGEcB1H0zc.png",
    institution: "University of British Columbia",
    details: "deadlines for any tasks related to an application set by the user",
    date: "Mar 24",
    daysLeft: "12",
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



