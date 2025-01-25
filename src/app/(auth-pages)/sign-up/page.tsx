"use client"

import { SignUpForm } from "@/components/sign-up-form";


export default function SignUp() {
    const initialState = {
        email: '',
        password: '',
        confirm_password: '',
    }
   
    return(
        <SignUpForm initialState={initialState} />
    )
}
