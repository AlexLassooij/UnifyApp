"use client"

import { useState } from "react"
import Image from "next/image";
import Link from "next/link"
import {
  SearchIcon,
  ChevronRight,
  Bookmark,
  PlusCircle,
  Heart,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Program } from "@/types/datamodel/datamodel"
import { facultyTypes, provinceCities, provinceLabels } from "@/types/utility/label_mappings"

// Import Algolia components
// Note: In a real implementation, you would install and import from 'react-instantsearch'
// For this demo, we'll create mock components
const SearchBox = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input type="text" placeholder={placeholder} className="pl-12 py-8 text-lg w-full bg-white" />
    </div>
  )
}



// Sample hard-coded program data
const PROGRAMS: Program[] = [
  {
    id: "prog-001",
    university_id: "u_of_t",
    university_name: "University of Toronto",
    university_location: "Toronto, ON",
    faculty: "arts",
    program_name: "Computer Science",
    degree_type: "Bachelor of Science",
    annual_tuition: 8113,
    program_length: 4,
    specializations: [
      { name: "Artificial Intelligence", link: "/programs/uoft-cs-ai" },
      { name: "Game Design", link: "/programs/uoft-cs-gamedesign" },
      { name: "Data Science", link: "/programs/uoft-cs-datascience" },
    ],
    program_description: [
      {
        text: "The Computer Science program at the University of Toronto provides students with a comprehensive foundation in computer science theory and practice.",
      },
      {
        subheading: "Program Focus",
        text: "Focus areas include algorithms, artificial intelligence, computer systems, and software engineering.",
      },
    ],
    language_of_instruction: "English",
    program_requirements: ["english", "math_calculus", "physics"],
    specific_requirements: [
      {
        curriculum_type: "ON",
        requirements: [{ text: "English 4U" }, { text: "Calculus and Vectors 4U" }, { text: "Advanced Functions 4U" }],
      },
    ],
    application_deadline: [
      {
        type: "regular_admission",
        date: new Date("2024-01-15"),
        description: "Regular admission deadline",
      },
    ],
    career_opportunities: [
      {
        text: "Graduates pursue careers as software developers, data scientists, and systems analysts in various industries.",
      },
    ],
    tldr: [
      {
        subheading: "Key Points",
        bullets: [
          { text: "Highly competitive program with strong industry connections" },
          { text: "Emphasis on theoretical foundations and practical applications" },
          { text: "Co-op opportunities available" },
        ],
      },
    ],
    is_new: true,
  },
  {
    id: "prog-002",
    university_id: "mcgill",
    university_name: "McGill University",
    university_location: "Montreal, QC",
    faculty: "engineering",
    program_name: "Software Engineering",
    degree_type: "Bachelor of Engineering",
    annual_tuition: 8113,
    program_length: 4,
    specializations: [
      { name: "Web Development", link: "/programs/mcgill-se-webdev" },
      { name: "Mobile Applications", link: "/programs/mcgill-se-mobile" },
    ],
    program_description: [
      {
        text: "McGill's Software Engineering program combines computer science fundamentals with engineering principles to develop complex software systems.",
      },
    ],
    language_of_instruction: "English",
    program_requirements: ["english", "math_calculus", "physics", "chemistry"],
    application_deadline: [
      {
        type: "regular_admission",
        date: new Date("2024-01-30"),
        description: "Regular admission deadline",
      },
    ],
    career_opportunities: [
      {
        text: "Graduates work as software engineers, project managers, and consultants in technology companies and other sectors.",
      },
    ],
    tldr: [
      {
        subheading: "Program Highlights",
        bullets: [
          { text: "Accredited by the Canadian Engineering Accreditation Board" },
          { text: "Strong focus on software design and architecture" },
          { text: "Internship opportunities with leading tech companies" },
        ],
      },
    ],
    is_new: true,
  },
  {
    id: "prog-003",
    university_id: "ubc",
    university_name: "University of British Columbia",
    university_location: "Vancouver, BC",
    faculty: "science",
    program_name: "Data Science",
    degree_type: "Bachelor of Science",
    annual_tuition: 8113,
    program_length: 4,
    specializations: [
      { name: "Machine Learning", link: "/programs/ubc-ds-ml" },
      { name: "Big Data Analytics", link: "/programs/ubc-ds-bigdata" },
    ],
    program_description: [
      {
        text: "UBC's Data Science program prepares students to extract knowledge and insights from structured and unstructured data using scientific methods, processes, algorithms, and systems.",
      },
    ],
    language_of_instruction: "English",
    program_requirements: ["english", "math_calculus", "math_algebra", "physics"],
    application_deadline: [
      {
        type: "early_admission",
        date: new Date("2023-12-01"),
        description: "Early admission deadline",
      },
      {
        type: "regular_admission",
        date: new Date("2024-01-15"),
        description: "Regular admission deadline",
      },
    ],
    career_opportunities: [
      {
        text: "Graduates pursue careers as data scientists, data analysts, and machine learning engineers in various industries.",
      },
    ],
    tldr: [
      {
        subheading: "Program Overview",
        bullets: [
          { text: "Interdisciplinary program combining statistics, computer science, and domain expertise" },
          { text: "Hands-on experience with real-world data sets" },
          { text: "Research opportunities with faculty" },
        ],
      },
    ],
    is_new: true,
  },
]


