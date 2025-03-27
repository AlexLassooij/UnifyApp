import { GradeLetter, Province, CurriculumType, Subject, ApplicationStatus, ApplicationOutcome, FacultyTypeOption } from "../datamodel/datamodel";

export const provinceCities: Record<Exclude<Province, "none">, string[]> = {
  ON: ["Toronto", "Ottawa", "Hamilton", "London", "Kingston", "Waterloo", "Guelph"],
  QC: ["Montreal", "Quebec City", "Sherbrooke", "Trois-Rivieres"],
  BC: ["Vancouver", "Victoria", "Kelowna", "Burnaby"],
  AB: ["Calgary", "Edmonton", "Lethbridge"],
  NS: ["Halifax", "Sydney"],
  NB: ["Fredericton", "Saint John", "Moncton"],
  MB: ["Winnipeg", "Brandon"],
  SK: ["Saskatoon", "Regina"],
  NL: ["St. John's", "Corner Brook"],
  PE: ["Charlottetown"],
  YT: ["Whitehorse"],
  NT: ["Yellowknife"],
  NU: ["Iqaluit"],
}

// Province display names
export const provinceLabels: Record<Exclude<Province, "none">, string> = {
  ON: "Ontario",
  QC: "Quebec",
  BC: "British Columbia",
  AB: "Alberta",
  NS: "Nova Scotia",
  NB: "New Brunswick",
  MB: "Manitoba",
  SK: "Saskatchewan",
  NL: "Newfoundland and Labrador",
  PE: "Prince Edward Island",
  YT: "Yukon",
  NT: "Northwest Territories",
  NU: "Nunavut",
}

export const facultyTypes: FacultyTypeOption[] = [
  { value: "agriculture", label: "Agriculture" },
  { value: "applied_sciences", label: "Applied Sciences" },
  { value: "architecture", label: "Architecture" },
  { value: "arts", label: "Arts" },
  { value: "biology", label: "Biology" },
  { value: "business", label: "Business" },
  { value: "commerce", label: "Commerce" },
  { value: "communication", label: "Communication" },
  { value: "computer_science", label: "Computer Science" },
  { value: "continuing_education", label: "Continuing Education" },
  { value: "dentistry", label: "Dentistry" },
  { value: "education", label: "Education" },
  { value: "engineering", label: "Engineering" },
  { value: "environment", label: "Environment" },
  { value: "fine_arts", label: "Fine Arts" },
  { value: "forestry", label: "Forestry" },
  { value: "graduate_studies", label: "Graduate Studies" },
  { value: "health_sciences", label: "Health Sciences" },
  { value: "humanities", label: "Humanities" },
  { value: "information_technology", label: "Information Technology" },
  { value: "journalism", label: "Journalism" },
  { value: "kinesiology", label: "Kinesiology" },
  { value: "law", label: "Law" },
  { value: "library_science", label: "Library Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "media_studies", label: "Media Studies" },
  { value: "medicine", label: "Medicine" },
  { value: "music", label: "Music" },
  { value: "nursing", label: "Nursing" },
  { value: "other", label: "Other" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "public_health", label: "Public Health" },
  { value: "public_policy", label: "Public Policy" },
  { value: "science", label: "Science" },
  { value: "social_sciences", label: "Social Sciences" },
  { value: "social_work", label: "Social Work" },
  { value: "veterinary_medicine", label: "Veterinary Medicine" }
];

export const PercentageToGPA = (percentage: number): number => {
  const letterGrade = PercentageToGradeLetter(percentage);
  return GradeLetterToGPA(letterGrade);
};

// Helper function to get subject name for display
// probs dont need this after the proper names are fetched from db curricula 
export const getSubjectDisplayName = (subject: Subject): string => {
  const displayNames: Record<Subject, string> = {
    english: "English",
    math_algebra: "Math (Algebra)",
    math_calculus: "Math (Calculus)",
    math_foundation: "Math (Foundation)",
    biology: "Biology",
    chemistry: "Chemistry",
    physics: "Physics",
    social_studies: "Social Studies",
    other_language: "Other Language",
    fine_art: "Fine Arts",
    other: "Other",
    physical_education: "Physical Education",
  }

  return displayNames[subject] || subject
}

export const PercentageToGradeLetter = (percentage: number): GradeLetter => {
    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "A-";
    if (percentage >= 77) return "B+";
    if (percentage >= 73) return "B";
    if (percentage >= 70) return "B-";
    if (percentage >= 67) return "C+";
    if (percentage >= 63) return "C";
    if (percentage >= 60) return "C-";
    if (percentage >= 57) return "D+";
    if (percentage >= 53) return "D";
    if (percentage >= 50) return "D-";
    return "F";
  };

export const GradeLetterToGPA = (gradeLetter: GradeLetter): number => {
  switch(gradeLetter) {
    case "A+": return 4.0
    case "A": return 4.0
    case "A-": return 3.7
    case "B+": return 3.3
    case "B": return 3.0
    case "B-": return 2.7
    case "C+": return 2.3
    case "C": return 2.0
    case "C-": return 1.7
    case "D+": return 1.3
    case "D": return 1.0
    case "D-": return 0.7
    default: return 0.0
  }
};

export const ProvinceLabels: Record<Exclude<Province, 'none'>, string> = {
  "AB": "Alberta",
  "BC": "British Columbia",
  "MB": "Manitoba",
  "NB": "New Brunswick",
  "NL": "Newfoundland and Labrador",
  "NS": "Nova Scotia",
  "NT": "Northwest Territories",
  "NU": "Nunavut",
  "ON": "Ontario",
  "PE": "Prince Edward Island",
  "QC": "Quebec",
  "SK": "Saskatchewan",
  "YT": "Yukon"
};

export const CurriculumTypeLabels: Record<Exclude<CurriculumType, 'none'>, string> = {
  "AB": "Alberta",
  "BC": "British Columbia",
  "MB": "Manitoba",
  "NB": "New Brunswick",
  "NL": "Newfoundland and Labrador",
  "NS": "Nova Scotia",
  "NT": "Northwest Territories",
  "NU": "Nunavut",
  "ON": "Ontario",
  "PE": "Prince Edward Island",
  "QC": "Quebec",
  "SK": "Saskatchewan",
  "YT": "Yukon",
  "IB": "International Baccalaureate",
  "AP": "Advanced Placement"
};

export const SubjectLabels: Record<Subject, string> = {
  "english": "English",
  "math_algebra": "Math Algebra",
  "math_calculus": "Math Calculus",
  "math_foundation": "Math Foundation",
  "biology": "Biology",
  "chemistry": "Chemistry",
  "physics": "Physics",
  "social_studies": "Social Studies",
  "other_language": "Other Language",
  "fine_art": "Fine Arts",
  "other": "Other",
  "physical_education": "Physical Education"
};

export const ApplicationStatusLabels: Record<ApplicationStatus, string> = {
  "not_started": "Not Started",
  "in_progress": "In Progress",
  "completed": "Completed"
};

export const ApplicationOutcomeLabels: Record<ApplicationOutcome, string> = {
  "pending": "Pending",
  "accepted": "Accepted",
  "rejected": "Rejected",
  "waitlisted": "Waitlisted",
  "deferred": "Deferred",
  "withdrawn": "Withdrawn",
  "cancelled": "Cancelled",
  "expired": "Expired"
};