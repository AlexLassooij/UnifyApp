import { Program } from "@/types/datamodel/datamodel";
import { api } from '@/lib/api/apiClient';

/**
 * Fetches all applications for a user
 */
export async function fetchProgramById(programId: string): Promise<Program | null> {
try {
    const reponse = await api.get(`/api/programs/${programId}`);
    
    return reponse || {};
} catch (error) {
    console.error("Error fetching applications:", error);
    return null;
}
}