import { PreferenceData, RecommendationScore } from "@/types/datamodel/datamodel";

const getMatch = (userValue: number, universityValue: number): number => {
    return 5 - Math.abs(userValue - universityValue);
  };
  
  // Map frontend preferences to our model
  const mapPreferencesToModel = (preferences: PreferenceData) => {
    return {
      research: preferences.preferredResearchReputation || 1,
      coop: preferences.preferredCoop || 1,
      school_size: preferences.preferredSize || 3,
      location: preferences.preferredProvince || 5, // 5 = no preference
      urban_rural: preferences.prefferedCampusSetting || 4, // 4 = no preference
      athletics: preferences.prefferedAthletics || 3,
      clubs: preferences.prefferedStudentClubs || 3,
      greek_life: preferences.prefferedParty || 3,
      diversity: preferences.prefferedDiversity || 3,
      tuition: preferences.prefferedTuition || 4, // 4 = no preference
      financial_aid: preferences.prefferedFinancialAid || 3,
      housing: preferences.prefferedHousing || 3 // 3 = no preference
    };
  };

  
  // Calculate university scores
  export const calculateUniversityScores = (preferenceData: PreferenceData, universityData: Array<{university_name: string, id: string, recommendation_scores: RecommendationScore}>) => {
    // Map preferences to model format
    const userPreferences: Omit<RecommendationScore, 'field_of_study'> = mapPreferencesToModel(preferenceData);
    
    // Store scores for each university
    const scores: Record<string, number> = {};
    const matchDetails: Record<string, Record<string, number>> = {};
  
    // Calculate scores for each university
    
    universityData.forEach((university) => {
      let totalScore = 0;
      matchDetails[university.id] = {};
  
      // Special case: Field of study
      if (preferenceData.preferredFieldOfInterest && university.recommendation_scores.field_of_study.includes(preferenceData.preferredFieldOfInterest)) {
        totalScore += 5;
        matchDetails[university.id].field_of_study = 5;
      } else {
        matchDetails[university.id].field_of_study = 0;
      }
  
      // Loop through all other attributes
      Object.keys(university.recommendation_scores).forEach((attribute_key) => {
        // Skip field_of_study as it's handled separately
        if (attribute_key === 'field_of_study') return;
        
        const userValue: number = userPreferences[attribute_key as keyof Omit<RecommendationScore, 'field_of_study'>];
        const uniValue: number = university.recommendation_scores[attribute_key as keyof Omit<RecommendationScore, 'field_of_study'>];
        
        // Calculate match score for this attribute
        const matchScore = getMatch(userValue, uniValue);
        totalScore += matchScore;
        
        // Store detailed match information
        matchDetails[university.id][attribute_key as keyof Omit<RecommendationScore, 'field_of_study'>] = matchScore;
      });
  
      // Store total score
      scores[university.id] = totalScore;
    });
  
    // Sort universities by score
    const sortedUniversities = Object.entries(scores)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([id, score], index) => { 
        const university = universityData.find(uni => uni.id === id);
        return { 
            university_id: id,
            university_name: university?.university_name || "Unknown University",
            score,
            rank: index + 1,
            matchDetails: matchDetails[id]
        };
    });
  
    return {
      recommendations: sortedUniversities,
      topMatch: sortedUniversities[0]?.university_id || null,
    };
  };