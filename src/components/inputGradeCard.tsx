"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

interface Course {
  name: string
  grade: string
  startDate: Date | undefined
  endDate: Date | undefined
  credits: string
}

export default function CourseEntryForm() {
  const [courses, setCourses] = useState<Course[]>([
    {
      name: "",
      grade: "",
      startDate: undefined,
      endDate: undefined,
      credits: "",
    },
  ])

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        name: "",
        grade: "",
        startDate: undefined,
        endDate: undefined,
        credits: "",
      },
    ])
  }

  const updateCourse = (index: number, field: keyof Course, value: any) => {
    const updatedCourses = [...courses]
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value,
    }
    setCourses(updatedCourses)
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <Label htmlFor={`course-name-${index}`} className="mb-1 block">
                Course Name
              </Label>
              <Input
                id={`course-name-${index}`}
                placeholder="e.g Math"
                value={course.name}
                onChange={(e) => updateCourse(index, "name", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="col-span-1">
              <Label htmlFor={`grade-${index}`} className="mb-1 block">
                Grade
              </Label>
              <div className="relative">
                <Input
                  id={`grade-${index}`}
                  placeholder=""
                  value={course.grade}
                  onChange={(e) => {
                    // Only allow numbers and decimal point
                    const value = e.target.value.replace(/[^0-9.]/g, "")
                    updateCourse(index, "grade", value)
                  }}
                  className="pr-6"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            <div className="col-span-2">
              <Label htmlFor={`start-date-${index}`} className="mb-1 block">
                Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between text-left font-normal">
                    {course.startDate ? (
                      format(course.startDate, "MMM d, yy")
                    ) : (
                      <span className="text-muted-foreground">Select date</span>
                    )}
                    <span className="opacity-50">▼</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={course.startDate}
                    onSelect={(date) => updateCourse(index, "startDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="col-span-2">
              <Label htmlFor={`end-date-${index}`} className="mb-1 block">
                End Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between text-left font-normal">
                    {course.endDate ? (
                      format(course.endDate, "MMM d, yy")
                    ) : (
                      <span className="text-muted-foreground">Select date</span>
                    )}
                    <span className="opacity-50">▼</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={course.endDate}
                    onSelect={(date) => updateCourse(index, "endDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="col-span-2">
              <Label htmlFor={`credits-${index}`} className="mb-1 block">
                Credits
              </Label>
              <Input
                id={`credits-${index}`}
                placeholder="Optional"
                value={course.credits}
                onChange={(e) => updateCourse(index, "credits", e.target.value)}
                className="w-full"
              />
            </div>

            {index === courses.length - 1 && (
              <div className="col-span-1">
                <Button
                  type="button"
                  onClick={addCourse}
                  size="icon"
                  className="mt-6 bg-[#a78bfa] hover:bg-[#9747ff] text-white"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

