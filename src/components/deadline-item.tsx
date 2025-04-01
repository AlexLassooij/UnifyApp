import Image from "next/image";
import { format, differenceInDays, parseISO } from "date-fns";
import { ArrowRight } from "lucide-react";

export interface DeadlineItemProps {
  application_id: string
  university_id: string;
  university_name?: string,
  program_name?: string,
  details: string;
  date: Date;
  onClick?: () => void;
}

export function DeadlineItem({ university_id, details, date, onClick }: DeadlineItemProps) {
  const daysLeft = differenceInDays(date, new Date());
  const formattedDate = format(date, "MMM d");
  
  const getDeadlineText = (days: number): string => {
    switch (true) {
      case days < 0:
        return "!\nLate";
      case days === 0:
        return "0 Days";
      case days === 1:
        return "1 Day";
      default:
        return `${days} Days`;
    }
  };
  
  return (
    <div 
      className="flex items-start justify-between gap-4 pb-2 cursor-pointer hover:bg-gray-50 rounded p-1"
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className="flex justify-center items-center min-w-[40px] mr-1">
          <Image
            src={`/universities/${university_id}.png`}
            alt={university_id}
            width={48}
            height={48}
            className="object-contain"
            style={{ height: "auto", width: "auto", maxHeight: "40px", maxWidth: "40px" }}
          />
        </div>
        
        {/* max-h-14 is 56px, as defined in the figma design */}
        <div className="max-h-14 overflow-hidden">
          <p className="font-medium line-clamp-2">{details}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 text-center self-end">
        <p className="text-sm">{formattedDate}</p>
        <p className={`text-sm ${daysLeft <= 7 ? 'text-red-500' : 'text-amber-500'} w-8`}>
          {getDeadlineText(daysLeft)}                      
        </p>
      </div>
    </div>
  );
}

export function ApplicationItem({ university_id, university_name, program_name, onClick }: Omit<DeadlineItemProps, 'date' | 'details'>) {
    return (
        <div 
        className="flex items-start justify-between gap-4 pb-2"
        onClick={onClick}
    >
        <div className="flex gap-3">
          <div className="flex justify-center items-center min-w-[40px] mr-1">
              <Image
                src={`/universities/${university_id}.png`}
                alt={university_id}
                width={48}
                height={48}
                className="object-contain"
                style={{ height: "auto", width: "auto", maxHeight: "40px", maxWidth: "40px" }}
              />
            </div>
          <div>
            <p className="font-medium">{program_name}</p>
            <p className="text-sm text-muted-foreground">{university_name}</p>
          </div>
        </div>
        <button 
            className="text-muted-foreground hover:text-foreground transition-colors" 
            aria-label="To application"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
      </div>
    );
  }