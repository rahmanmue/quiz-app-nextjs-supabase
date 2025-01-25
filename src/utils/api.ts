import { SignIn, SignUp } from "@/types";

export async function signIn (data : SignIn) {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        // console.log("response", response)
        // console.log("result", result)
    
        if(!response.ok){
            return {ok: false, error: result.error }
        }

        return {ok:true, data: result}
        
    } catch (error) {
        console.error("Network error:", error);
        return { ok: false, error: "Network error. Please try again later." };
    }
}

export async function signUp(data: SignUp) {
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data),
        });
        
        const result = await response.json();

        if(!response.ok){
            return {ok: false, error: result.error }
        }

        return {ok:true, data: result}

    } catch (error) {
        console.error("Network error:", error);
        return { ok: false, error: "Network error. Please try again later." };
    }
    
}