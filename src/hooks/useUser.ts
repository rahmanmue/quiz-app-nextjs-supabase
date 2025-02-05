import { getSupabaseCookies } from "@/utils/supabase/cookies"
import { useEffect, useState } from "react"

export function useUser(){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const {accessToken} = getSupabaseCookies();

    useEffect(()=> {
        const userSession = document.cookie
            .split("; ")
            .some((row) => row.startsWith(accessToken))
        setIsAuthenticated(userSession)
    }, [])

    return {
        isAuthenticated
    }
}