const costRanges = [
  { value: "under-5000", label: "Under $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-15000", label: "$10,000 - $15,000" },
  { value: "15000-plus", label: "$15,000+" },
]

const otherFilters = [
  { value: "co-op", label: "Co-op Available" },
  { value: "english", label: "English Instruction" },
  { value: "french", label: "French Instruction" },
  { value: "scholarships", label: "Scholarships Available" },
]

export default function SearchPage() {
  const [savedPrograms, setSavedPrograms] = useState<string[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)

  const toggleSaveProgram = (programId: string) => {
    if (savedPrograms.includes(programId)) {
      setSavedPrograms(savedPrograms.filter((id) => id !== programId))
    } else {
      setSavedPrograms([...savedPrograms, programId])
    }
  }

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value)
  }

  return (
    <div className="flex min-h-screen bg-[#f3f3f3]">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBox placeholder="Search for universities, programs..." />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Discipline" />
              </SelectTrigger>
              <SelectContent>
                {facultyTypes.map((discipline) => (
                  <SelectItem key={discipline.value} value={discipline.value}>
                    {discipline.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleProvinceChange}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Province" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(provinceLabels).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select disabled={!selectedProvince}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {selectedProvince &&
                  provinceCities[selectedProvince]?.map((city: string) => (
                    <SelectItem key={city} value={city.toLowerCase()}>
                      {city}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Cost" />
              </SelectTrigger>
              <SelectContent>
                {costRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Other" />
              </SelectTrigger>
              <SelectContent>
                {otherFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Results */}
          <div className="space-y-6">
            {PROGRAMS.map((program) => (
              <Card key={program.id} className="p-6 bg-white hover:bg-purple-light transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-medium mb-2">{program.program_name}</h2>
                    <div className="flex items-center mb-4">
                      <Image
                        src={`/universities/${program.university_id}.png`}
                        alt={`${program.university_name} logo`}
                        width={48}
                        height={48}
                        className="mr-3 h-[48px] w-auto object-contain"
                        style={{ height: "48px", width: "auto" }}
                      />
                      <div>
                        <div className="font-medium">{program.university_name}</div>
                        <div className="text-sm text-gray-500">{program.university_location}</div>
                      </div>
                    </div>
                    <Link
                      href={`/programs/${program.id}`}
                      className="text-[#66757c] hover:text-[#191919] flex items-center"
                    >
                      View Program <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex space-x-2 mb-4">
                      {program.is_new && (
                        <div className="bg-[#eae4fa] text-[#a78bfa] px-3 py-1 rounded-full flex items-center">
                          <Heart className="h-4 w-4 mr-1" /> New
                        </div>
                      )}
                      {/* {program.match_score && (
                        <div className="bg-[#daeccb] text-[#31972e] px-3 py-1 rounded-full">
                          Match %: {program.match_score}
                        </div>
                      )} */}
                      <div className="bg-[#daeccb] text-[#31972e] px-3 py-1 rounded-full">
                          Match: 78%
                        </div>
                      <button
                        onClick={() => toggleSaveProgram(program.id)}
                        className="text-[#ffc107] hover:text-[#e0a800]"
                      >
                        <Bookmark className="h-6 w-6" fill={savedPrograms.includes(program.id) ? "#ffc107" : "none"} />
                      </button>
                    </div>

                    <div className="text-xl font-medium mb-2">${program.annual_tuition.toLocaleString()} / yr</div>

                    <Button
                      variant="ghost"
                      className="mt-2 flex items-center border-[#66757c] text-[#66757c] hover:bg-[#f3f3f3]"
                    >
                      Add to Compare <PlusCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

