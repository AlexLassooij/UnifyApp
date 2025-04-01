import { ApplicationStatus } from "@/types/datamodel/datamodel";

export const APPLICATION_STATUSES = [
    { value: "not_started" as ApplicationStatus, label: "Not Started", color: "bg-[#d9d9d9]", textColor: "text-[#191919]" },
    { value: "in_progress" as ApplicationStatus, label: "In Progress", color: "bg-[#ffd866]", textColor: "text-[#8d5800]" },
    { value: "completed" as ApplicationStatus, label: "Completed", color: "bg-[#ceead6]", textColor: "text-[#0d652d]" },
  ] as const;