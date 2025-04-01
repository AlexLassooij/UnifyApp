import { Application } from "@/types/datamodel/datamodel";
import { api } from '@/lib/api/apiClient';

/**
 * Fetches all applications for a user
 */
export async function fetchUserApplications(userId: string): Promise<Application[]> {
try {
    const reponse = await fetch(`/api/users/${userId}/applications`);
    const data = await reponse.json();
    return data.applications || [];
} catch (error) {
    console.error("Error fetching applications:", error);
    return [];
}
}