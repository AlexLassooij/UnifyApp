import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface DeadlineItemProps {
  institution: string;
  details: string;
  date: string;
  daysLeft: number;
  logoSrc: string;
  isLast?: boolean;
  className?: string;
}

export function DeadlineItem({
  institution,
  details,
  date,
  daysLeft,
  logoSrc,
  isLast = false,
  className,
}: DeadlineItemProps) {
  return (
    <div 
      className={cn(
        "flex items-start justify-between gap-4 pb-4",
        !isLast && "border-b border-gray-200 mb-4",
        className
      )}
    >
      <div className="flex gap-3">
        <Image
          src={logoSrc || "/next.svg"}
          alt={institution}
          width={40}
          height={40}
          className="rounded"
        />
        <div className="max-h-14 overflow-hidden">
          <p className="font-medium line-clamp-2">{details}</p>
          <p className="text-sm text-muted-foreground">{institution}</p>
        </div>
      </div>
      <div className="flex justify-between gap-2 text-center">
        <p className="text-sm">{date}</p>
        <p className={cn(
          "text-sm",
          daysLeft <= 7 ? "text-red-500" : 
          daysLeft <= 14 ? "text-amber-500" : 
          "text-muted-foreground"
        )}>
          {daysLeft} Days
        </p>
      </div>
    </div>
  );
}