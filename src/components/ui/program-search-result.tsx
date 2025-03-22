import Image from "next/image";
import Link from "next/link";
import { Bookmark, ChevronRight, Heart, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Program } from "@/types/datamodel/datamodel";

interface ProgramCardProps {
  program: Program;
}

const savedPrograms = ["1", "2", "3"];

const saveProgram = (programId: string) => {
    // Save the program ID to the user's profile
    return true
    }

export default function ProgramSearchResult({ hit }) {
    console.debug(hit)
  return (
    <Card className="mb-6 p-6 bg-white hover:bg-[#daeaf2] transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-medium mb-2">{hit.program_name}</h2>
          <div className="flex items-center mb-4">
            <Image
              src={`/universities/${hit.university_id}.png`}
              alt={`${hit.university_name} logo`}
              width={48}
              height={48}
              className="mr-3 h-[48px] w-auto object-contain"
              style={{ height: "48px", width: "auto" }}
            />
            <div>
              <div className="font-medium">{hit.university_name}</div>
              <div className="text-sm text-gray-500">{hit.university_location}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="mt-2 flex items-center border-[#66757c] text-[#66757c] hover:bg-accent"
          >
            Add to Compare <PlusCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-4">
                {hit.is_new && (
                    <div className="bg-[#eae4fa] text-[#a78bfa] px-3 py-1 rounded-full flex items-center whitespace-nowrap">
                    <Heart className="h-4 w-4 mr-1 flex-shrink-0" /> New
                    </div>
                )}
                <div className="bg-[#daeccb] text-[#31972e] px-3 py-1 rounded-full whitespace-nowrap">
                    Match: 78%
                </div>
                <button
                    onClick={() => saveProgram(hit.id)}
                    className="text-[#ffc107] hover:text-[#e0a800]"
                >
                    <Bookmark className="h-6 w-6" fill={savedPrograms.includes(hit.id) ? "#ffc107" : "none"} />
                </button>
            </div>

          <div className="text-xl font-medium mb-2">${hit.annual_tuition.toLocaleString()} / yr</div>
          {/* TODO : dont use manual margin here */}
          <Link
            href={`/programs/${hit.id}`}
            className="mt-6 text-[#66757c] hover:text-[#191919] flex items-center"
          >
            View Program <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
}