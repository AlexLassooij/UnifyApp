"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Check, ChevronRight, Calendar as CalendarIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Application, ApplicationStatus } from "@/types/datamodel/datamodel";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";


// First, add these imports at the top of the file
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubheadingAndParagraph, ParagraphList } from "@/types/utility/text_types";
import { useUserStore } from "@/store/userStore";
// Import any database functions you need for updates
// import { updateApplication } from "@/firebase/applications"; 

// TODO add programs data to DB, more unis, re-do app track page, support docs with link ?, adjust page to get data from DB, modify data when making edits (status, adding notes, subtasks)
// Define types at the top level

// Define statuses as a constant outside the component
const APPLICATION_STATUSES = [
  { value: "not_started" as ApplicationStatus, label: "Not Started", color: "bg-[#d9d9d9]", textColor: "text-[#191919]" },
  { value: "in_progress" as ApplicationStatus, label: "In Progress", color: "bg-[#ffd866]", textColor: "text-[#8d5800]" },
  { value: "completed" as ApplicationStatus, label: "Completed", color: "bg-[#ceead6]", textColor: "text-[#0d652d]" },
] as const;

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

// Memoize NavItem component since it doesn't have internal state
function NavItem({ icon, label, active = false, href = "#" }: NavItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center space-y-1">
      <div className={cn("p-2", active ? "text-foreground" : "text-muted-foreground")}>{icon}</div>
      <span className={cn("text-sm", active ? "font-medium" : "font-normal")}>{label}</span>
    </Link>
  );
}



// Update the ApplicationRowProps interface
// interface ApplicationRowProps extends Omit<Application, 'program_id'> {
//   selected: boolean
//   onToggleSelect: (id: string) => void
// }

interface ApplicationRowProps {
  initialStatus: ApplicationStatus;
  university: string;
  program: string;
  deadline: Date;
  lastUpdated: Date;
  notes?: ParagraphList;
  subTasks?: {
    name: string;
    status: ApplicationStatus;
    deadline: Date;
    notes: string;
  }[];
  onStatusChange?: (status: ApplicationStatus) => void;
  onNotesChange?: (notes: ParagraphList) => void;
  onSubTaskChange?: (subTasks: any[]) => void;
  onDeadlineChange?: (date: Date) => void;
}

