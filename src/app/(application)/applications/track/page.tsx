'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Upload, Check } from "lucide-react"
import { LucideIcon } from '@/components/ui/icon';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ApplicationStatus } from "@/types/datamodel/datamodel"

export default function ApplicationsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    program_id: "",
    status: "not_started" as ApplicationStatus,
    application_date: new Date().toISOString().split('T')[0], // only pull out date, not time
    application_deadline: "",
    notes: [{
      title: "Initial Notes",
      points: [""]
    }]
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNoteChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      notes: [{ 
        title: "Initial Notes", 
        points: [value] 
      }]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // You would replace this with actual user ID from auth context
      const userId = "your-user-id"
      
      const response = await fetch(`/api/users/${userId}/applications`, {
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/applications">
             <LucideIcon icon={ArrowLeft} size="lg" color="default" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold text-[#191919]">Track a New Application</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                Program Details
                <Calendar className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="program_id">Program</Label>
                  <Select 
                    name="program_id" 
                    onValueChange={(value) => handleSelectChange("program_id", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prog1">Software Engineering - McGill University</SelectItem>
                      <SelectItem value="prog2">Computer Science - University of Toronto</SelectItem>
                      <SelectItem value="prog3">Biology - UBC</SelectItem>
                      <SelectItem value="prog4">Political Science - Queens University</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="not_started">Not Started</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Input 
                    type="date" 
                    name="application_deadline" 
                    value={formData.application_deadline} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                Application Notes
                <Upload className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    name="notes" 
                    placeholder="Add any notes or reminders for this application" 
                    className="min-h-[150px]"
                    onChange={(e) => handleNoteChange(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                Supporting Documents
                <Upload className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2">
                <div className="border border-dashed rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-slate-400" />
                    <div className="text-sm font-medium">Upload Transcript</div>
                    <div className="text-xs text-slate-500">PDF or image up to 10MB</div>
                  </div>
                </div>
                <div className="border border-dashed rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-slate-400" />
                    <div className="text-sm font-medium">Upload Reference Letter</div>
                    <div className="text-xs text-slate-500">PDF up to 10MB</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline" asChild>
                <Link href="/applications">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Processing</>
                ) : (
                  <>Create Application <Check className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}