"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

async function logout() {
    try {
        const res = await fetch('/api/auth/logout', {
            method: 'POST'
        });

        if (!res.ok) {
            throw new Error(`Logout failed: ${res.statusText}`);
        }

        return res; // Returning the successful response
    } catch (error) {
        console.error("Error during logout:", error);
        throw error; // Propagate the error for further handling
    }
}

export default function Protected() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res.ok) { // Check if the response was successful (status 2xx)
                return router.push('/sign-in');
            } else {
                console.error("Logout failed with status:", res.status);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (<Button onClick={handleLogout}>Logout</Button>);
}
