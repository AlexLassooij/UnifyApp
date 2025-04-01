// Home Page
'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Bookmark, MessageSquare, Files, ChevronRight, SearchIcon, Reply } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useUserStore } from "@/store/userStore"
import { cn } from "@/lib/utils";
import styles from './styles.module.css'
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { fetchUserApplications } from "@/lib/api/fetchers/applications"
import { Application } from "@/types/datamodel/datamodel"
import { ApplicationItem, DeadlineItem, DeadlineItemProps } from "@/components/deadline-item"

export default function Dashboard() {
  const { user } = useUserStore()
  const router = useRouter()


  const futureDate = (days: number): string => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const [applicationDeadlines, setApplicationDeadlines] = useState<DeadlineItemProps[]>([]);
  const [subtaskDeadlines, setSubtaskDeadlines] = useState<DeadlineItemProps[]>([]);

  const createDeadlineItems = (applications: Application[]) => {
    const subTaskItems: DeadlineItemProps[] = [];
    const applicationItems: DeadlineItemProps[] = [];
    applications.forEach((app) => {
      applicationItems.push({
        application_id: app.id ?? "unknown_id",
        university_id: app.university_id,
        university_name: app.university_name,
        program_name: app.program_name,
        details: `${app.program_name} application deadline`,
        date: app.application_date
      });

      if (app.sub_tasks.length > 0) {
        app.sub_tasks.forEach((task) => {
          subTaskItems.push({
            application_id: app.id ?? "unknown_id",
            university_id: app.university_id,
            details: task.name,
            date: task.deadline
          });
        });
      }
    })
    setApplicationDeadlines(applicationItems);
    setSubtaskDeadlines(subTaskItems);
  }

  const allDeadlines = useMemo(() => {
    // Combine static and dynamic deadlines
    const combined = [...applicationDeadlines, ...subtaskDeadlines];
    
    // Sort by date
    return combined.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [applicationDeadlines, subtaskDeadlines]);

  const deadlines = [
    {
      university_id: "university_of_british_columbia",
      details: "UBC Engineering supplementary application due",
      date: futureDate(18), // 18 days from today
    },
    {
      university_id: "u_calgary",
      details: "Submit official transcripts to U of Calgary Admissions Office",
      date: futureDate(2), // 1 day from today
    },
    {
      university_id: "mcgill",
      details: "McGill residence application priority deadline",
      date: futureDate(14), // Today
    },
    {
      university_id: "university_of_toronto",
      details: "UofT scholarship application documents due",
      date: futureDate(0), // 4 days ago
    },
    {
      university_id: "u_waterloo",
      details: "Waterloo's major admission award application due",
      date: futureDate(-4), // 4 days ago (keeping this from your original list)
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
  
  const hardapplications = [
    {
      university_id: "mcgill",
      program_name: "Software Engineering",
      university_name: "McGill University",
    },
    {
      university_id: "u_calgary",
      program_name: "Electrical Engineering",
      university_name: "University of Calgary",
    },
    {
      university_id: "university_of_british_columbia",
      program_name: "Integrated Sciences",
      university_name: "University of British Columbia",
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
      university_id: "university_of_british_columbia",
      program: "Kinesiology",
      university: "University of British Columbia",
    },
    {
      university_id: "u_waterloo",
      program: "Bioinformatics",
      university: "University of Waterloo",
    },
  ]

  
  
    useEffect(() => {
      async function loadApplications() {
        if (user?.id) {
          const data = await fetchUserApplications(user.id);
          createDeadlineItems(data);
        }
      }
      loadApplications();
    }, [user?.id]);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-[#191919]">Hello, {user?.name.split(" ")[0]}</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader  className="cursor-pointer" onClick={() => router.push("/applications")}>
            <CardTitle className="flex items-center gap-4">
              Upcoming Deadlines
              <Calendar className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("h-[260px] overflow-y-auto pr-1 space-y-4", styles.customscrollbar)}>
              {allDeadlines.length > 0 && allDeadlines
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((deadline, i) => {
                return (
                  <DeadlineItem
                    key={`deadline-${i}`}
                    application_id={deadline.application_id}
                    university_id={deadline.university_id}
                    details={deadline.details}
                    date={deadline.date}
                    onClick={() => deadline.application_id && router.push(`/applications/?app_id=${deadline.application_id}`)}
                  />
                );}
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/applications">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="cursor-pointer" onClick={() => router.push("/forums")}>
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
                <Link href="/forums">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="cursor-pointer" onClick={() => router.push("/applications")}>
            <CardTitle className="flex items-center gap-4">
              Applications
              <Files className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("h-[260px] overflow-y-auto pr-1 space-y-4", styles.customscrollbar)}>
              {applicationDeadlines.map((app, i) => {
                return(
                  <ApplicationItem
                    key={`deadline-${i}`}
                    application_id={app.application_id}
                    university_id={app.university_id}
                    university_name={app.university_name}
                    program_name={app.program_name}
                    onClick={() => app.application_id && router.push(`/applications/?app_id=${app.application_id}`)}
                  />
                )
              })}
            </div>
          </CardContent>
          <CardFooter className="pt-3 mt-auto">
            <div className="w-full flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/applications">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="cursor-pointer" onClick={() => router.push("/saved")}>
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





