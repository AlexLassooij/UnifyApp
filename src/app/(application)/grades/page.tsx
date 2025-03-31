"use client"

import { useState, useMemo, useEffect } from "react"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Course, UserGrade } from "@/types/datamodel/datamodel"
import { PercentageToGPA, PercentageToGradeLetter } from "@/lib/label_mappings"
import { useUserStore } from "@/store/userStore"

// Interface for the data we display in the table

interface GradeData extends UserGrade {
  id: string; 
}

// Interface for the table row props
interface GradeRowProps extends Omit<GradeData, 'curriculum_type' | 'subject'> {
  selected: boolean
  onToggleSelect: (id: string) => void
}

interface UniversityOptionProps {
  name: string
}

// TODO : add delete option
export default function GradesOverview() {
  const defaultNewGrade: Omit<UserGrade, 'curriculum_type'> = {
    course_code: "",
    subject: "",
    grade: 0,
    completed: "in_progress",
    year: "24 / 25"
  }
  
  // list of id's
  const [selectedGrades, setSelectedGrades] = useState<Set<string>>(new Set())
  
  // state for adding new grade
  const [courseSubjects, setCourseSubjects] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [academicYear, setAcademicYear] = useState<string>("24 / 25")
  const [grades, setGrades] = useState<GradeData[]>([])
  const [newGrade, setNewGrade] = useState<typeof defaultNewGrade>(defaultNewGrade);


  // loading states
  const [isLoadingGrades, setIsLoadingGrades] = useState(true)
  const [isAddingGrade, setIsAddingGrade] = useState(false);
  
  // user state
  const { user } = useUserStore()


  const academicYears = ["23 / 24", "24 / 25", "25 / 26"]
  
  // Update the course selection to set both course_code and subject
  const handleCourseSelect = (courseCode: string) => {
    setSelectedCourse(courseCode);
    const selectedCourse = courseSubjects.find(course => course.course_code === courseCode);
    
    setNewGrade(prev => ({
      ...prev,
      course_code: courseCode,
      subject: selectedCourse?.subject || ""
    }));
  };

  // Update the course selection to set both course_code and subject
  const handleAcademicYearSelect = (academicYear: string) => {
    setAcademicYear(academicYear);
    
    setNewGrade(prev => ({
      ...prev,
      year: academicYear
    }));
  };
  
  // API call handlers
  
  // Add this function to handle grade submission
  const handleAddGrade = async () => {    
    setIsAddingGrade(true);
    
    try {
      const response = await fetch(`/api/users/${user?.id}/grades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newGrade,
          curriculum_type: user?.curriculum,
        }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      // Refresh grades
      await fetchUserGrades(user?.id);
      
      setNewGrade(defaultNewGrade);
      
    } catch (error) {
      console.error("Failed to add grade:", error);
    } finally {
      setIsAddingGrade(false);
    }
  };

  

  const fetchUserGrades = async (userId?: string) => {
    if (!userId) {
      console.log("No user ID available")
      setIsLoadingGrades(false)
      return
    }
    setIsLoadingGrades(true)
    try {
      // Fetch grades from the API endpoint
      const response = await fetch(`/api/users/${userId}/grades`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const fetchedGrades = data.grades || [];
      setGrades(fetchedGrades);
      console.debug(`Loaded ${fetchedGrades.length} grades for user: ${userId}`);
      // Initially select all grades
      setSelectedGrades(new Set(fetchedGrades.map((g: GradeData) => g.id)));
    } catch (error) {
      console.error("Failed to fetch grades:", error);
    } finally {
      console.debug(grades)
      setIsLoadingGrades(false);
    }
  }
   
  const fetchCurriculum = async () => {
    if (!user?.curriculum) {
      console.log("No user curriculum available")
      return
    }
    
    try {
      // Fetch from the curriculum endpoint with the user's curriculum as the parameter
      // should be cached
      const response = await fetch(`/api/curriculum/${user.curriculum}`)
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      setCourseSubjects(data.subjects || [])
      console.debug(`Loaded ${data.subjects?.length || 0} subjects for curriculum: ${user.curriculum}`)
    } catch (error) {
      console.error("Failed to fetch subjects:", error)
    }
  }

  // Fetch curriculum subjects
  useEffect(() => {
    fetchCurriculum()
  }, [user?.curriculum])


  // Fetch user grades
  useEffect(() => {
    if (!user?.id) {
      console.log("No user ID available")
      setIsLoadingGrades(false)
      return
    }
    fetchUserGrades(user.id)
  }, [user?.id])

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedGrades)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedGrades(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGrades(new Set(grades.map(g => g.id)))
    } else {
      setSelectedGrades(new Set())
    }
  }

  // Calculate average percentage and GPA based on selected grades
  const { averagePercentage, gpa } = useMemo(() => {
    // Filter selected grades
    const selectedGradeItems = grades.filter(grade => selectedGrades.has(grade.id))
  
    if (selectedGradeItems.length === 0) {
      return { averagePercentage: 0, gpa: 0 }
    }
    
    const totalPercentage = selectedGradeItems.reduce((sum, grade) => sum + grade.grade, 0)
    const avgPercentage = totalPercentage / selectedGradeItems.length
    
    // Calculate GPA (4.0 scale) using the extracted function
    const avgGpa = PercentageToGPA(avgPercentage)
    return { 
      averagePercentage: parseFloat(avgPercentage.toFixed(1)), 
      gpa: (avgGpa.toFixed(1))
    }
  }, [grades, selectedGrades])

  return (
    <div className="flex h-full overflow-hidden"> {/* Adjusted height */}
      {/* Main Content */}
      <div className="flex-1 bg-[#f3f3f3] overflow-hidden flex flex-col">
        <h1 className="text-4xl font-bold mb-4"> {/* Reduced margin */}
          Grades Overview
        </h1>

        <div className="flex flex-col lg:flex-row flex-1 space-y-4 lg:space-y-0 lg:space-x-6 overflow-hidden">
        {/* Left Column - Filters and Table */}
          <div className="flex-1 flex flex-col space-y-4 overflow-hidden"> {/* Reduced spacing */}
            {/* Add New Grade */}
            <Card className="shrink-0">
              <CardContent className="p-4 pt-5"> {/* Extra top padding to compensate for no header */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Course</label>
                    <Select 
                      value={selectedCourse} 
                      onValueChange={handleCourseSelect}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseSubjects.length === 0 ? (
                          <SelectItem value="loading" disabled>
                            {user?.curriculum ? "Loading courses..." : "No curriculum found"}
                          </SelectItem>
                        ) : (
                          courseSubjects.map((course) => (
                            <SelectItem key={`${course.subject}_${course.course_code}`} value={course.course_code}>
                              {course.course_code}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Academic Year</label>
                      <div className="flex items-center space-x-2">
                        
                        <Select 
                          value={academicYear}
                          onValueChange={handleAcademicYearSelect}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {academicYears.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* added dummy button for symmetrical ness */}
                        <Button 
                            disabled={true}
                            className="h-8 flex items-center shrink-0 invisible"
                            size="sm"
                          >
                              <>
                                <Plus className="h-3.5 w-3.5 mr-1" />
                                <span>Add</span>
                              </>
                          </Button>
                        </div>
                    </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Grade</label>
                    <div className="relative">
                      <Input 
                        type="number"
                        min="0" 
                        max="100"
                        placeholder="0-100" 
                        value={newGrade.grade || ''}
                        className="pr-8 h-8"
                        onChange={(e) => {
                          // Ensure the value is between 0-100
                          let value = parseInt(e.target.value);
                          if (isNaN(value)) value = 0;
                          if (value < 0) value = 0;
                          if (value > 100) value = 100;
                          
                          setNewGrade(prev => ({
                            ...prev,
                            grade: value
                          }));
                        }}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <div className="flex items-center space-x-2">
                      <Select 
                        value={newGrade.completed}
                        onValueChange={(value: "completed" | "in_progress") => 
                          setNewGrade(prev => ({ ...prev, completed: value }))
                        }
                      >
                        <SelectTrigger className="h-8 flex-1">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        onClick={handleAddGrade}
                        disabled={isAddingGrade || !newGrade.course_code || !newGrade.grade}
                        className="h-8 flex items-center shrink-0"
                        size="sm"
                      >
                        {isAddingGrade ? (
                          <span>Adding...</span>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5 mr-1" />
                            <span>Add</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grades Table */}
            <Card className="flex-1 overflow-hidden">
            <CardContent className="p-0 h-full overflow-auto scrollbar-thin">
              <Table className="relative w-full overflow-auto">                  
                  <TableHeader className="sticky top-0 z-10 bg-white">
                    <TableRow>
                      <TableHead className="w-[50px] px-4">
                        <Checkbox 
                          checked={selectedGrades.size === grades.length && grades.length > 0} 
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all grades"
                          disabled={isLoadingGrades || grades.length === 0}
                        />
                      </TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingGrades ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Loading grades...
                        </TableCell>
                      </TableRow>
                    ) : grades.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No grades found. Add some grades to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      grades.map((grade) => (
                        <GradeRow
                          key={grade.id}
                          id={grade.id}
                          selected={selectedGrades.has(grade.id)}
                          onToggleSelect={handleToggleSelect}
                          year={grade.year}
                          course_code={grade.course_code}
                          grade={grade.grade}
                          completed={grade.completed}
                        />
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Grade Format and University Selection */}
          <div className="w-full lg:w-[200px] flex flex-col"> {/* Responsive width */}
          {/* Grade Format */}

            {/* University Selection */}
            <Card className="flex-1 overflow-hidden flex flex-col">
              <CardHeader className="py-3 px-4"> {/* Reduced padding */}
                <CardTitle className="text-center text-base">Select a University</CardTitle> {/* Reduced size */}
                <p className="text-center text-xs text-muted-foreground">See how universities calculate your GPA</p> {/* Reduced size */}
              </CardHeader>
              <CardContent className="flex flex-col flex-1 p-3"> {/* Reduced padding */}
                <div className="flex-1 overflow-auto scrollbar-styled">
                  <div className="space-y-1"> {/* Reduced spacing */}
                    <UniversityOption name="UBC Engineering" />
                    <UniversityOption name="UofT Engineering" />
                    <UniversityOption name="UofA Engineering" />
                    <UniversityOption name="UBC Sciences" />
                    <UniversityOption name="UofT Sciences" />
                  </div>
                </div>

                <div className="mt-3"> {/* Reduced margin */}
                

                  <Separator className="mb-3" /> {/* Reduced margin */}

                  <div className="space-y-1"> {/* Reduced spacing */}
                    <div className="flex justify-between items-center">
                      <span className="text-base text-purple">Average</span> {/* Reduced size */}
                      <span className="text-xl font-bold text-purple">
                        {selectedGrades.size > 0 ? `${averagePercentage}% (${PercentageToGradeLetter(averagePercentage)})` : 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-base text-purple">GPA</span> {/* Reduced size */}
                      <span className="text-xl font-bold text-purple">
                        {selectedGrades.size > 0 ? gpa : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function GradeRow({ id, selected, onToggleSelect, year, course_code, grade, completed }: GradeRowProps) {
  // Extract the percentage value from the grade string (e.g., "87%")
  // Get the letter grade from the percentage
  const letterGrade = PercentageToGradeLetter(grade);
  
  return (
    <TableRow>
      <TableCell className="py-4 px-4">
        <Checkbox 
          checked={selected} 
          onCheckedChange={() => onToggleSelect(id)}
        />
      </TableCell>
      <TableCell className="py-4">{year}</TableCell>
      <TableCell className="font-medium py-2">{course_code}</TableCell>
      <TableCell className="py-4">
        <div className="flex justify-start items-center gap-2">
          <span className="font-medium">{grade} %</span>
          <span className="text-xs text-muted-foreground">({letterGrade})</span>
        </div>
      </TableCell>
      <TableCell className="py-4">
        <span className={cn(
          "px-2 py-0.5 rounded text-xs",  /* Reduced size */
          completed === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
        )}>
          {completed === "completed" ? "Yes" : "IP"}
        </span>
      </TableCell>
    </TableRow>
  )
}

function UniversityOption({ name }: UniversityOptionProps) {
  return (
    <div className="p-2 rounded-md hover:bg-muted cursor-pointer"> {/* Reduced padding */}
      <span className="font-medium text-sm">{name}</span> {/* Reduced size */}
    </div>
  )
}