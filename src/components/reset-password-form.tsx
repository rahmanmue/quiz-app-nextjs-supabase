"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { resetPassword } from "@/utils/api";
import { AlertDestructive } from "./alert-error";
import { useToast } from "@/hooks/use-toast";

interface propsResetPassword {
    onSuccess : (redirect: string) => void
}

export function ResetPasswordForm({onSuccess} : propsResetPassword){
    const {toast} = useToast()
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        const res = await resetPassword({password: password})

        if(!res.ok){
            console.error("error", error);
            setError(res.error);
            return
        }

        onSuccess(res.data?.redirect);
        
        toast({
            title: "Success",
            description: "Successfully reset password",
            duration: 5000
        })

    }


    return(
        <div className="flex flex-col gap-6 md:w-1/3">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        {error  && <AlertDestructive message={error}/>}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                            />
                        </div>
                        
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </div>
                </form>   
            </CardContent>
        </Card>
        </div>
    )
}