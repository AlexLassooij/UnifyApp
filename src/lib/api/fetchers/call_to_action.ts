/**
 * Fetches all applications for a user
 */
export async function addNotification(name: string, email: string, notification: string): Promise<boolean> {
try {
    // need to bypass client because no auth
        const response = await fetch(`/api/notifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            notification: notification
        })
      });
    return true
} catch (error) {
    console.error("Error fetching applications:", error);
    return false;
}
}