// Then update the ApplicationRow component
// Then update the ApplicationRow component
function ApplicationRow({ 
  initialStatus, 
  university, 
  program, 
  deadline, 
  lastUpdated,
  notes = [],
  subTasks = [],
  onStatusChange,
  onNotesChange,
  onSubTaskChange,
  onDeadlineChange
}: ApplicationRowProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ApplicationStatus>(initialStatus);
  const [expanded, setExpanded] = useState(false);

  // editing notes
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState("");

  // editing sub tasks
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [editingTaskNotes, setEditingTaskNotes] = useState("");
  const [calendarOpen, setCalendarOpen] = useState<{index: number, type: 'main' | 'task'} | null>(null);
  const [editingTaskName, setEditingTaskName] = useState(""); // Add this new state variable
  const [isEditingTaskName, setIsEditingTaskName] = useState(false); // Add this to track name editing mode

  // deleting
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'note' | 'task' | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  
  // Reference for the text area to focus when editing starts
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    // Focus the textarea when editing starts
    if (editingNoteIndex !== null && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [editingNoteIndex]);

  const currentStatus = APPLICATION_STATUSES.find((s) => s.value === status) || APPLICATION_STATUSES[0];

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    setStatus(newStatus);
    setOpen(false);
    onStatusChange?.(newStatus); // Call the optional callback
  };

  // Add new note
  const handleAddNote = () => {
    const updatedNotes = [...notes, { text: "" }];
    onNotesChange?.(updatedNotes);
    
    // Optionally start editing the new note immediately
    setEditingNoteIndex(updatedNotes.length - 1);
    setEditingNote("");
  };
  
  // Add new subtask
  const handleAddSubTask = () => {
    const newTask = {
      name: "New Task",
      status: "not_started" as ApplicationStatus,
      deadline: new Date(),
      notes: ""
    };
    
    const updatedTasks = [...subTasks, newTask];
    onSubTaskChange?.(updatedTasks);
  };

  const  handleTaskStatusChange = (index: number , value: ApplicationStatus) => {
    const updatedTasks = [...subTasks];
    updatedTasks[index] = { ...updatedTasks[index], status: value };
    onSubTaskChange?.(updatedTasks);
  }


  // Add these new functions to handle task name editing
  const startEditingTaskName = (index: number, name: string) => {
    setEditingTaskIndex(index);
    setEditingTaskName(name);
    setIsEditingTaskName(true);
  };

  const saveTaskNameChanges = (index: number) => {
    // Create a copy of the tasks array
    const updatedTasks = [...subTasks];
    // Update the specific task name
    updatedTasks[index] = { ...updatedTasks[index], name: editingTaskName };
    
    // Call the callback to save changes
    onSubTaskChange?.(updatedTasks);
    
    // Exit edit mode
    setEditingTaskIndex(null);
    setIsEditingTaskName(false);
  };
  
  const startEditingNote = (index: number, text: string) => {
    setEditingNoteIndex(index);
    setEditingNote(text);
  };
  
  const saveNoteChanges = (index: number) => {
    // Create a copy of the notes array
    const updatedNotes = [...notes];
    // Update the specific note
    updatedNotes[index] = { ...updatedNotes[index], text: editingNote };
    
    // Call the callback to save changes
    onNotesChange?.(updatedNotes);
    
    // Exit edit mode
    setEditingNoteIndex(null);
  };
  
  const startEditingTaskNotes = (index: number, notes: string) => {
    setEditingTaskIndex(index);
    setEditingTaskNotes(notes);
    setIsEditingTaskName(false); // Make sure we're not in name editing mode
  };
  
  const saveTaskNotes = (index: number) => {
    // Create a copy of the tasks array
    const updatedTasks = [...subTasks];
    // Update the specific task notes
    updatedTasks[index] = { ...updatedTasks[index], notes: editingTaskNotes };
    
    // Call the callback to save changes
    onSubTaskChange?.(updatedTasks);
    
    // Exit edit mode
    setEditingTaskIndex(null);
  };
  
  const handleDeadlineChange = (date: Date | undefined, taskIndex?: number) => {
    if (!date) return;
    
    if (taskIndex !== undefined) {
      // Update task deadline
      const updatedTasks = [...subTasks];
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], deadline: date };
      onSubTaskChange?.(updatedTasks);
    } else {
      // Update main deadline (you'll need to implement this callback)
      onDeadlineChange?.(date);
    }
    
    // Close calendar
    setCalendarOpen(null);
  };

  const handleDeleteNote = (index: number) => {
    setDeleteType('note');
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  // Add delete task function
  const handleDeleteTask = (index: number) => {
    setDeleteType('task');
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  // Add confirm delete function
  const confirmDelete = () => {
    if (deleteType === 'note' && deleteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes.splice(deleteIndex, 1);
      onNotesChange?.(updatedNotes);
    } else if (deleteType === 'task' && deleteIndex !== null) {
      const updatedTasks = [...subTasks];
      updatedTasks.splice(deleteIndex, 1);
      onSubTaskChange?.(updatedTasks);
    }
    
    // Reset delete state
    setDeleteDialogOpen(false);
    setDeleteType(null);
    setDeleteIndex(null);
  };

  const formatStr: string = "MMM d, yyyy"

  return (
    <>
    <Collapsible
      open={expanded}
      onOpenChange={setExpanded}
      className="bg-white rounded-lg mb-4 shadow-sm"
    >
      {/* Main row content remains the same */}
      <div className="p-4">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Status column */}
          <div className="col-span-2 min-w-[120px]">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn("w-full justify-between hover:brightness-95 transition-all px-2", currentStatus.color)}
                >
                  <span className={cn("text-sm font-medium", currentStatus.textColor)}>
                    {currentStatus.label}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2">
                <div className="flex flex-col space-y-1">
                  {APPLICATION_STATUSES.map((s) => (
                    <button
                      key={s.value}
                      className={cn(
                        "flex items-center justify-between rounded px-2 py-1.5 text-sm outline-none hover:bg-muted",
                        status === s.value && "font-medium bg-muted"
                      )}
                      onClick={() => handleStatusChange(s.value)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", s.color)}></div>
                        <span className={s.textColor}>{s.label}</span>
                      </div>
                      <Check className={cn("mr-2 h-4 w-4", status === s.value ? "opacity-100" : "opacity-0")} />
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="col-span-3">{university}</div>
          <div className="col-span-2">{program}</div>
          {/* Make deadline clickable for calendar */}
          <div className="col-span-2">
            <Popover open={calendarOpen?.type === 'main' && calendarOpen.index === -1} onOpenChange={(isOpen) => {
              setCalendarOpen(isOpen ? {index: -1, type: 'main'} : null);
            }}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto font-normal text-base flex items-center gap-1 hover:bg-transparent hover:underline">
                  {format(deadline, formatStr)}
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={(date) => handleDeadlineChange(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="col-span-2">{format(lastUpdated, formatStr)}</div>
          
          {/* Expand Button - Only show if there are notes or tasks */}
          <div className="col-span-1 flex justify-end">
            {(
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                >
                  {expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Content - Modified for editing */}
      {(
        <CollapsibleContent>
        <div className="px-4 py-4 border-t border-gray-100">
          {/* Notes Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Notes</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 text-xs"
                onClick={handleAddNote}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Note
              </Button>
            </div>
            
            {notes.length === 0 ? (
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-500 text-center">
                No notes yet. Click "Add Note" to create one.
              </div>
            ) : (
              <div className="space-y-2">
                {notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 rounded p-3">
                    {editingNoteIndex === index ? (
                      <div className="flex flex-col space-y-2">
                        <Textarea
                          ref={textAreaRef}
                          value={editingNote}
                          onChange={(e) => setEditingNote(e.target.value)}
                          className="min-h-[80px] text-sm"
                          placeholder="Enter note here..."
                        />
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditingNoteIndex(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => saveNoteChanges(index)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">{note.text}</p>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => startEditingNote(index, note.text)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-1 text-red-500 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteNote(index)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sub-Tasks Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Tasks</h3>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 text-xs"
                onClick={handleAddSubTask}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Task
              </Button>
            </div>
            
            {subTasks.length === 0 ? (
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-500 text-center">
                No tasks yet. Click "Add Task" to create one.
              </div>
            ) : (
              <div className="space-y-2">
                {subTasks.map((task, index) => {
                  const taskStatus = APPLICATION_STATUSES.find((s) => s.value === task.status) || APPLICATION_STATUSES[0];
                  
                  return (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-3 flex flex-col">
                          <div className="flex items-center justify-between">
                            {editingTaskIndex === index && isEditingTaskName ? (
                              <div className="flex-1 mr-2">
                                <Input
                                  value={editingTaskName}
                                  onChange={(e) => setEditingTaskName(e.target.value)}
                                  className="h-8 text-sm"
                                  autoFocus
                                />
                                <div className="flex justify-end space-x-2 mt-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => {
                                      setEditingTaskIndex(null);
                                      setIsEditingTaskName(false);
                                    }}
                                    className="h-7 text-xs"
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => saveTaskNameChanges(index)}
                                    className="h-7 text-xs"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <h4 className="font-medium text-sm">{task.name}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 ml-1"
                                  onClick={() => startEditingTaskName(index, task.name)}
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                            
                            {/* Only show status badge when not editing name */}
                            {!(editingTaskIndex === index && isEditingTaskName) && (
                              <div className="flex items-center">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Badge className={cn(taskStatus.color, taskStatus.textColor, "font-normal cursor-pointer hover:brightness-95")}>
                                      {taskStatus.label}
                                    </Badge>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[160px] p-2" align="end">
                                    <div className="flex flex-col space-y-1">
                                      {APPLICATION_STATUSES.map((s) => (
                                        <button
                                          key={s.value}
                                          className={cn(
                                            "flex items-center gap-2 rounded px-2 py-1.5 text-sm outline-none hover:bg-muted",
                                            task.status === s.value && "font-medium bg-muted"
                                          )}
                                          onClick={() => handleTaskStatusChange(index, s.value)}
                                        >
                                          <div className={cn("w-2 h-2 rounded-full", s.color)}></div>
                                          <span className={s.textColor}>{s.label}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </PopoverContent>
                                </Popover>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 ml-1 text-red-500 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleDeleteTask(index)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                              
                            )}
                          </div>
                          
                          {/* Only show deadline and notes when not editing name */}
                          {!(editingTaskIndex === index && isEditingTaskName) && (
                            <>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <span>Due: </span>
                                <Popover open={calendarOpen?.type === 'task' && calendarOpen.index === index} onOpenChange={(isOpen) => {
                                  setCalendarOpen(isOpen ? {index, type: 'task'} : null);
                                }}>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" className="p-0 h-auto font-normal text-xs flex items-center gap-1 hover:bg-transparent hover:underline ml-1">
                                      {task.deadline instanceof Date 
                                        ? task.deadline.toLocaleDateString() 
                                        : new Date(task.deadline).toLocaleDateString()}
                                      <Pencil className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={task.deadline instanceof Date ? task.deadline : new Date(task.deadline)}
                                      onSelect={(date) => handleDeadlineChange(date, index)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              
                              {editingTaskIndex === index && !isEditingTaskName ? (
                                <div className="mt-2 flex flex-col space-y-2">
                                  <Textarea
                                    value={editingTaskNotes}
                                    onChange={(e) => setEditingTaskNotes(e.target.value)}
                                    className="min-h-[60px] text-xs"
                                    placeholder="Enter task notes here..."
                                  />
                                  <div className="flex justify-end space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      onClick={() => setEditingTaskIndex(null)}
                                      className="h-7 text-xs"
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => saveTaskNotes(index)}
                                      className="h-7 text-xs"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-between mt-2">
                                  <p className="text-xs text-gray-600">
                                    {task.notes || "No notes"}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => startEditingTaskNotes(index, task.notes)}
                                  >
                                    <Pencil className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </CollapsibleContent>
      )}
      </Collapsible>
      {/* Add confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {deleteType === 'note' ? 'Delete Note' : 'Delete Task'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this {deleteType}? This action cannot be undone.
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
  </>
  );
}

export default function ApplicationsPage() {
  const dummy_applications: Application[] = [
    {
      status: 'in_progress' as ApplicationStatus,
      program_id: '1',
      university: 'McGill University',
      program: 'Computer Science',
      application_date: new Date("2024-02-15"),
      application_deadline: new Date("2024-03-15"),
      last_updated: new Date("2024-02-28"),
      notes: [
        {
          text: "Remember to pay the $120 application fee before submitting final documents."
        },
        {
          text: "Prof. Johnson agreed to write a reference letter - follow up by March 1st."
        }
      ],
      sub_tasks: [
        {
          name: "Submit Transcripts",
          status: "completed" as ApplicationStatus,
          deadline: new Date("2024-02-28"),
          notes: "Official transcript sent via mail on Feb 15"
        },
        {
          name: "Personal Statement",
          status: "in_progress" as ApplicationStatus,
          deadline: new Date("2024-03-10"),
          notes: "First draft complete, need final review"
        },
        {
          name: "Pay Application Fee",
          status: "not_started" as ApplicationStatus,
          deadline: new Date("2024-03-14"),
          notes: ""
        }
      ]
    },
    {
      program_id: '2',
      status: 'not_started' as ApplicationStatus,
      university: 'University of Toronto',
      program: 'Data Science',
      application_date: new Date("2024-02-15"),
      application_deadline: new Date("2024-03-15"),
      last_updated: new Date("2024-02-28"),
      notes: [],
      sub_tasks: []
    },
    // Add a third example with only notes but no tasks
    {
      program_id: '3',
      status: 'not_started' as ApplicationStatus,
      university: 'University of British Columbia',
      program: 'Computer Engineering',
      application_date: new Date("2024-02-15"),
      application_deadline: new Date("2024-03-15"),
      last_updated: new Date("2024-02-28"),
      notes: [
        {
          text: "Need minimum 85% in Math and Physics to be competitive."
        }
      ],
      sub_tasks: []
    }
  ];

  const [applications, setApplications] = useState<Application[]>([]);
  const { user } = useUserStore()

  useEffect(() => {
    async function fetchApplications() {
      try {
        // const apps = await getApplications();
        const response = await fetch(`/api/users/${user?.id}/applications`);
    
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        
        const data = await response.json() || [];
        const applications = data.applications || [];
        setApplications(applications);
      } catch (err: any) {
        console.error("Error fetching applications:", err);
      }
    }

    fetchApplications();
  }, [user?.id]);


  const handleStatusChangeMain = async (index: number, newStatus: ApplicationStatus) => {
    const app = applications[index];
    if (!app?.id) return;

    const updatedApplications = [...applications];
    updatedApplications[index] = {
      ...updatedApplications[index],
      status: newStatus,
      last_updated: new Date()
    };
    
    setApplications(updatedApplications);
    
    await updateApplication(app.id, { 
      status: newStatus
    });
  };

  const handleNotesChangeMain = async (index: number, newNotes: ParagraphList) => {
    const app = applications[index];
    if (!app?.id) return;

    const updatedApplications = [...applications];
    updatedApplications[index] = {
      ...updatedApplications[index],
      notes: newNotes,
      last_updated: new Date()
    };
    
    setApplications(updatedApplications);

    await updateApplication(app.id, { 
      notes: newNotes
    });
  };

  const handleSubTaskChangeMain = async (index: number, newSubTasks: any[]) => {
    const app = applications[index];
    if (!app?.id) return;

    const updatedApplications = [...applications];
    updatedApplications[index] = {
      ...updatedApplications[index],
      sub_tasks: newSubTasks,
      last_updated: new Date()
    };
    
    setApplications(updatedApplications);
    
    await updateApplication(app.id, { 
      sub_tasks: newSubTasks
    });
  };

  const handleDeadlineChangeMain = async (index: number, newDeadline: Date) => {
    const app = applications[index];
    if (!app?.id) return;

    const updatedApplications = [...applications];
    updatedApplications[index] = {
      ...updatedApplications[index],
      application_deadline: newDeadline,
      last_updated: new Date()
    };
    
    setApplications(updatedApplications);
    
    await updateApplication(app.id, { 
      application_deadline: newDeadline
    });
  };

  // async function createApplication(application: Omit<Application, 'id' | 'application_date' | 'last_updated'>): Promise<Application> {
  //   const response = await fetch(`/api/users/${user?.id}/applications`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(application)
  //   });
  //   if (!response.ok) {
  //     throw new Error('Failed to create application');
  //   }
  //   return response.json();
  // }

  async function updateApplication(appId: string, data: Partial<Application>): Promise<void> {
    console.debug(`/api/users/${user?.id}/applications/${appId}`)
    const response = await fetch(`/api/users/${user?.id}/applications/${appId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update application status');
    }
  }

  

  return (
    <div className="flex-1 bg-[#f3f3f3] xl:px-24 lg:px-16">
      <h1 className="text-4xl font-bold mb-8">Applications</h1>

      {/* View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" asChild>
          <Link href="/applications/track">
            Track New Application
          </Link>
        </Button>
        {/* Your tabs component here */}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-8 px-4 py-2 text-foreground font-semibold min-w-[732px]">
        <div className="col-span-2">Status</div>
        <div className="col-span-3">University</div>
        <div className="col-span-2">Program</div>
        <div className="col-span-2">Application Deadline</div>
        <div className="col-span-2">Last Updated</div>
        <div className="col-span-1"/>
      </div>

      {/* Application Rows */}
      {applications.map((app, index) => {

        return (
          <ApplicationRow
          key={index}
          initialStatus={app.status}
          university={app.university}
          program={app.program}
          deadline={app.application_deadline}
          lastUpdated={app.last_updated}
          notes={app.notes}
          subTasks={app.sub_tasks}
          onStatusChange={(newStatus) => handleStatusChangeMain(index, newStatus)}
          onNotesChange={(newNotes) => handleNotesChangeMain(index, newNotes)}
          onSubTaskChange={(newSubTasks) => handleSubTaskChangeMain(index, newSubTasks)}
          onDeadlineChange={(newDeadline) => handleDeadlineChangeMain(index, newDeadline)}
            />
          )
        }
      )}
    </div>
  );
}