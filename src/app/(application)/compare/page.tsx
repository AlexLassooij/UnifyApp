"use client"

import { useState } from "react"
import { Home,BookCopy,BarChart, Activity, FileText, Users, Search, Settings, ChevronDown, ChevronUp, School, MapPin, Users2, Trophy, BookOpen, Globe, HomeIcon, Landmark, Medal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { University, Subject } from "@/types/datamodel/datamodel"
import { SubheadingAndBulletPoints } from "@/types/utility/text_types"
import { getSubjectDisplayName } from "@/types/utility/label_mappings"
// Sample hard-coded university data
const UNIVERSITIES: University[] = [
  {
    univesity_name: "University of Toronto",
    abbreviated_name: "UofT",
    province: "ON",
    location: "Toronto, Ontario",
    qs_ranking: 34,
    mcl_ranking: 18,
    description: [
      {
        text: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.",
      },
    ],
    academics: [
      {
        subheading: "Programs",
        text: "Offers over 700 undergraduate and 200 graduate programs across three campuses.",
      },
      {
        subheading: "Research",
        text: "Leading research institution with strengths in medicine, engineering, and humanities.",
      },
    ],
    student_orgs: [
      {
        subheading: "Student Groups",
        bullets: [
          { text: "Over 1000 student organizations" },
          { text: "Cultural, academic, and special interest clubs" },
          { text: "Student government associations" },
        ],
      },
    ],
    social_life: [
      { text: "Vibrant campus life with events, festivals, and cultural activities throughout the year." },
      {
        text: "Downtown Toronto location provides access to world-class entertainment, dining, and cultural experiences.",
      },
    ],
    athletics: [
      {
        subheading: "Varsity Sports",
        bullets: [
          { text: "44 varsity sports teams" },
          { text: "State-of-the-art athletic facilities" },
          { text: "Intramural sports programs" },
        ],
      },
    ],
    strengths: [
      {
        subheading: "Academic Excellence",
        bullets: [
          { text: "Ranked #1 in Canada for research output and impact" },
          { text: "World-leading Faculty of Medicine and Rotman School of Management" },
          { text: "Cutting-edge research facilities including the Vector Institute for AI" }
        ],
      },
      {
        subheading: "Global Network",
        bullets: [
          { text: "Extensive alumni network spanning 190+ countries" },
          { text: "Strong industry partnerships with leading companies" },
          { text: "Over 700 international exchange opportunities" }
        ],
      }
    ],
    mental_health_resources: [
      {
        subheading: "Health & Wellness Centre",
        bullets: [
          { text: "Comprehensive mental health services and counseling" },
          { text: "Same-day counseling appointments available" },
          { text: "24/7 crisis support hotline" }
        ],
      },
      {
        subheading: "Peer Support Programs",
        bullets: [
          { text: "Student-run support groups for various concerns" },
          { text: "Mental health workshops and training" },
          { text: "Mindfulness and stress-reduction programs" }
        ],
      }
    ],
    housing_guaranteed: [{ text: "First-year students are guaranteed housing if they meet application deadlines." }],
    housing_on_campus: [
      { text: "Multiple residence options across all three campuses with varying styles and meal plans." },
    ],
    housing_off_campus: [
      {
        subheading: "Off-Campus Housing",
        bullets: [
          { text: "Many options in surrounding neighborhoods" },
          { text: "University housing service to assist students" },
          { text: "Average rent: $1200-2000/month" },
        ],
      },
    ],
    commute: true,
    student_faculty_ratio: "20:1",
    international_ratio: "25%",
    gender_ratio: "45:55",
    student_body_size: 93000,
    walk_score: 80,
    general_admision_requirements: [
      {
        subheading: "Admission Requirements",
        bullets: [
          { text: "High school diploma or equivalent" },
          { text: "Competitive grades in prerequisite courses" },
          { text: "English proficiency for international students" },
        ],
      },
    ],
    general_course_requirements: ["english", "math_calculus", "physics", "chemistry"],
    accesibility: "Accessible facilities and support services available across all campuses",
    homepage: "https://www.utoronto.ca",
  },
  {
    univesity_name: "McGill University",
    abbreviated_name: "McGill",
    province: "QC",
    location: "Montreal, Quebec",
    qs_ranking: 31,
    mcl_ranking: 30,
    description: [
      { text: "McGill University is a public research university in Montreal, Quebec, Canada, established in 1821." },
    ],
    academics: [
      {
        subheading: "Academic Excellence",
        bullets: [
          { text: "Over 300 programs of study" },
          { text: "Strong focus on research and innovation" },
          { text: "Internationally recognized faculty" },
        ],
      },
    ],
    student_orgs: [
      { text: "More than 230 student-run clubs, organizations, and services catering to diverse interests." },
      { text: "Strong student government with opportunities for leadership and advocacy." },
    ],
    social_life: [
      { text: "Rich social scene in downtown Montreal with festivals, cultural events, and nightlife." },
      { text: "Bilingual environment offers unique cultural experiences and language learning opportunities." },
    ],
    athletics: [
      { text: "29 varsity teams competing in U SPORTS with a strong tradition in hockey and swimming." },
      { text: "Modern athletic facilities including a fitness center, pool, and multiple playing fields." },
    ],
    strengths: [
      {
        subheading: "Research Innovation",
        bullets: [
          { text: "Leading neuroscience and AI research" },
          { text: "Strong international research collaborations" },
          { text: "High success rate in securing research grants" }
        ],
      },
      {
        subheading: "Global Perspective",
        bullets: [
          { text: "Most internationally diverse student body in Canada" },
          { text: "Bilingual environment enhances cultural learning" },
          { text: "Strong programs in international development and relations" }
        ],
      }
    ],
    mental_health_resources: [
      {
        subheading: "Student Wellness Hub",
        bullets: [
          { text: "Integrated approach to physical and mental health" },
          { text: "Virtual and in-person counseling options" },
          { text: "Specialized support for diverse student populations" }
        ],
      },
      { 
        text: "McGill offers the Keep.meSAFE program, providing 24/7 access to counselors in over 60 languages through a mobile app." 
      }
    ],
    housing_guaranteed: [{ text: "First-year students from outside the Montreal area are guaranteed housing." }],
    housing_on_campus: [
      {
        subheading: "Residence Options",
        bullets: [
          { text: "Traditional dormitories" },
          { text: "Apartment-style residences" },
          { text: "Hotel-style accommodations" },
        ],
      },
    ],
    housing_off_campus: [
      { text: "Affordable off-campus housing options in neighborhoods surrounding the university." },
    ],
    commute: false,
    student_faculty_ratio: "16:1",
    international_ratio: "30%",
    gender_ratio: "40:60",
    student_body_size: 40000,
    walk_score: 90,
    general_admision_requirements: [
      { text: "Competitive admission based on academic achievement, with specific requirements varying by program." },
    ],
    general_course_requirements: ["english", "math_calculus", "physics", "chemistry", "biology"],
    accesibility: "Committed to accessibility with services through the Office for Students with Disabilities",
    homepage: "https://www.mcgill.ca",
  },
  {
    univesity_name: "University of British Columbia",
    abbreviated_name: "UBC",
    province: "BC",
    location: "Vancouver, British Columbia",
    qs_ranking: 47,
    mcl_ranking: 40,
    description: [
      {
        text: "The University of British Columbia is a global center for teaching, learning and research, consistently ranked among the top 20 public universities in the world.",
      },
    ],
    academics: [
      {
        text: "Comprehensive range of undergraduate, graduate and professional programs spanning arts, sciences, medicine, and more.",
      },
      { text: "Strong emphasis on interdisciplinary education and research with innovative learning approaches." },
    ],
    student_orgs: [
      {
        subheading: "Student Life",
        bullets: [
          { text: "Over 350 clubs and organizations" },
          { text: "Active student government" },
          { text: "Volunteer opportunities" },
        ],
      },
    ],
    social_life: [
      {
        subheading: "Campus Culture",
        bullets: [
          { text: "Regular social events and festivals" },
          { text: "Arts and cultural performances" },
          { text: "Beautiful campus with outdoor activities" },
        ],
      },
    ],
    athletics: [
      { text: "UBC Thunderbirds compete in U SPORTS with 25 varsity teams and numerous recreational sports options." },
      { text: "World-class athletic facilities including an aquatic center that hosted the 2010 Winter Olympics." },
    ],
    strengths: [
      {
        subheading: "Sustainability Leadership",
        bullets: [
          { text: "Top-ranked university for climate action (Times Higher Education)" },
          { text: "Carbon-neutral campus initiatives" },
          { text: "Leading programs in environmental sciences and sustainability" }
        ],
      },
      {
        subheading: "Industry Connections",
        bullets: [
          { text: "Strong co-op programs with 3,000+ employer partners" },
          { text: "Technology innovation hub with startup incubators" },
          { text: "Research partnerships with major tech and biotech companies" }
        ],
      }
    ],
    
    mental_health_resources: [
      {
        subheading: "Student Health Services",
        bullets: [
          { text: "Comprehensive psychological services and counseling" },
          { text: "Wellness coaching and peer support" },
          { text: "Embedded counselors in faculties and residences" }
        ],
      },
      {
        subheading: "Thrive Initiative",
        bullets: [
          { text: "Year-round mental health literacy promotion" },
          { text: "Annual Thrive Month with mental wellness events" },
          { text: "Online mental health assessment tools" }
        ],
      }
    ],
    housing_guaranteed: [{ text: "First-year students are guaranteed housing if they apply by the deadline." }],
    housing_on_campus: [
      { text: "Various residence options including traditional dormitories and apartment-style units." },
    ],
    housing_off_campus: [
      { text: "Off-campus housing in Vancouver can be expensive but many options are available in surrounding areas." },
    ],
    commute: true,
    student_faculty_ratio: "18:1",
    international_ratio: "28%",
    gender_ratio: "45:55",
    student_body_size: 66000,
    walk_score: 20,
    general_admision_requirements: [
      { text: "Admission based on academic achievement with competitive cutoffs varying by program." },
    ],
    general_course_requirements: ["english", "math_calculus", "physics", "chemistry", "social_studies"],
    accesibility: "Comprehensive accessibility services through the Centre for Accessibility",
    homepage: "https://www.ubc.ca",
  },
]

// Helper function to determine if an item is a SubheadingAndBulletPoints
function isBulletPoints(item: any): item is SubheadingAndBulletPoints {
  return item && Array.isArray(item.bullets)
}


export default function ComparePage() {
  const [selectedUniversities, setSelectedUniversities] = useState<(University | null)[]>([null, null, null])

  // State to track which sections are expanded for each university
  const [expandedSections, setExpandedSections] = useState<{
    [key: number]: {
      academics: boolean
      studentOrgs: boolean
      socialLife: boolean
      athletics: boolean
    }
  }>({
    0: { academics: false, studentOrgs: false, socialLife: false, athletics: false },
    1: { academics: false, studentOrgs: false, socialLife: false, athletics: false },
    2: { academics: false, studentOrgs: false, socialLife: false, athletics: false },
  })

  const handleUniversitySelect = (value: string, index: number) => {
    const selected = UNIVERSITIES.find((uni) => uni.abbreviated_name === value) || null
    const newSelected = [...selectedUniversities]
    newSelected[index] = selected
    setSelectedUniversities(newSelected)
  }

  const toggleSection = (index: number, section: "academics" | "studentOrgs" | "socialLife" | "athletics") => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [section]: !prev[index][section],
      },
    }))
  }

  return (
    <div className="flex min-h-screen bg-[#f3f3f3]">
            {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8">Compare University Programs</h1>

        {/* University Selection */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[0, 1, 2].map((index) => (
            <Select key={index} onValueChange={(value) => handleUniversitySelect(value, index)}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select an Option" />
              </SelectTrigger>
              <SelectContent>
                {UNIVERSITIES.map((university) => (
                  <SelectItem key={university.abbreviated_name} value={university.abbreviated_name}>
                    {university.univesity_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        {/* Basic Information Section */}
        <Separator className="mb-6 mt-4" />

        <div className="grid grid-cols-3 gap-6 mb-8">
          {selectedUniversities.map((uni, index) => (
            <div key={index} className="text-center">
              {uni ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <School className="h-10 w-10 text-[#a78bfa]" />
                  </div>
                  <h3 className="text-xl font-bold">{uni.univesity_name}</h3>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {uni.location}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">QS Ranking:</span> {uni.qs_ranking}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">MacLean's Ranking:</span> {uni.mcl_ranking}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Student Body:</span> {uni.student_body_size.toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">Select a university</div>
              )}
            </div>
          ))}
        </div>


        {/* Strengths Section */}
        <h2 className="text-2xl font-medium  mt-10 flex items-center">
          <Trophy className="h-8 w-8 mr-2 text-[#a78bfa]" />
          Strengths
        </h2>    
                    
        <Separator className="mb-6 mt-4" />

        <div className="grid grid-cols-3 gap-6 mb-12">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  {uni.strengths.map((item, i) => (
                    <div key={i} className="mb-4">
                      {item.subheading && <h4 className="font-medium text-base mb-2">{item.subheading}</h4>}
                      {isBulletPoints(item) ? (
                        <ul className="list-disc pl-5 mt-1 text-sm">
                          {item.bullets.map((bullet, j) => (
                            <li key={j} className="mb-1">
                              {bullet.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>

        {/* Ratios Section */}
        {/* Course Requirements Section */}
        <h2 className="text-2xl font-medium  mb-0 mt-10 flex items-center">
          <BarChart className="h-8 w-8 mr-2 text-[#a78bfa]" />
          University Ratios
        </h2>    
                    
        <Separator className="mb-6 mt-4" />

        {/* Student-Faculty Ratio */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {selectedUniversities.map((uni, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold mb-2">{uni ? uni.student_faculty_ratio : "—"}</div>
              <div className="text-sm text-gray-600">Student-Faculty Ratio</div>
            </div>
          ))}
        </div>

        {/* Gender Ratio */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {selectedUniversities.map((uni, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold mb-2">{uni ? uni.gender_ratio : "—"}</div>
              <div className="text-sm text-gray-600">Gender Ratio (F:M)</div>
            </div>
          ))}
        </div>

        {/* International Students */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {selectedUniversities.map((uni, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold mb-2">{uni ? uni.international_ratio : "—"}</div>
              <div className="text-sm text-gray-600">International Students</div>
            </div>
          ))}
        </div>

        {/* Expandable Sections */}
        <h2 className="text-2xl font-medium  mt-10 flex items-center">
          <Landmark className="h-8 w-8 mr-2 text-[#a78bfa]" />
          University Life
        </h2>    
                    
        <Separator className="mb-6 mt-4" />

        {/* Academics Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center"
                    onClick={() => toggleSection(index, "academics")}
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-[#a78bfa]" />
                      <span className="font-medium">Academics</span>
                    </div>
                    {expandedSections[index].academics ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>

                  {expandedSections[index].academics && (
                    <div className="mt-4 pl-2">
                      {uni.academics.map((item, i) => (
                        <div key={i} className="mb-3">
                          {item.subheading && <h5 className="font-semibold">{item.subheading}</h5>}
                          {isBulletPoints(item) ? (
                            <ul className="list-disc pl-5 mt-2">
                              {item.bullets.map((bullet, j) => (
                                <li key={j} className="mb-1">
                                  {bullet.text}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{item.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>

        {/* Student Organizations Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center"
                    onClick={() => toggleSection(index, "studentOrgs")}
                  >
                    <div className="flex items-center">
                      <Users2 className="h-5 w-5 mr-2 text-[#a78bfa]" />
                      <span className="font-medium">Student Organizations</span>
                    </div>
                    {expandedSections[index].studentOrgs ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>

                  {expandedSections[index].studentOrgs && (
                    <div className="mt-4 pl-2">
                      {uni.student_orgs.map((item, i) => (
                        <div key={i} className="mb-3">
                          {item.subheading && <h5 className="font-semibold">{item.subheading}</h5>}
                          {isBulletPoints(item) ? (
                            <ul className="list-disc pl-5 mt-2">
                              {item.bullets.map((bullet, j) => (
                                <li key={j} className="mb-1">
                                  {bullet.text}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{item.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>

        {/* Social Life Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center"
                    onClick={() => toggleSection(index, "socialLife")}
                  >
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-[#a78bfa]" />
                      <span className="font-medium">Social Life</span>
                    </div>
                    {expandedSections[index].socialLife ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>

                  {expandedSections[index].socialLife && (
                    <div className="mt-4 pl-2">
                      {uni.social_life.map((item, i) => (
                        <div key={i} className="mb-3">
                          {item.subheading && <h5 className="font-semibold">{item.subheading}</h5>}
                          {isBulletPoints(item) ? (
                            <ul className="list-disc pl-5 mt-2">
                              {item.bullets.map((bullet, j) => (
                                <li key={j} className="mb-1">
                                  {bullet.text}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{item.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>

        {/* Athletics Section */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center"
                    onClick={() => toggleSection(index, "athletics")}
                  >
                    <div className="flex items-center">
                      <Medal className="h-5 w-5 mr-2 text-[#a78bfa]" />
                      <span className="font-medium">Athletics</span>
                    </div>
                    {expandedSections[index].athletics ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>

                  {expandedSections[index].athletics && (
                    <div className="mt-4 pl-2">
                      {uni.athletics.map((item, i) => (
                        <div key={i} className="mb-3">
                          {item.subheading && <h5 className="font-semibold">{item.subheading}</h5>}
                          {isBulletPoints(item) ? (
                            <ul className="list-disc pl-5 mt-2">
                              {item.bullets.map((bullet, j) => (
                                <li key={j} className="mb-1">
                                  {bullet.text}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{item.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>

        {/* Housing Section */}
        <h2 className="text-2xl font-medium  mt-10 flex items-center">
          <HomeIcon className="h-8 w-8 mr-2 text-[#a78bfa]" />
          Housing
        </h2>    
                    
        <Separator className="mb-6 mt-4" />

        <div className="grid grid-cols-3 gap-6 mb-12">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Guaranteed Housing:</h4>
                    {uni.housing_guaranteed.map((item, i) => (
                      <p key={i} className="text-sm mb-2">
                        {item.text}
                      </p>
                    ))}
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">On-Campus:</h4>
                    {uni.housing_on_campus.map((item, i) => (
                      <div key={i} className="mb-2">
                        {item.subheading && <h5 className="font-medium text-sm">{item.subheading}</h5>}
                        {isBulletPoints(item) ? (
                          <ul className="list-disc pl-5 mt-1 text-sm">
                            {item.bullets.map((bullet, j) => (
                              <li key={j} className="mb-1">
                                {bullet.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm">{item.text}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Off-Campus:</h4>
                    {uni.housing_off_campus.map((item, i) => (
                      <div key={i} className="mb-2">
                        {item.subheading && <h5 className="font-medium text-sm">{item.subheading}</h5>}
                        {isBulletPoints(item) ? (
                          <ul className="list-disc pl-5 mt-1 text-sm">
                            {item.bullets.map((bullet, j) => (
                              <li key={j} className="mb-1">
                                {bullet.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm">{item.text}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-medium">Commuter School:</span> {uni.commute ? "Yes" : "No"}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Walk Score:</span> {uni.walk_score}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>

        {/* Course Requirements Section */}
        <h2 className="text-2xl font-medium  mb-0 mt-10 flex items-center">
          <BookOpen className="h-8 w-8 mr-2 text-[#a78bfa]" />
          Course Requirements
        </h2>    
                    
        <Separator className="mb-6 mt-4" />

        <div className="grid grid-cols-3 gap-6 mb-12">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  

                  <ul className="space-y-2">
                    {uni.general_course_requirements.map((subject, i) => (
                      <li key={i} className="flex items-center">
                        <FileText className="h-4 w-4 text-[#a78bfa] mr-2" />
                        {getSubjectDisplayName(subject)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Admission Requirements:</h4>
                    {uni.general_admision_requirements.map((item, i) => (
                      <div key={i} className="mb-2">
                        {item.subheading && <h5 className="font-medium text-sm">{item.subheading}</h5>}
                        {isBulletPoints(item) ? (
                          <ul className="list-disc pl-5 mt-1 text-sm">
                            {item.bullets.map((bullet, j) => (
                              <li key={j} className="mb-1">
                                {bullet.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm">{item.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <h2 className="text-2xl font-medium  mt-10 flex items-center">
          Additional Information</h2>

        <Separator className="mb-6 mt-4" />

        <div className="grid grid-cols-3 gap-6 mb-12">
          {selectedUniversities.map((uni, index) => (
            <Card key={index} className="p-4">
              {uni ? (
                <div>
                  <h3 className="font-semibold text-lg mb-4">University Description</h3>

                  {uni.description.map((item, i) => (
                    <p key={i} className="mb-3">
                      {item.text}
                    </p>
                  ))}

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Accessibility:</h4>
                    <p className="text-sm">{uni.accesibility}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Mental Health Resources:</h4>
                    {uni.mental_health_resources.map((item, i) => (
                      <div key={i} className="mb-3">
                        {item.subheading && <h5 className="font-medium text-sm">{item.subheading}</h5>}
                        {isBulletPoints(item) ? (
                          <ul className="list-disc pl-5 mt-1 text-sm">
                            {item.bullets.map((bullet, j) => (
                              <li key={j} className="mb-1">
                                {bullet.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm">{item.text}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <a
                      href={uni.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a78bfa] hover:underline flex items-center"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visit University Website
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 p-2 text-center">Select a university</div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

