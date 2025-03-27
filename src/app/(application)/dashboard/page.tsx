// Home Page
'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Bookmark, MessageSquare, Files, ChevronRight, SearchIcon, Reply } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { format, differenceInDays, parseISO } from "date-fns";
import { useUserStore } from "@/store/userStore"
import { cn } from "@/lib/utils";
import styles from './styles.module.css'

export default function Dashboard() {
  const { user } = useUserStore()

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-[#191919]">Hello, {user?.name.split(" ")[0]}</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              Upcoming Deadlines
              <Calendar className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("h-[260px] overflow-y-auto pr-1 space-y-4", styles.customscrollbar)}>
              {deadlines
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((deadline, i) => {
                const daysLeft = differenceInDays(parseISO(deadline.date), new Date());
                const formattedDate = format(deadline.date, "MMM d");

                return (
                  // flex items-start justify-between gap-4 border-b pb-4 last:border-0"
                  <div key={i} className="flex items-start justify-between gap-4 pb-2">
                    <div className="flex gap-3">
                      <div className="flex justify-center items-center min-w-[40px] mr-1">
                        <Image
                          src={`/universities/${deadline.university_id}.png`}
                          alt={deadline.university_id}
                          width={48}
                          height={48}
                          className="object-contain"
                          style={{ height: "auto", width: "auto", maxHeight: "40px", maxWidth: "40px" }}
                        />
                      </div>
                      
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
            <div className={cn("h-[260px] overflow-y-auto pr-1 space-y-4", styles.customscrollbar)}>
              {messages.map((message, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-2">
                  <div className="flex gap-3">
                    <div className="flex justify-center items-center min-w-[40px] mr-1">
                        <Image
                          src={`${message.avatar}`}
                          alt={message.avatar}
                          width={48}
                          height={48}
                          className="object-contain"
                          style={{ height: "auto", width: "auto", maxHeight: "40px", maxWidth: "40px" }}
                        />
                      </div>
                    <div>
                      <p className="font-medium line-clamp-2">{message.content}</p>
                      <p className="text-sm text-muted-foreground">{message.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <p className="text-sm text-muted-foreground whitespace-nowrap">{message.time} ago</p>
                    <button 
                      className="text-muted-foreground hover:text-foreground transition-colors" 
                      aria-label="Reply to message"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                  </div>
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
            <div className={cn("h-[260px] overflow-y-auto pr-1 space-y-4", styles.customscrollbar)}>
              {applications.map((app, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-2">
                  <div className="flex gap-3">
                    <div className="flex justify-center items-center min-w-[40px] mr-1">
                        <Image
                          src={`/universities/${app.university_id}.png`}
                          alt={app.university_id}
                          width={48}
                          height={48}
                          className="object-contain"
                          style={{ height: "auto", width: "auto", maxHeight: "40px", maxWidth: "40px" }}
                        />
                      </div>
                    <div>
                      <p className="font-medium">{app.program}</p>
                      <p className="text-sm text-muted-foreground">{app.university}</p>
                    </div>
                  </div>
                  <button 
                      className="text-muted-foreground hover:text-foreground transition-colors" 
                      aria-label="To application"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
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
            <div className={cn("h-[260px] overflow-y-auto pr-1 space-y-4", styles.customscrollbar)}>
              {saved.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 pb-2">
                  <div className="flex gap-3">
                    <div className="flex justify-center items-center min-w-[40px] mr-1">
                      {item.university_id ? (<Image
                          src={`/universities/${item.university_id}.png`}
                          alt={item.university_id}
                          width={48}
                          height={48}
                          className="object-contain"
                          style={{ height: "auto", width: "auto", maxHeight: "40px", maxWidth: "40px" }}
                        />
                      ) : (      
                        <SearchIcon className="text-gray-400 h-8 w-8" />
                        )}
                        
                      </div>
                    <div>
                      <p className="font-medium">{item.program}</p>
                      <p className="text-sm text-muted-foreground">{item.university}</p>
                    </div>
                  </div>
                  <button 
                      className="text-muted-foreground hover:text-foreground transition-colors" 
                      aria-label="To saved"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
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
    university_id: "ubc",
    details: "UBC Engineering supplementary application due",
    date: "2025-04-15", // ISO format: YYYY-MM-DD
  },
  {
    university_id: "u_calgary",
    details: "Submit official transcripts to U of Calgary Admissions Office",
    date: "2025-04-01",
  },
  {
    university_id: "mcgill",
    details: "McGill residence application priority deadline",
    date: "2025-04-17",
  },
  {
    university_id: "u_of_t",
    details: "UofT scholarship application documents due",
    date: "2025-03-28",
  },
  {
    university_id: "u_waterloo",
    details: "Waterloo's major admission award application due",
    date: "2025-03-30",
  }
]

const messages = [
  {
    avatar: "/avatar1.png",
    name: "Michael Dry",
    content: "My main advice would be to make it personal and specific — don’t just list achievements, but show how they’ve shaped you. Universities love to see your passion, unique experiences, and how you think.",
    time: "7h",
  },
  {
    avatar: "/avatar2.png",
    name: "Vanessa Hu",
    content: "Replied to your thread in UBC Housing",
    time: "1h",
  },
]

const applications = [
  {
    university_id: "mcgill",
    program: "Software Engineering",
    university: "McGill University",
  },
  {
    university_id: "u_calgary",
    program: "Electrical Engineering",
    university: "University of Calgary",
  },
  {
    university_id: "ubc",
    program: "Integrated Sciences",
    university: "University of British Columbia",
  },
]

const saved = [
  {
    university_id: "mcgill",
    program: "Life Sciences",
    university: "McGill University",
  },
  {
    program: '"engineering montreal"',
    university: "Search Result",
  },
  {
    university_id: "ubc",
    program: "Kinesiology",
    university: "University of British Columbia",
  },
  {
    university_id: "u_waterloo",
    program: "Bioinformatics",
    university: "University of Waterloo",
  },
]



