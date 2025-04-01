"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from 'next/navigation'

import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Search,
  Plus,
  BookOpen,
  GraduationCap,
  Briefcase,
  Info,
  FileText,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Program } from "@/types/datamodel/datamodel"
import { facultyTypes } from "@/lib/label_mappings"
import { useUserStore } from "@/store/userStore"
import { fetchProgramById } from "@/lib/api/fetchers/programs"


// Helper function to format date
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Helper function to format subject names
const formatSubject = (subject: string) => {
  return facultyTypes.find((type) => type.value === subject)?.label || subject
  .split("_")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
}

export default function ProgramPage() {
  const params = useParams()
  const { user } = useUserStore()
  const programId = params.programId as string

  useEffect(() => {
    async function loadProgram() {
      const data = await fetchProgramById(programId);
      console.debug(data)
      if (data) {
        setProgram(data);
      } else {
        console.error("Failed to fetch program data");
      }
    }
    loadProgram();
  }, [programId]);

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [program, setProgram] = useState<Program>({
    id: "",
    university_id: "",
    university_name: "",
    university_location: "",
    program_name: "",
    faculty: "science",
    degree_type: "",
    annual_tuition: 0,
    program_length: 0,
    specializations: [],
    program_description: [],
    language_of_instruction: "English",
    program_requirements: [],
    specific_requirements: [],
    additional_requirements: [],
    application_deadline: [],
    career_opportunities: [],
    tldr: [],
    is_new: false,
  })

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    about: true,
    specializations: false,
    requirements: true,
    deadlines: true,
    tldr: true,
    careers: false,
    additionalRequirements: false,
  })

  

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  // Find the regular admission deadline
  const mainDeadline =
    program.application_deadline.find((d) => d.type === "regular_admission") || program.application_deadline[0]

  return (
    <div className="min-h-screen">
      

      {/* Main Content */}
      <div className="p-6">
        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for universities, programs..."
            className="w-full pl-10 py-2 pr-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9175e5]"
          />
        </div>

        {/* Program Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            {/* University Logo */}
            <div className="flex-shrink-0">
              <Image
                src={`/universities/${program.university_id}.png`}
                alt={program.university_name}
                width={100}
                height={100}
                className="mr-3 h-[100px] w-auto object-contain"
                style={{ height: "100px", width: "auto" }}
              />
            </div>

            {/* Program Info */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold">{program.program_name}</h1>
              <h2 className="text-xl mb-1">{program.university_name}</h2>
              <p className="text-gray-600 mb-4">{program.university_location}</p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-[#daeccb] text-[#31972e] px-3 py-1 rounded-full whitespace-nowrap">
                    Match: 78%
                </div>
                <div className="text-lg font-semibold">${program.annual_tuition.toLocaleString()} / yr</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-4">
              <button onClick={toggleBookmark} className="text-ocre">
                <Bookmark className={`h-6 w-6 ${isBookmarked ? "fill-ocre" : ""}`} />
              </button>

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => console.log("Add to compare")}
              >
                <Plus className="h-4 w-4" />
                Add to Compare
              </Button>
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Key Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#f0e7ff]">
                <Clock className="h-6 w-6 text-[#9175e5]" />
              </div>
              <div>
                <div className="text-xl font-bold">4 yrs</div>
                <div className="text-sm text-gray-600">Program Length</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#f0e7ff]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#9175e5]"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold">$9,870</div>
                <div className="text-sm text-gray-600">First Year Tuition</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#f0e7ff]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#9175e5]"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold">January 31</div>
                <div className="text-sm text-gray-600">Application Deadline</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#f0e7ff]">
                <Calendar className="h-6 w-6 text-[#9175e5]" />
              </div>
              <div>
                <div className="text-xl font-bold">September 2026</div>
                <div className="text-sm text-gray-600">Start Date</div>
              </div>
            </div>
          </div>
        </div>

        {/* TLDR Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Info className="h-5 w-5 mr-2 text-[#9175e5]" />
              TL;DR
            </h2>
            <button onClick={() => toggleSection("tldr")} className="text-gray-500">
              {expandedSections.tldr ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {expandedSections.tldr && (
            <div>
              {program.tldr.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.subheading && <h3 className="font-semibold text-lg mb-2">{item.subheading}</h3>}
                  <ul className="list-disc pl-5 space-y-1">
                    {item.bullets.map((bullet, i) => (
                      <li key={i}>{bullet.text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#9175e5]" />
              About
            </h2>
            <button onClick={() => toggleSection("about")} className="text-gray-500">
              {expandedSections.about ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {expandedSections.about && (
            <div className="space-y-4">
              {program.program_description.map((desc, index) => (
                <div key={index}>
                  {desc.subheading && <h3 className="font-semibold text-lg mb-2">{desc.subheading}</h3>}
                  <p className="text-gray-700">{desc.text}</p>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-[#9175e5]" />
                    <span>
                      <strong>Degree Type:</strong> {program.degree_type}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-[#9175e5]" />
                    <span>
                      <strong>Language:</strong> {program.language_of_instruction}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Award className="h-5 w-5 mr-2 text-[#9175e5]" />
              Specializations
            </h2>
            <button onClick={() => toggleSection("specializations")} className="text-gray-500">
              {expandedSections.specializations ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          {program.specializations.length > 0 && (
            <div>
              {expandedSections.specializations ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.specializations.map((spec, index) => (
                <div key={index} className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-[#9175e5]" />
                  <a href={spec.link} className="text-[#9175e5] hover:underline">
                    {spec.name} Option
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-[#9175e5]" />
                <a href={program.specializations[0].link} className="text-[#9175e5] hover:underline">
                  {program.specializations[0].name} Option
                </a>
              </div>
            </div>
          )}
            </div>)}
          
        </div>

        {/* Admission Requirements */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-[#9175e5]" />
              Admission Requirements
            </h2>
            <button onClick={() => toggleSection("requirements")} className="text-gray-500">
              {expandedSections.requirements ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {expandedSections.requirements && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Required Courses */}
              <div>
                <h4 className="font-bold mb-4">Required Subjects</h4>
                <ul className="space-y-1">
                  {program.program_requirements.map((subject, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span>
                      {formatSubject(subject)}
                    </li>
                  ))}
                </ul>
                {program.specific_requirements && program.specific_requirements.some(req => req.curriculum_type === user?.curriculum) && (
                  <>
                <h3 className="font-medium mt-4 mb-2">Specific Requirements for {user?.curriculum}</h3>
                <ul className="space-y-2">
                  {program.specific_requirements &&
                    program.specific_requirements[0].requirements.map((req, index) => <li key={index}>{req.text}</li>)}
                </ul></>
              )}

                
              </div>

              {/* English Proficiency */}
              <div>
                <h3 className="font-bold mb-4">English Proficiency</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">IELTS:</p>
                    <p>Minimum overall score of 6.5</p>
                    <p>(no component below 6.0).</p>
                  </div>
                  <div>
                    <p className="font-medium">TOEFL iBT:</p>
                    <p>Minimum score of 90</p>
                    <p>(no part below 22).</p>
                  </div>
                </div>
              </div>

              {/* Application Deadlines */}
              <div>
                <h3 className="font-bold mb-4">Application Deadlines</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Application Opens:</span> Early October
                  </p>
                  {program.application_deadline.map((deadline, index) => (
                    <p key={index}>
                      <span className="font-medium">
                        {deadline.type === "early_admission"
                          ? "Early Admission Deadline"
                          : deadline.type === "regular_admission"
                            ? "Final Deadline"
                            : deadline.type === "scholarship"
                              ? "Scholarship Deadline"
                              : deadline.description}
                        :
                      </span>{" "}
                      {formatDate(deadline.date)}
                    </p>
                  ))}
                  <p>
                    <span className="font-medium">First Round Decision:</span> From Mid-December to the end of February
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Requirements */}
        {program.additional_requirements && (
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center">
                <ListChecks className="h-5 w-5 mr-2 text-[#9175e5]" />
                Additional Requirements
              </h2>
              <button onClick={() => toggleSection("additionalRequirements")} className="text-gray-500">
                {expandedSections.additionalRequirements ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>

            {expandedSections.additionalRequirements && (
              <ul className="list-disc pl-5 space-y-2">
                {program.additional_requirements.map((req, index) => (
                  <li key={index}>{req.text}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Career Opportunities */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-[#9175e5]" />
              Career Opportunities
            </h2>
            <button onClick={() => toggleSection("careers")} className="text-gray-500">
              {expandedSections.careers ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {expandedSections.careers && (
            <div className="space-y-4">
              {program.career_opportunities.map((career, index) => (
                <div key={index}>
                  {career.subheading && <h3 className="font-semibold text-lg mb-2">{career.subheading}</h3>}
                  <p>{career.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper components
const ListChecks = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3 7 3 3 3-3"></path>
    <path d="M6 10V5"></path>
    <path d="M21 11V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"></path>
    <path d="m16 16 2 2 4-4"></path>
  </svg>
)

