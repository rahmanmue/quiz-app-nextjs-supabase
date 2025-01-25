"use client"

import { SignInForm } from "@/components/sign-in-form";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();

    const initialState = {
        email: '',
        password: '',
    }

    const onSuccess = () => router.push('/protected');
    
    return (
        <SignInForm onSuccess={onSuccess} initialState={initialState}/>
    )
}
