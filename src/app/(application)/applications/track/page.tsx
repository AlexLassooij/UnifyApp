'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Check, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { useUserStore } from "@/store/userStore"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Application, ApplicationStatus } from "@/types/datamodel/datamodel"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
// import { APPLICATION_STATUSES } from "@/lib/application_status";
import { InstantSearch } from 'react-instantsearch';
import { searchClient } from '@/firebase/clientApp';
import { ProgramSearchDropdown } from "@/components/ui/program-search-dropdown"

export const APPLICATION_STATUSES = [
  { value: "not_started" as ApplicationStatus, label: "Not Started", color: "bg-[#d9d9d9]", textColor: "text-[#191919]" },
  { value: "in_progress" as ApplicationStatus, label: "In Progress", color: "bg-[#ffd866]", textColor: "text-[#8d5800]" },
  { value: "completed" as ApplicationStatus, label: "Completed", color: "bg-[#ceead6]", textColor: "text-[#0d652d]" },
] as const;
// TODO disable manual fields if program is selected. change order of data to submit to reflect this properly
// Define statuses as a constant outside the component


export default function ApplicationTrackPage() {
  const router = useRouter()
  const { user } = useUserStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Basic application details
  const [formData, setFormData] = useState<Application>({
    program_id: "",
    university_name: "",
    university_id: "",
    program_name: "",
    status: "not_started",
    application_date: new Date(),
    application_deadline: new Date(),
    notes: [],
    sub_tasks: [],
    last_updated: new Date(),
  })

  // Task management
  const [taskData, setTaskData] = useState({
    name: "",
    status: "not_started" as ApplicationStatus,
    deadline: new Date(),
    notes: ""
  })

  const handleProgramSelect = (program: { program_id: string, program_name: string, university_id: string, university_name: string }) => {
    setFormData(prev => ({ 
      ...prev, 
      program_id: program.program_id,
      program_name: program.program_name,
      university_id: program.university_id,
      university_name: program.university_name
    }));
  };
  
  // Note management
  const [noteText, setNoteText] = useState("")
  
  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteType, setDeleteType] = useState<'note' | 'task' | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  
  // Calendar state
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [taskCalendarOpen, setTaskCalendarOpen] = useState(false)

  // Handle input changes for basic details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Add a new note
  const handleAddNote = () => {
    if (!noteText.trim()) return
    
    setFormData(prev => ({
      ...prev,
      notes: [...prev.notes, { text: noteText }]
    }))
    
    setNoteText("")
  }

  // Delete a note
  const handleDeleteNote = (index: number) => {
    setDeleteType('note')
    setDeleteIndex(index)
    setDeleteDialogOpen(true)
  }

  // Handle task input changes
  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTaskData(prev => ({ ...prev, [name]: value }))
  }

  // Add a new task
  const handleAddTask = () => {
    if (!taskData.name.trim()) return
    
    setFormData(prev => ({
      ...prev,
      sub_tasks: [...prev.sub_tasks, { ...taskData }]
    }))
    
    // Reset task form
    setTaskData({
      name: "",
      status: "not_started",
      deadline: new Date(),
      notes: ""
    })
  }

  // Delete a task
  const handleDeleteTask = (index: number) => {
    setDeleteType('task')
    setDeleteIndex(index)
    setDeleteDialogOpen(true)
  }

  // Confirm deletion
  const confirmDelete = () => {
    if (deleteType === 'note' && deleteIndex !== null) {
      const updatedNotes = [...formData.notes]
      updatedNotes.splice(deleteIndex, 1)
      setFormData(prev => ({ ...prev, notes: updatedNotes }))
    } else if (deleteType === 'task' && deleteIndex !== null) {
      const updatedTasks = [...formData.sub_tasks]
      updatedTasks.splice(deleteIndex, 1)
      setFormData(prev => ({ ...prev, sub_tasks: updatedTasks }))
    }
    
    setDeleteDialogOpen(false)
    setDeleteType(null)
    setDeleteIndex(null)
  }

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Extract university and program if using program_id
      // In a real app, you would fetch this from your programs database
      
      
      const response = await fetch(`/api/users/${user?.id}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/applications')
      } else {
        console.error('Failed to create application')
      }
    } catch (error) {
      console.error('Error creating application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/applications">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold text-[#191919]">Track a New Application</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Program Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                Program Details
                <Calendar className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Replace the existing program select with InstantSearch */}
                <InstantSearch searchClient={searchClient} indexName="program-index">
                    <ProgramSearchDropdown 
                      onSelect={handleProgramSelect}
                      placeholder="Search for a program"
                    />
                  </InstantSearch>

                  {/* If no program is found, allow manual entry */}
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 mb-4">Can&apos;t find your program? Enter details manually:</p>
                  
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        name="university"
                        placeholder="University name"
                        value={formData.university_name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2 mt-2">
                      <Label htmlFor="program">Program</Label>
                      <Input
                        name="program"
                        placeholder="Program name"
                        value={formData.program_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      name="status" 
                      defaultValue="not_started"
                      onValueChange={(value) => handleSelectChange("status", value as ApplicationStatus)}
                    >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {APPLICATION_STATUSES.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", status.color)}></div>
                            <span className={status.textColor}>{status.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(formData.application_deadline, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={formData.application_deadline}
                        onSelect={(date) => {
                          if (date) {
                            setFormData(prev => ({ ...prev, application_deadline: date }))
                            setCalendarOpen(false)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="note">Add Note</Label>
                    <Textarea 
                      id="note"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add any notes or reminders for this application"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button onClick={handleAddNote} type="button">Add</Button>
                </div>
                
                <div className="space-y-2">
                  {formData.notes.length === 0 ? (
                    <div className="bg-gray-50 rounded p-3 text-sm text-gray-500 text-center">
                      No notes yet. Add a note above.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {formData.notes.map((note, index) => (
                        <div key={index} className="bg-gray-50 rounded p-3 flex justify-between group">
                          <p className="text-sm text-gray-600">{note.text}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500"
                            onClick={() => handleDeleteNote(index)}
                            type="button"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tasks Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taskName">Task Name</Label>
                    <Input
                      id="taskName"
                      name="name"
                      value={taskData.name}
                      onChange={handleTaskInputChange}
                      placeholder="Enter task name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="taskStatus">Status</Label>
                    <Select
                      name="status"
                      value={taskData.status}
                      onValueChange={(value) => setTaskData(prev => ({ ...prev, status: value as ApplicationStatus }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {APPLICATION_STATUSES.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center gap-2">
                              <div className={cn("w-2 h-2 rounded-full", status.color)}></div>
                              <span className={status.textColor}>{status.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="taskDeadline">Deadline</Label>
                    <Popover open={taskCalendarOpen} onOpenChange={setTaskCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {format(taskData.deadline, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={taskData.deadline}
                          onSelect={(date) => {
                            if (date) {
                              setTaskData(prev => ({ ...prev, deadline: date }))
                              setTaskCalendarOpen(false)
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="taskNotes">Task Notes</Label>
                  <Textarea
                    id="taskNotes"
                    name="notes"
                    value={taskData.notes}
                    onChange={handleTaskInputChange}
                    placeholder="Add notes for this task"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={handleAddTask}
                    disabled={!taskData.name.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {formData.sub_tasks.length === 0 ? (
                    <div className="bg-gray-50 rounded p-3 text-sm text-gray-500 text-center">
                      No tasks yet. Add tasks using the form above.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {formData.sub_tasks.map((task, index) => {
                        const taskStatus = APPLICATION_STATUSES.find((s) => s.value === task.status) || APPLICATION_STATUSES[0];
                        
                        return (
                          <div key={index} className="bg-gray-50 rounded p-3">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{task.name}</h4>
                                  <Badge className={cn(taskStatus.color, taskStatus.textColor, "font-normal")}>
                                    {taskStatus.label}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                  Due: {format(new Date(task.deadline), "PPP")}
                                </div>
                                {task.notes && (
                                  <div className="text-sm text-gray-600 mt-2">
                                    {task.notes}
                                  </div>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-500"
                                onClick={() => handleDeleteTask(index)}
                                type="button"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Form Actions */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <Button variant="outline" asChild>
              <Link href="/applications">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : (
                <>Track Application <Check className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteType === 'note' ? 'Delete Note' : 'Delete Task'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deleteType}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}