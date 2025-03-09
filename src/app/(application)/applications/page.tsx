"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "@/components/ui/icon";
import { ApplicationStatus } from "@/types/datamodel/datamodel";

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

interface ApplicationRowProps {
  initialStatus: ApplicationStatus;
  university: string;
  program: string;
  deadline: string;
  lastUpdated: string;
  onStatusChange?: (status: ApplicationStatus) => void;
}

function ApplicationRow({ 
  initialStatus, 
  university, 
  program, 
  deadline, 
  lastUpdated,
  onStatusChange 
}: ApplicationRowProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ApplicationStatus>(initialStatus);

  const currentStatus = APPLICATION_STATUSES.find((s) => s.value === status) || APPLICATION_STATUSES[0];

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    setStatus(newStatus);
    setOpen(false);
    onStatusChange?.(newStatus); // Call the optional callback
  };

  return (
    <div className="bg-white rounded-lg mb-4 p-4 shadow-sm">
      <div className="grid grid-cols-11 gap-8 items-center">
        <div className="col-span-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn("w-full justify-between hover:brightness-95 transition-all", currentStatus.color)}
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
                      "flex items-center justify-between rounded px-2 py-1.5 text-sm outline-none hover:bg-muted ",
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
        <div className="col-span-2">{deadline}</div>
        <div className="col-span-2">{lastUpdated}</div>
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  const [view, setView] = useState("list");

  const applications = [
    {
      id: '1',
      status: 'in-progress' as ApplicationStatus,
      university: 'McGill University',
      program: 'Computer Science',
      deadline: 'Mar 15, 2024',
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      status: 'not-started' as ApplicationStatus,
      university: 'University of Toronto',
      program: 'Data Science',
      deadline: 'Apr 1, 2024',
      lastUpdated: '1 week ago'
    },
    // Add more sample data as needed
  ];

  return (
    <div className="flex-1 bg-[#f3f3f3] p-6">
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
      <div className="grid grid-cols-11 gap-4 px-4 py-2 text-foreground font-semibold">
        <div className="col-span-2">Status</div>
        <div className="col-span-3">University</div>
        <div className="col-span-2">Program</div>
        <div className="col-span-2">Application Deadline</div>
        <div className="col-span-2">Last Updated</div>
      </div>

      {/* Application Rows */}
      {applications.map(app => (
        <ApplicationRow
          key={app.id}
          initialStatus={app.status}
          university={app.university}
          program={app.program}
          deadline={app.deadline}
          lastUpdated={app.lastUpdated}
        />
      ))}
    </div>
  );
}