"use client"

import { ResetPasswordForm } from "@/components/reset-password-form"
import { useRouter } from "next/navigation"


export default function ResetPassword(){
   const router = useRouter();

   const onSuccess = (redirect: string) => router.push(redirect);

   return (<ResetPasswordForm onSuccess={onSuccess} />)
}