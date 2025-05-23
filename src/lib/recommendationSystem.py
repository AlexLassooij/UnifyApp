import numpy as np

# Get user preferences
def get_user_preferences():
    print("Answer the following questions to determine the best university match:\n")
    
    preferences = {}
    
    # Importance of Categories
    print("Rank the importance of the following categories on a scale of 1 (least important) to 5 (most important):")
    preferences['importance_academics'] = int(input("Academics (Research, Co-op, Field of Study): "))
    preferences['importance_campus_life'] = int(input("Campus Life (Athletics, Clubs, Greek Life, Diversity): "))
    preferences['importance_financials'] = int(input("Financial Considerations (Tuition & Aid): "))
    preferences['importance_location_size'] = int(input("Location & Size (Province, Urban/Suburban/Rural, School Size): "))
    
    # Personal & Academic Preferences
    preferences['field_of_study'] = int(input("What is your intended field of study? (1) STEM (2) Arts (3) Business (4) Music (5) Social Sciences (6) Health Sciences (7) Education (8) Undecided: "))
    preferences['research_importance'] = int(input("Do you prefer a university with a strong reputation for research? (1) Yes (2) No (3) Neutral: "))
    preferences['coop_importance'] = int(input("Do you prefer a university with strong co-op or internship programs? (1) Yes (2) No (3) Neutral: "))
    preferences['school_size'] = int(input("What is your preferred school size? (1) Small (<5,000) (2) Medium (5,000-15,000) (3) Large (15,000-40,000) (4) Extra-Large (40,000+): "))
    
    # Location & Campus Life Preferences
    preferences['location'] = int(input("Preferred province or region? (1) Ontario (2) British Columbia (3) Quebec (4) No preference: "))
    preferences['urban_rural'] = int(input("Do you prefer an urban, suburban, or rural campus? (1) Urban (2) Suburban (3) Rural (4) No preference: "))
    preferences['athletics_importance'] = int(input("How important are athletics? (1-5): "))
    preferences['clubs_importance'] = int(input("How important are student clubs? (1-5): "))
    preferences['greek_life_importance'] = int(input("How important are parties/Greek life? (1-5): "))
    preferences['diversity_importance'] = int(input("How important is the diversity and inclusivity of the university? (1-5): "))
    
    # Financial & Admission Considerations
    preferences['tuition_budget'] = int(input("What is your preferred tuition range? (1) <$10,000 (2) $10,000-$20,000 (3) >$20,000: "))
    preferences['financial_aid_importance'] = int(input("How important is financial aid/scholarship availability to you? (1-5): "))
    preferences['housing_preference'] = int(input("Do you want on-campus student housing or off-campus living? (1) On-campus (2) Off-campus (3) No preference: "))
    
    return preferences

# Helper function to match attributes
def match_attribute(user_value, uni_value):
    """Match the attribute values of the user and university and return a score from 0 to 5."""
    # if user_value == uni_value:
    #     return 5
    # elif abs(user_value - uni_value) == 1:
    #     return 4
    # elif abs(user_value - uni_value) == 2:
    #     return 3
    # elif abs(user_value - uni_value) == 3:
    #     return 2
    # elif abs(user_value - uni_value) == 4:
    #     return 1
    # else:
    #     return 0
    return 5 - abs(user_value - uni_value)  # Return a score from 0 to 5 based on the difference

# Function to evaluate universities based on user preferences
def evaluate_universities(preferences):
    # Predefined university data (hardcoded attributes)
    universities = {
         "University of Toronto": {
            "field_of_study": [1, 3, 6],
            "research": 5,
            "coop": 4,
            "school_size": 4,
            "location": 1,
            "urban_rural": 1,
            "athletics": 3,
            "clubs": 5,
            "greek_life": 4,
            "diversity": 5,
            "tuition": 3,
            "financial_aid": 2,
            "housing": 1
        },
        "University of British Columbia": {
            "field_of_study": [1, 2, 3, 6],
            "research": 4,
            "coop": 4,
            "school_size": 4,
            "location": 2,
            "urban_rural": 2,
            "athletics": 4,
            "clubs": 4,
            "greek_life": 3,
            "diversity": 4,
            "tuition": 2,
            "financial_aid": 4,
            "housing": 1
        },
        "McGill University": {
            "field_of_study": [1, 2, 6],
            "research": 5,
            "coop": 3,
            "school_size": 3,
            "location": 3,
            "urban_rural": 1,
            "athletics": 3,
            "clubs": 5,
            "greek_life": 3,
            "diversity": 4,
            "tuition": 2,
            "financial_aid": 3,
            "housing": 2
        },
        "University of Waterloo": {
            "field_of_study": [1],
            "research": 4,
            "coop": 5,
            "school_size": 4,
            "location": 1,
            "urban_rural": 1,
            "athletics": 2,
            "clubs": 4,
            "greek_life": 2,
            "diversity": 4,
            "tuition": 1,
            "financial_aid": 5,
            "housing": 1
        },
        "University of Alberta": {
            "field_of_study": [1, 3],
            "research": 3,
            "coop": 4,
            "school_size": 3,
            "location": 1,
            "urban_rural": 2,
            "athletics": 4,
            "clubs": 3,
            "greek_life": 4,
            "diversity": 3,
            "tuition": 2,
            "financial_aid": 3,
            "housing": 2
        }
    }

    weighted_scores = {}

    # Loop through each university and calculate the total score
    for uni, attributes in universities.items():
        total_score = 0
        
         # Match the user's field of study preference with university's top programs
        if preferences['field_of_study'] in attributes['field_of_study']:
            field_match_score = 5  # Full match if the student's preference is in the list of top programs
        else:
            field_match_score = 0  # No match if the student's preference isn't in the list

        total_score += field_match_score

        # You can similarly match other criteria (like research, co-op, etc.)
        total_score += match_attribute(preferences['research_importance'], attributes['research'])
        total_score += match_attribute(preferences['coop_importance'], attributes['coop'])
        total_score += match_attribute(preferences['school_size'], attributes['school_size'])
        total_score += match_attribute(preferences['location'], attributes['location'])
        total_score += match_attribute(preferences['urban_rural'], attributes['urban_rural'])
        total_score += match_attribute(preferences['athletics_importance'], attributes['athletics'])
        total_score += match_attribute(preferences['clubs_importance'], attributes['clubs'])
        total_score += match_attribute(preferences['greek_life_importance'], attributes['greek_life'])
        total_score += match_attribute(preferences['diversity_importance'], attributes['diversity'])
        total_score += match_attribute(preferences['tuition_budget'], attributes['tuition'])
        total_score += match_attribute(preferences['financial_aid_importance'], attributes['financial_aid'])
        total_score += match_attribute(preferences['housing_preference'], attributes['housing'])

        weighted_scores[uni] = total_score

    best_match = max(weighted_scores, key=weighted_scores.get)
    return best_match, weighted_scores

# Run the program
if __name__ == "__main__":
    preferences = get_user_preferences()
    best_match, scores = evaluate_universities(preferences)
    
    print("\nRecommended University: ", best_match)
    print("\nScores:")
    for uni, score in scores.items():
        print(f"{uni}: {score}")
