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


export async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
            headers: { 
                "Content-Type": "application/json" 
            },
            method: 'POST'
        });

        const result = await response.json();

        if (!response.ok) {
            return {ok: false, error: result.error }
        }

        return {ok:true, data: result}

    } catch (error) {
        console.error("Network error:", error);
        return { ok: false, error: "Network error. Please try again later." };
    }
}


export async function forgetPassword(data: {email: string}) {
    try {
        const response = await fetch('/api/auth/forget-password', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(!response.ok){
            return {ok: false, error: result.error }
        }

        return {ok: true, data: result}

    } catch (error) {
        console.error("Network error:", error);
        return { ok: false, error: "Network error. Please try again later." };
    }
    
}


export async function resetPassword(data: {password: string}){
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(!response.ok){
            return {ok: false, error: result.error }
        }

        return {ok: true, data: result}
 
    } catch (error) {
        console.error("Network error:", error);
        return { ok: false, error: "Network error. Please try again later." };
    }
}