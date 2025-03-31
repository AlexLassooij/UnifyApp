
export const defaultPreferences = {
    // Category importance (Step 1)
    preferredAcademics: 3,
    preferredCampusLife: 3,
    preferredFinancial: 3,
    preferredLocationAndSize: 3,
    
    // Academic preferences (Step 2)
    preferredFieldOfInterest: 1,
    preferredResearchReputation: 1,
    preferredCoop: 1,
    
    // Location & Size (Step 3)
    preferredProvince: 1,
    prefferedCampusSetting: 1,
    preferredSize: 1,
    
    // Campus Life (Step 4)
    prefferedAthletics: 3,
    prefferedStudentClubs: 3,
    prefferedParty: 3,
    prefferedDiversity: 3,
    
    // Financial Considerations (Step 5)
    prefferedTuition: 1,
    prefferedFinancialAid: 3,
    prefferedHousing: 1
  };

  export const defaultProfile = {
    // Category importance (Step 1)
    gender: "male",
    currentGrade: "9",
    province: "ON",
    graduationYear: "2025"
  };

  export const formGroups = {
    gender: {
        label: "Gender",
        field: "gender",
        options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non-binary", label: "Non-binary" },
            { value: "prefer-not-to-say", label: "Prefer not to say" }
        ]
    },
    currentGrade: {
        label: "Current Grade",
        field: "currentGrade",
        options: [
            { value: "9", label: "Grade 9" },
            { value: "10", label: "Grade 10" },
            { value: "11", label: "Grade 11" },
            { value: "12", label: "Grade 12" }
        ]
    },
    province: {
        label: "Province",
        field: "province",
        options: [
            { value: "ON", label: "Ontario" },
            { value: "BC", label: "British Columbia" },
            { value: "AB", label: "Alberta" }
            // Uncomment to add more provinces
            // { value: "QC", label: "Quebec" },
            // { value: "MB", label: "Manitoba" },
            // { value: "SK", label: "Saskatchewan" },
            // { value: "NS", label: "Nova Scotia" },
            // { value: "NB", label: "New Brunswick" },
            // { value: "NL", label: "Newfoundland and Labrador" },
            // { value: "PE", label: "Prince Edward Island" },
            // { value: "NT", label: "Northwest Territories" },
            // { value: "YT", label: "Yukon" },
            // { value: "NU", label: "Nunavut" },
            // { value: "none", label: "No Preference" }
        ]
    },
    graduationYear: {
        label: "Expected Graduation Year",
        field: "graduationYear",
        options: [
            { value: "2025", label: "2025" },
            { value: "2026", label: "2026" },
            { value: "2027", label: "2027" },
            { value: "2028", label: "2028" }
        ]
    }
};

  export const preferenceSteps = {
    // Step 1: Category Importance
    categoryImportance: {
      title: "What matters most to you?",
      description: "Rate how important each category is to you from 1 (least) to 5 (most)",
      fields: [
        {
          id: "preferredAcademics",
          label: "Academics (Research, Co-op, Field of Study)",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        },
        {
          id: "preferredCampusLife",
          label: "Campus Life (Athletics, Clubs, Events, Diversity)",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        },
        {
          id: "preferredFinancial",
          label: "Financial Considerations (Tuition & Aid)",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        },
        {
          id: "preferredLocationAndSize",
          label: "Location & Size (Province, Setting, School Size)",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
  
    // Step 2: Academic Preferences
    academicPreferences: {
      title: "Academic Preferences",
      description: "Tell us about what you're looking for academically",
      fields: [
        {
          id: "preferredFieldOfInterest",
          label: "What is your intended field of study?",
          type: "radio",
          options: [
            { value: "1", label: "STEM (Science, Technology, Engineering, Math)" },
            { value: "2", label: "Arts & Humanities" },
            { value: "3", label: "Business & Commerce" },
            { value: "4", label: "Music & Fine Arts" },
            { value: "5", label: "Social Sciences" },
            { value: "6", label: "Health Sciences" },
            { value: "7", label: "Education" },
            { value: "8", label: "Undecided" }
          ]
        },
        {
          id: "preferredResearchReputation",
          label: "Do you prefer a university with strong research reputation?",
          type: "radio",
          options: [
            { value: "1", label: "Yes, very important" },
            { value: "2", label: "No, not important" },
            { value: "3", label: "Neutral" }
          ]
        },
        {
          id: "preferredCoop",
          label: "Do you prefer a university with co-op/internship programs?",
          type: "radio",
          options: [
            { value: "1", label: "Yes, very important" },
            { value: "2", label: "No, not important" },
            { value: "3", label: "Neutral" }
          ]
        }
      ]
    },
  
    // Step 3: Location & Size
    locationSize: {
      title: "Location & Size",
      description: "Where do you see yourself studying?",
      fields: [
        {
          id: "preferredProvince",
          label: "Preferred province?",
          type: "radio",
          options: [
            { value: "1", label: "Ontario" },
            { value: "2", label: "British Columbia" },
            { value: "3", label: "Quebec" },
            { value: "4", label: "Alberta" },
            { value: "5", label: "No preference" }
          ]
        },
        {
          id: "prefferedCampusSetting",
          label: "Do you prefer an urban, suburban, or rural campus?",
          type: "radio",
          options: [
            { value: "1", label: "Urban (city center)" },
            { value: "2", label: "Suburban (residential area)" },
            { value: "3", label: "Rural (countryside)" },
            { value: "4", label: "No preference" }
          ]
        },
        {
          id: "preferredSize",
          label: "What is your preferred school size?",
          type: "radio",
          options: [
            { value: "1", label: "Small (<5,000 students)" },
            { value: "2", label: "Medium (5,000-15,000 students)" },
            { value: "3", label: "Large (15,000-40,000 students)" },
            { value: "4", label: "Extra-Large (40,000+ students)" }
          ]
        }
      ]
    },
  
    // Step 4: Campus Life
    campusLife: {
      title: "Campus Life",
      description: "How do you want to spend your time outside the classroom?",
      fields: [
        {
          id: "prefferedAthletics",
          label: "How important are athletics?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        },
        {
          id: "prefferedStudentClubs",
          label: "How important are student clubs and organizations?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        },
        {
          id: "prefferedParty",
          label: "How important is social scene/parties/Greek life?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        },
        {
          id: "prefferedDiversity",
          label: "How important is the diversity and inclusivity of the university?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
  
    // Step 5: Financial Considerations
    financial: {
      title: "Financial Considerations",
      description: "Let's talk about the financial aspects of university",
      fields: [
        {
          id: "prefferedTuition",
          label: "What is your preferred tuition range?",
          type: "radio",
          options: [
            { value: "1", label: "Under $10,000/year" },
            { value: "2", label: "$10,000-$20,000/year" },
            { value: "3", label: "Over $20,000/year" },
            { value: "4", label: "No preference" }
          ]
        },
        {
          id: "prefferedFinancialAid",
          label: "How important is financial aid/scholarship availability?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1
        },
        {
          id: "prefferedHousing",
          label: "Do you want on-campus student housing or off-campus living?",
          type: "radio",
          options: [
            { value: "1", label: "On-campus housing" },
            { value: "2", label: "Off-campus living" },
            { value: "3", label: "No preference" }
          ]
        }
      ]
    }
  };