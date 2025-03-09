import { GradeLetter, Province, CurriculumType, Subject, ApplicationStatus, ApplicationOutcome } from "../datamodel/datamodel";

export const PercentageToGPA = (percentage: number): number => {
  const letterGrade = PercentageToGradeLetter(percentage);
  return GradeLetterToGPA(letterGrade);
};

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

export const ProvinceLabels: Record<Province, string> = {
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

export const CurriculumTypeLabels: Record<CurriculumType, string> = {
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